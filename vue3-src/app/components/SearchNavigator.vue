<template>
  <div class="search-navigator">
    <v-toolbar-title
      style="display: inline-flex; font-size: medium"
      v-text="label"
    ></v-toolbar-title>
    <v-btn
      :disabled="!enableFirst || !enablePrevious"
      icon
      size="small"
      variant="text"
      @click="first && first()"
    >
      <v-icon>mdi-page-first</v-icon>
    </v-btn>
    <v-btn :disabled="!enablePrevious" icon size="small" variant="text" @click="previous && previous()">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-chip label variant="outlined" title="Total Record Count">
      <span v-text="count" />
    </v-chip>
    <v-btn :disabled="!enableNext" icon size="small" variant="text" @click="next && next()">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn :disabled="!enableLast || !enableNext" icon size="small" variant="text" @click="last && last()">
      <v-icon>mdi-page-last</v-icon>
    </v-btn>
    <v-btn v-if="showAdd" icon size="small" variant="text" :title="'Add New ' + label" @click="add && add()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  enableFirst?: boolean
  enablePrevious?: boolean
  enableNext?: boolean
  enableLast?: boolean
  showAdd?: boolean
  count?: number
  first?: () => void
  previous?: () => void
  next?: () => void
  last?: () => void
  add?: () => void
}

withDefaults(defineProps<Props>(), {
  label: '',
  enableFirst: false,
  enablePrevious: false,
  enableNext: false,
  enableLast: false,
  showAdd: false,
  count: undefined,
  first: undefined,
  previous: undefined,
  next: undefined,
  last: undefined,
  add: undefined,
})
</script>
