<template>
<div>
  <div class="inline-panel-issues" v-if="!popupWhenErrors">
        <v-btn style="float:right;" icon small tile @click="close">
          <v-icon> mdi-close </v-icon>
        </v-btn>
        <template  v-for="(issue, index) in saveOutcome.issue">
          <div class="issue-item" :key="index" v-if="!hideIssue(issue)">
            <span>
              <nobr>
              <v-icon v-if="issue.severity === 'error' || issue.severity === 'fatal'" color="red">mdi-alert-octagon</v-icon>
              <v-icon v-if="issue.severity === 'warning'" color="orange">mdi-alert</v-icon>
            <span
              :class="severityClassName(issue.severity)"
              v-text="issue.severity"
            />
            </nobr>
            <template v-if="issue.code">
              <br/>
            <nobr class="issue-code">(<span v-text="issue.code" />)</nobr>
            </template>
            </span>
            <span class="details">
            <span v-if="issue.details" v-text="issue.details.text" />
            <template v-if="issue.expression">
              <br />
              <span v-if="issue.expression" v-text="issue.expression" />
            </template>
            <template v-if="issue.location">
              <br />
              <span v-if="issue.location" v-text="issue.location" />
            </template>
            </span>
          </div>
        </template>
  </div>
  <v-overlay v-if="popupWhenErrors" style="z-index:6;" :value="showOutcome">
    <v-card light style="margin: 12px;">
      <v-card-title v-text="title"></v-card-title>
      <v-card-text class="issue-list" v-if="saveOutcome">
        <template v-for="(issue, index) in saveOutcome.issue">
          <div class="issue-item" :key="index" v-if="!hideIssue(issue)">
            <span>
              <nobr>
              <v-icon v-if="issue.severity === 'error' || issue.severity === 'fatal'" color="red">mdi-alert-octagon</v-icon>
              <v-icon v-if="issue.severity === 'warning'" color="orange">mdi-alert</v-icon>
            <span
              :class="severityClassName(issue.severity)"
              v-text="issue.severity"
            />
            </nobr>
            <template v-if="issue.code">
              <br/>
            <nobr class="issue-code">(<span v-text="issue.code" />)</nobr>
            </template>
            </span>
            <span class="details">
            <span v-text="issueDescription(issue)" />
            <template v-if="issue.expression">
              <br />
              <span v-if="issue.expression" v-text="issue.expression" />
            </template>
            <template v-if="issue.location">
              <br />
              <span v-if="issue.location" v-text="issue.location" />
            </template>
            </span>
          </div>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn ref="close" @click="close">Ok</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-overlay>
</div>
</template>

<style scoped>
.inline-panel-issues {
  border-top: solid thin silver;
  border-bottom: solid thin silver;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
}

.issue-list {
  display: table;
  border-spacing: 8px;
  max-height: 80vh;
  overflow-y: auto;
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
  padding-bottom: 8px;
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
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BaseResourceNoData } from "~/models/BaseResourceTableData";

export default Vue.extend({
  props: {
    title: String,
    saveOutcome: Object as PropType<fhir4.OperationOutcome>,
    showOutcome: Boolean,
    popupWhenErrors: { type: Boolean, required: false, default: true }
  },
  mounted() {
    this.$refs.close.$el.focus()
  },
  methods: {
    hideIssue(issue: fhir4.OperationOutcomeIssue): boolean {
      if (issue.severity === 'warning' && issue.code === 'incomplete' && issue.details?.text?.includes('Unable to resolve reference to profile')) return true;
      return false;
    },
    issueDescription(issue: fhir4.OperationOutcomeIssue): string {
      if (issue.details){
        if (issue.details?.text) return issue.details?.text;
        // Check to see if there are any codings
        if (issue.details.coding) {
          for (const coding of issue.details.coding){
            if (coding.display) return coding.display;
          }
        }
      }
      return issue.diagnostics ?? '(unknown)';
    },
    severityClassName(severity: string): string {
      if (severity === "fatal") return "fp-fatal";
      if (severity === "error") return "fp-error";
      if (severity === "warning") return "fp-warning";
      return "";
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>
