<template>
  <v-overlay :value="showOutcome">
    <v-card light style="margin: 12px;">
      <v-card-title v-text="title"></v-card-title>
      <v-card-text class="issue-list" v-if="saveOutcome">
        <template v-for="(issue, index) in saveOutcome.issue">
          <div class="issue-item" :key="index" v-if="!hideIssue(issue)">
            <span>
              <nobr>
              <v-icon v-if="issue.severity === 'error' || issue.severity === 'fatal'" style="color: red;">mdi-alert-octagon</v-icon>
              <v-icon v-if="issue.severity === 'warning'" style="color: orange">mdi-alert</v-icon>
            <span
              :class="severityClassName(issue.severity)"
              v-text="issue.severity"
            />
            </nobr>
            <template v-if="issue.code">
              <br/>
            (<span v-text="issue.code" />)
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
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">Ok</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<style scoped>
.issue-list {
  display: table;
  border-spacing: 8px;
  max-height: 80vh;
  overflow-y: auto;
}

.issue-item {
  display: table-row;
}

.issue-item > span {
  display: table-cell;
  padding-bottom: 8px;
}

.details span{
  word-break: break-word;
}

.fatal {
  color: red;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}

.warning {
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
    showOutcome: Boolean
  },
  methods: {
    hideIssue(issue: fhir4.OperationOutcomeIssue): boolean {
      if (issue.severity === 'warning' && issue.code === 'incomplete' && issue.details?.text?.includes('Unable to resolve reference to profile')) return true;
      return false;
    },
    severityClassName(severity: string): string {
      if (severity === "fatal") return "fatal";
      if (severity === "error") return "error";
      if (severity === "warning") return "warning";
      return "";
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>
