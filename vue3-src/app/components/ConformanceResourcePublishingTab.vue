<template>
  <v-card variant="flat">
    <v-card-text>
      <p v-if="!hideHeader" class="fl-tab-header">Publishing</p>
      <v-form>
        <v-row dense>
          <v-col>
            <v-text-field
              v-model="raw.url"
              label="Canonical URL"
              :readonly="readonly || raw.status !== 'draft'"
              :rules="canonicalRules"
              hide-details="auto"
              spellcheck="false"
              @update:model-value="notifyChange"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="raw.version"
              label="Version"
              :readonly="readonly || raw.status !== 'draft'"
              hide-details="auto"
              spellcheck="false"
              @update:model-value="notifyChange"
            />
          </v-col>
        </v-row>

        <v-row dense align="end">
          <v-col>
            <v-select
              v-model="raw.status"
              label="Status"
              :items="statuses"
              :readonly="readonly"
              hide-details="auto"
              @update:model-value="notifyStatusChange"
            />
          </v-col>
          <v-col v-if="raw.status !== 'draft' && raw.id && raw.resourceType === 'Library'" cols="auto">
            <v-btn
              :to="{
                path: `/Library/${raw.id}:new`,
                query: navigationQuery ? { fhirserver: navigationQuery } : {},
              }"
              target="_blank"
            >
              Draft New Version
            </v-btn>
          </v-col>
        </v-row>

        <div v-if="showAdvancedSettings" class="mt-3">
          Publish Date: {{ formatDate(raw.date, '(unpublished)') }}
        </div>

        <v-text-field
          v-show="showAdvancedSettings"
          v-model="raw.publisher"
          label="Publisher"
          :readonly="readonly || lockPublisher"
          hide-details="auto"
          @update:model-value="notifyChange"
        />
        <v-textarea
          v-show="showAdvancedSettings"
          v-model="raw.copyright"
          label="Copyright"
          :readonly="readonly"
          :clearable="!readonly"
          auto-grow
          rows="2"
          hide-details="auto"
          @update:model-value="notifyChange"
        />
        <div v-if="raw.copyright" class="markdown" v-html="renderMarkdown(raw.copyright)" />
      </v-form>

      <v-table v-if="publishedVersions?.length" density="compact" class="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Canonical Version</th>
            <th>Status</th>
            <th>Server Version</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in publishedVersions" :key="item.id ?? item.version">
            <td>
              <strong v-if="item.id === raw.id">{{ item.id }}</strong>
              <a
                v-else-if="item.id"
                :href="publishedVersionLink(item.id)"
                target="_blank"
              >{{ item.id }}</a>
            </td>
            <td>{{ item.version }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.meta?.versionId }}</td>
            <td>{{ formatDate(item.meta?.lastUpdated) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import type { ConformanceResourceInterface } from 'models/ConformanceResourceInterface'
import { formatDate } from '@legacy/helpers/datetime'
import { renderSafeMarkdown } from '~/utils/safe-markdown'

const props = withDefaults(defineProps<{
  hideHeader?: boolean
  readonly?: boolean
  lockPublisher?: boolean
  showAdvancedSettings?: boolean
  raw: ConformanceResourceInterface
  publishedVersions?: ConformanceResourceInterface[] | null
  navigationLinkPrefix?: string
  navigationQuery?: string
}>(), {
  hideHeader: false,
  readonly: false,
  lockPublisher: false,
  showAdvancedSettings: false,
  publishedVersions: null,
  navigationLinkPrefix: '',
  navigationQuery: '',
})

const emit = defineEmits<{
  update: []
}>()

const statuses = ['active', 'draft', 'retired']
const canonicalRules = [
  (value: string) => !!value || 'Required.',
  (value: string) => !value || value.length >= 3 || 'Min 3 characters',
]

function notifyChange() {
  if (!props.readonly) emit('update')
}

function notifyStatusChange() {
  if (!props.readonly && props.raw.status === 'active') {
    props.raw.date = DateTime.now().toISO()
  }
  notifyChange()
}

const renderMarkdown = renderSafeMarkdown

function publishedVersionLink(id: string | undefined) {
  const path = `${props.navigationLinkPrefix}${id ?? ''}`
  if (!props.navigationQuery) return path
  return `${path}?fhirserver=${encodeURIComponent(props.navigationQuery)}`
}
</script>
