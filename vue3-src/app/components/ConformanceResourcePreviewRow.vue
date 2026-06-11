<template>
  <span v-if="row">
    <div v-if="row.description && row.description != row.title">
      <span v-html="convertHtml(row.description)"></span>
    </div>
    <div v-if="row.url">
      <code>{{ row.url }}<template v-if="row.version">|{{ row.version }}</template></code>
    </div>
    <div v-if="row.publisher">
      <span class="label">Publisher:</span> {{ row.publisher }}
    </div>
    <div v-if="row.date">
      <span class="label">Published:</span> {{ row.date }}
    </div>
    <div v-if="row.extendedDescription">
      <code class="fhirpath">{{ row.extendedDescription }}</code>
    </div>
  </span>
</template>

<style scoped>
code.fhirpath {
  margin-top: 4px;
  margin-left: 48px;
  padding: 8px;
  padding-left: 16px;
  display: block;
  font-size: 14px;
}

.label {
  color: lightslategray;
}

code {
  word-break: break-all;
  color: #6f42c1;
}
</style>

<script setup lang="ts">
import { marked } from 'marked'
import type { ConformanceResourceTableData } from '@legacy/models/ConformanceResourceTableData'

interface Props {
  row?: ConformanceResourceTableData
}

defineProps<Props>()

const convertHtml = (field: string | undefined): string => {
  if (!field) return ''
  return marked(field) as string
}
</script>
