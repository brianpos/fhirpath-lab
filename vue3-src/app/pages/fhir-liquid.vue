<template>
  <div>
    <HeaderNavbar />

    <div class="container-fluid bd-layout">
      <v-card class="page-content">
        <v-toolbar color="primary">
          <v-toolbar-title>FHIR Liquid Tester</v-toolbar-title>
          <v-spacer />
          <v-btn icon title="Validate template" @click="validateTemplate">
            <v-icon>mdi-note-check-outline</v-icon>
          </v-btn>
          <v-btn icon title="Evaluate template (Ctrl+Enter)" @click="evaluateTemplate">
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </v-toolbar>

        <TwinPaneTab ref="twinTabControl" :tabs="tabDetails">
          <template #Template>
            <ResourceEditor
              ref="templateEditor"
              :resource-text="templateText"
              text-label="FHIR Liquid Template"
              language="fhir-liquid"
              :tab-spaces="tabSpaces"
              @update:resource-text="templateText = $event"
            />
          </template>

          <template #Resource>
            <ResourceEditor
              ref="resourceEditor"
              label="Test Resource Id"
              :resource-url="resourceUrl"
              :resource-text="resourceText"
              text-label="Test Resource"
              :tab-spaces="tabSpaces"
              @update:resource-url="resourceUrl = $event"
              @update:resource-text="resourceText = $event"
            />
          </template>

          <template #Output>
            <ResourceEditor
              :resource-text="outputText"
              text-label="Rendered Output"
              language="text"
              read-only
              :tab-spaces="tabSpaces"
            />
          </template>

          <template #Output_HTML>
            <div class="html-preview">
              <iframe
                title="Rendered FHIR Liquid HTML output"
                :srcdoc="outputText"
                sandbox=""
                referrerpolicy="no-referrer"
              />
            </div>
          </template>

          <template #Errors>
            <OperationOutcomePanel
              title="FHIR Liquid Errors"
              issue-link-title="Go to the error"
              :outcome="errorOutcome"
              @navigate-to-issue="navigateToIssue"
              @close="clearValidationOutcome"
            />
          </template>
        </TwinPaneTab>
      </v-card>
    </div>

    <v-snackbar v-model="showSuccess" color="success" :timeout="2500">
      {{ successMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import type { OperationOutcome, OperationOutcomeIssue } from "fhir/r4b";
import type { TabData } from "~/components/TwinPaneTab.vue";
import ResourceEditor from "~/components/ResourceEditor.vue";
import OperationOutcomePanel from "~/components/OperationOutcomePanel.vue";
import {
  validateFhirLiquidTemplate,
  type FhirLiquidIssuePosition,
} from "@legacy/helpers/fhir_liquid_validator";
import {
  FhirLiquidEngine,
  FhirLiquidEvaluationError,
} from "@legacy/helpers/fhirliquid-engine";
import { isHtmlOutput } from "@legacy/helpers/fhirliquid_html";

useHead({
  title: "FHIR Liquid Tester - FHIRPath Lab",
});

interface TwinPaneControl {
  selectTab(tabIndex: number): void;
  getActiveTabs(): TabData[];
}

interface ResourceEditorControl {
  navigateToTextRange(location: FhirLiquidIssuePosition): boolean;
}

type IssueSource = "template" | "resource";

interface PositionedIssue extends OperationOutcomeIssue {
  __position: FhirLiquidIssuePosition;
  __source?: IssueSource;
}

const tabSpaces = 2;
const TEMPLATE_TAB = 0;
const RESOURCE_TAB = 1;
const OUTPUT_TAB = 2;
const OUTPUT_HTML_TAB = 3;
const ERRORS_TAB = 4;
const twinTabControl = ref<TwinPaneControl>();
const templateEditor = ref<ResourceEditorControl>();
const resourceEditor = ref<ResourceEditorControl>();
const errorOutcome = ref<OperationOutcome>();
const showSuccess = ref(false);
const successMessage = ref("");
const engine = new FhirLiquidEngine();

const templateText = ref(`<h1>{{ Patient.name.where(use = 'official').first().family }}</h1>
{% if Patient.active %}
<p>This patient is active.</p>
{% endif %}`);
const resourceUrl = ref("Patient/example");
const resourceText = ref(JSON.stringify({
  resourceType: "Patient",
  id: "example",
  active: true,
  name: [{
    use: "official",
    family: "Chalmers",
    given: ["Peter", "James"],
  }],
}, null, 2));
const outputText = ref("");
const hasHtmlOutput = computed(() => isHtmlOutput(outputText.value));

const tabDetails = computed<TabData[]>(() => [
  {
    iconName: "mdi-code-tags",
    tabName: "Template",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-clipboard-text-outline",
    tabName: "Resource",
    tabHeaderName: "Test Resource",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-file-document-outline",
    tabName: "Output",
    tabHeaderName: "Rendered Output",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-language-html5",
    tabName: "Output HTML",
    tabHeaderName: "Rendered HTML Output",
    show: hasHtmlOutput.value,
    enabled: true,
  },
  {
    iconName: "mdi-alert-circle-outline",
    tabName: "Errors",
    tabHeaderName: "Errors",
    show: errorOutcome.value !== undefined,
    enabled: true,
  },
]);

function validateTemplate(): void {
  const outcome = validateFhirLiquidTemplate(templateText.value);
  if (outcome) {
    showErrorOutcome(outcome);
    return;
  }

  if (errorOutcome.value) {
    twinTabControl.value?.selectTab(TEMPLATE_TAB);
  }
  errorOutcome.value = undefined;
  showSuccessMessage("Template syntax is valid.");
}

function evaluateTemplate(): void {
  outputText.value = "";
  showSuccess.value = false;

  const syntaxOutcome = validateFhirLiquidTemplate(templateText.value);
  if (syntaxOutcome) {
    showErrorOutcome(syntaxOutcome);
    return;
  }

  let resource: unknown;
  try {
    resource = JSON.parse(resourceText.value);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showErrorOutcome(createErrorOutcome(
      `Resource JSON is invalid: ${message}`,
      "invalid",
      "resource",
      jsonErrorPosition(error, resourceText.value),
    ));
    return;
  }

  try {
    outputText.value = engine.evaluate(templateText.value, resource);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showErrorOutcome(createErrorOutcome(
      `Template evaluation failed: ${message}`,
      "processing",
      "template",
      error instanceof FhirLiquidEvaluationError ? error.position : undefined,
    ));
    return;
  }

  errorOutcome.value = undefined;
  var activeTabs = twinTabControl.value?.getActiveTabs() ?? [];
  // only switch tabs if either of the output tabs are not currently active
  if (!activeTabs.some(tab => tab.tabName === "Output" || tab.tabName === "Output HTML")) {
    twinTabControl.value?.selectTab(hasHtmlOutput.value ? OUTPUT_HTML_TAB : OUTPUT_TAB);
  }
  // twinTabControl.value?.selectTab(OUTPUT_TAB);
}

function ctrlEnterHandler(event: KeyboardEvent): void {
  if (!(event.ctrlKey || event.metaKey) || event.key !== "Enter") return;

  event.preventDefault();
  evaluateTemplate();
}

onMounted(() => document.addEventListener("keydown", ctrlEnterHandler));
onBeforeUnmount(() => document.removeEventListener("keydown", ctrlEnterHandler));

function clearValidationOutcome(): void {
  twinTabControl.value?.selectTab(TEMPLATE_TAB);
  errorOutcome.value = undefined;
}

function hasIssuePosition(
  issue: OperationOutcomeIssue,
): issue is PositionedIssue {
  if (!("__position" in issue)) return false;
  const position = issue.__position;
  return (
    typeof position === "object"
    && position !== null
    && "line" in position
    && typeof position.line === "number"
    && "column" in position
    && typeof position.column === "number"
    && "length" in position
    && typeof position.length === "number"
  );
}

function navigateToIssue(issue: OperationOutcomeIssue): void {
  if (!hasIssuePosition(issue)) return;

  const source = issue.__source ?? "template";
  twinTabControl.value?.selectTab(
    source === "resource" ? RESOURCE_TAB : TEMPLATE_TAB,
  );
  nextTick(() => {
    const editor = source === "resource" ? resourceEditor.value : templateEditor.value;
    editor?.navigateToTextRange(issue.__position);
  });
}

function showErrorOutcome(outcome: OperationOutcome): void {
  errorOutcome.value = outcome;
  showSuccess.value = false;
  nextTick(() => twinTabControl.value?.selectTab(ERRORS_TAB));
}

function showSuccessMessage(message: string): void {
  successMessage.value = message;
  showSuccess.value = true;
}

function createErrorOutcome(
  message: string,
  code: OperationOutcomeIssue["code"],
  source: IssueSource,
  position?: FhirLiquidIssuePosition,
): OperationOutcome {
  const issue: OperationOutcomeIssue & Partial<PositionedIssue> = {
    severity: "error",
    code,
    details: { text: message },
  };
  if (position) {
    const location = `@${position.line}:${position.column}`;
    issue.expression = [location];
    issue.location = [location];
    issue.__position = position;
    issue.__source = source;
  }
  return {
    resourceType: "OperationOutcome",
    issue: [issue],
  };
}

function jsonErrorPosition(
  error: unknown,
  source: string,
): FhirLiquidIssuePosition | undefined {
  const message = error instanceof Error ? error.message : String(error);
  const offsetMatch = /\bposition\s+(\d+)\b/i.exec(message);
  if (offsetMatch) {
    return offsetToPosition(source, Number(offsetMatch[1]));
  }

  const lineColumnMatch = /\bline\s+(\d+)\s+column\s+(\d+)\b/i.exec(message);
  if (!lineColumnMatch) return undefined;
  return {
    line: Number(lineColumnMatch[1]),
    column: Number(lineColumnMatch[2]),
    length: 1,
  };
}

function offsetToPosition(source: string, rawOffset: number): FhirLiquidIssuePosition {
  const offset = Math.min(Math.max(rawOffset, 0), source.length);
  const precedingText = source.slice(0, offset);
  const lines = precedingText.split(/\r\n|\r|\n/);
  return {
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
    length: offset < source.length ? 1 : 0,
  };
}
</script>

<style scoped>
.container-fluid {
  padding: 80px 16px 0;
}

.page-content {
  height: calc(100vh - 100px);
}

.html-preview {
  height: calc(100vh - 235px);
  min-height: 320px;
}

.html-preview iframe {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: white;
}
</style>
