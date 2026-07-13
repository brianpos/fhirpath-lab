<template>
  <v-card variant="flat">
    <v-card-text>
      <p v-if="!hideHeader" class="fl-tab-header">Details</p>
      <v-form>
        <v-text-field
          v-if="raw.resourceType !== 'SearchParameter'"
          v-model="raw.title"
          label="Title"
          :readonly="readonly"
          hide-details="auto"
          @update:model-value="notifyChange"
        />
        <v-checkbox
          v-show="showAdvancedSettings"
          v-model="raw.experimental"
          label="Experimental"
          :readonly="readonly"
          hide-details="auto"
          @update:model-value="notifyChange"
        />

        <v-textarea
          v-if="!readonly"
          v-model="raw.description"
          label="Description"
          title="A Markdown description shown when selecting this resource."
          auto-grow
          clearable
          rows="2"
          hide-details="auto"
          @update:model-value="notifyChange"
        />
        <label v-else class="v-label bare-label">Description</label>
        <div v-if="raw.description" class="markdown" v-html="renderMarkdown(raw.description)" />

        <v-textarea
          v-if="!readonly"
          v-model="raw.purpose"
          label="Purpose"
          title="A Markdown explanation of why this resource was created."
          auto-grow
          clearable
          rows="2"
          hide-details="auto"
          @update:model-value="notifyChange"
        />
        <label v-else class="v-label bare-label">Purpose</label>
        <div v-if="raw.purpose" class="markdown" v-html="renderMarkdown(raw.purpose)" />

        <v-text-field
          v-show="showAdvancedSettings && raw.resourceType !== 'SubscriptionTopic'"
          v-model="raw.name"
          label="Name"
          :readonly="readonly"
          hide-details="auto"
          spellcheck="false"
          @update:model-value="notifyChange"
        />

        <div v-if="raw.useContext?.length" class="mt-3">
          <span class="field-label">Use Context:</span>
          <code>{{ JSON.stringify(raw.useContext) }}</code>
        </div>

        <slot name="extension" />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ConformanceResourceInterface } from 'models/ConformanceResourceInterface'
import { renderSafeMarkdown } from '~/utils/safe-markdown'

const props = withDefaults(defineProps<{
  hideHeader?: boolean
  readonly?: boolean
  showAdvancedSettings?: boolean
  raw: ConformanceResourceInterface
}>(), {
  hideHeader: false,
  readonly: false,
  showAdvancedSettings: false,
})

const emit = defineEmits<{
  update: []
}>()

function notifyChange() {
  if (!props.readonly) emit('update')
}

const renderMarkdown = renderSafeMarkdown
</script>

<style scoped>
.field-label {
  font-weight: 600;
  margin-right: 8px;
}

.bare-label {
  display: block;
  margin-top: 12px;
}
</style>
