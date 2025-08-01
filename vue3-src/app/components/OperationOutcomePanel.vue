<template>
  <div class="inline-panel-issues">
    <div v-if="!outcome || !outcome.issue || outcome.issue.length === 0">
        <i>No issues reported</i>
    </div>
    <div v-if="outcome && outcome.issue">
        <v-btn style="float:right;" icon size="small" variant="text" @click="close">
        <v-icon>mdi-close</v-icon>
        </v-btn>
        <template v-for="(issue, index) in outcome.issue" :key="index">
        <div class="issue-item" v-if="!hideIssue(issue)" @click="helpWithIssue(issue)">
            <span class="issue-severity">
            <span class="no-wrap">
                <v-icon v-if="issue.severity === 'error' || issue.severity === 'fatal'" color="red">mdi-alert-octagon</v-icon>
                <v-icon v-if="issue.severity === 'warning'" color="orange">mdi-alert</v-icon>
                <span
                :class="severityClassName(issue.severity)"
                v-text="issue.severity"
                />
            </span>
            <template v-if="issue.code && issue.severity !== 'information'">
                <br/>
                <span class="issue-code no-wrap">(<span v-text="issue.code" />)</span>
            </template>
            </span>
            <span class="details">
            <span class="issue-description" style="max-height:100px; overflow-y: auto" v-text="issueDescription(issue)" />
            <template v-if="issue.expression">
                <br />
                <v-btn size="x-small" icon v-if="issue.__position" :title="issueLinkTitle" @click="navigateToIssue(issue)">
                <v-icon>
                    mdi-target
                </v-icon>
                </v-btn>
                <span class="issue-location" v-if="issue.expression" v-text="issue.expression" />
            </template>
            <template v-if="issue.location && !issue.__position">
                <br />
                <span v-if="issue.location" v-text="issue.location" />
            </template>
            </span>
        </div>
        </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inline-panel-issues {
  border-top: solid thin silver;
  border-bottom: solid thin silver;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
}

.issue-description {
  color: #333; 
}

.issue-location {
  font-size: small;
  color: grey;
  font-style: italic;
}

.issue-item:hover {
  background-color: rgb(var(--v-theme-surface-variant));
}

.issue-item .issue-severity:hover {
  text-shadow: 1px 1px 1px #aaa;
  cursor: pointer;
}

.issue-item {
  display: table-row;
}

.issue-code {
  color: grey;
  font-size: small;
}

.issue-item > span {
  display: table-cell;
  padding-bottom: 12px;
  padding-right: 8px;
}

.details span{
  word-break: break-word;
}

.fp-fatal {
  color: red;
  font-weight: bold;
}

.fp-error {
  color: red;
  font-weight: bold;
}

.fp-warning {
  color: orange;
  font-weight: bold;
}

.no-wrap {
  white-space: nowrap;
}
</style>

<script setup lang="ts">
import type { OperationOutcome, OperationOutcomeIssue } from "fhir/r4b";

// Define the props interface
interface Props {
  title?: string
  issueLinkTitle?: string
  outcome?: OperationOutcome
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  issueLinkTitle: undefined,
  outcome: undefined
})

// Define emits
const emit = defineEmits<{
  'help-with-issue': [issue: OperationOutcomeIssue]
  'navigate-to-issue': [issue: OperationOutcomeIssue]
  'close': []
}>()

// Methods converted to functions
const hideIssue = (issue: OperationOutcomeIssue): boolean => {
  if (issue.severity === 'warning' && issue.code === 'incomplete' && issue.details?.text?.includes('Unable to resolve reference to profile')) return true
  return false
}

const issueDescription = (issue: OperationOutcomeIssue): string => {
  if (issue.details) {
    if (issue.details?.text) return issue.details?.text
    // Check to see if there are any codings
    if (issue.details.coding) {
      for (const coding of issue.details.coding) {
        if (coding.display) return coding.display
      }
    }
  }
  return issue.diagnostics ?? '(unknown)'
}

const severityClassName = (severity: string): string => {
  if (severity === "fatal") return "fp-fatal"
  if (severity === "error") return "fp-error"
  if (severity === "warning") return "fp-warning"
  return ""
}

const helpWithIssue = (issue: OperationOutcomeIssue) => {
  emit("help-with-issue", issue)
}

const navigateToIssue = (issue: OperationOutcomeIssue) => {
  emit("navigate-to-issue", issue)
}

const close = () => {
  emit("close")
}
</script>
