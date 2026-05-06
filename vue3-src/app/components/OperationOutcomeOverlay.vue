<template>
  <div>
    <div class="inline-panel-issues" v-if="!popupWhenErrors && saveOutcome">
      <v-btn style="float:right;" icon size="small" variant="text" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <template v-for="(issue, index) in saveOutcome.issue" :key="index">
        <div class="issue-item" v-if="!hideIssue(issue)">
          <span>
            <span class="no-wrap">
              <v-icon v-if="issue.severity === 'error' || issue.severity === 'fatal'" color="red">mdi-alert-octagon</v-icon>
              <v-icon v-if="issue.severity === 'warning'" color="orange">mdi-alert</v-icon>
              <span :class="severityClassName(issue.severity)" v-text="issue.severity" />
            </span>
            <template v-if="issue.code">
              <br />
              <span class="issue-code no-wrap">(<span v-text="issue.code" />)</span>
            </template>
          </span>
          <span class="details">
            <span style="max-height:100px; overflow-y: auto" v-text="issueDescription(issue)" />
            <template v-if="issue.expression">
              <br />
              <span v-text="issue.expression" />
            </template>
            <template v-if="issue.location">
              <br />
              <span v-text="issue.location" />
            </template>
          </span>
        </div>
      </template>
    </div>

    <v-overlay v-if="popupWhenErrors" :model-value="showOutcome" style="z-index:6;">
      <v-card style="margin: 12px;">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text class="issue-list" v-if="saveOutcome">
          <template v-for="(issue, index) in saveOutcome.issue" :key="index">
            <div class="issue-item" v-if="!hideIssue(issue)">
              <span>
                <span class="no-wrap">
                  <v-icon v-if="issue.severity === 'error' || issue.severity === 'fatal'" color="red">mdi-alert-octagon</v-icon>
                  <v-icon v-if="issue.severity === 'warning'" color="orange">mdi-alert</v-icon>
                  <span :class="severityClassName(issue.severity)" v-text="issue.severity" />
                </span>
                <template v-if="issue.code">
                  <br />
                  <span class="issue-code no-wrap">(<span v-text="issue.code" />)</span>
                </template>
              </span>
              <span class="details">
                <span v-text="issueDescription(issue)" />
                <template v-if="issue.expression">
                  <br />
                  <span v-text="issue.expression" />
                </template>
                <template v-if="issue.location">
                  <br />
                  <span v-text="issue.location" />
                </template>
              </span>
            </div>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="close">Ok</v-btn>
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
  display: block;
  border-spacing: 8px;
  max-height: 75vh;
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

.details span {
  word-break: break-word;
}

.no-wrap {
  white-space: nowrap;
}

.fp-fatal,
.fp-error {
  color: red;
  font-weight: bold;
}

.fp-warning {
  color: orange;
  font-weight: bold;
}
</style>

<script setup lang="ts">
import type { OperationOutcome, OperationOutcomeIssue } from 'fhir/r4b'

interface Props {
  title?: string
  saveOutcome?: OperationOutcome
  showOutcome?: boolean
  popupWhenErrors?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  saveOutcome: undefined,
  showOutcome: false,
  popupWhenErrors: true,
})

const emit = defineEmits<{
  close: []
}>()

const hideIssue = (issue: OperationOutcomeIssue): boolean => {
  if (
    issue.severity === 'warning' &&
    issue.code === 'incomplete' &&
    issue.details?.text?.includes('Unable to resolve reference to profile')
  )
    return true
  return false
}

const issueDescription = (issue: OperationOutcomeIssue): string => {
  if (issue.details) {
    if (issue.details.text) return issue.details.text
    if (issue.details.coding) {
      for (const coding of issue.details.coding) {
        if (coding.display) return coding.display
      }
    }
  }
  return issue.diagnostics ?? '(unknown)'
}

const severityClassName = (severity: string): string => {
  if (severity === 'fatal') return 'fp-fatal'
  if (severity === 'error') return 'fp-error'
  if (severity === 'warning') return 'fp-warning'
  return ''
}

const close = () => {
  emit('close')
}
</script>
