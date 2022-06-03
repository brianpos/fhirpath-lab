<template>
  <div>
    <v-toolbar-title
      style="display: inline-flex; font-size: medium"
      v-text="label"
    ></v-toolbar-title>
    <v-btn
      :disabled="!enableFirst || !enablePrevious"
      icon
      small
      @click="first"
    >
      <v-icon> mdi-page-first </v-icon>
    </v-btn>
    <v-btn :disabled="!enablePrevious" icon small @click="previous">
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-chip label outlined title="Total Record Count"
      ><span v-text="count"
    /></v-chip>
    <v-btn :disabled="!enableNext" icon small @click="next">
      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
    <v-btn :disabled="!enableLast || !enableNext" icon small @click="last">
      <v-icon> mdi-page-last </v-icon>
    </v-btn>
    <v-btn v-if="showAdd" icon small :title="'Add New ' + label" @click="add">
      <v-icon> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    label: String,
    enableFirst: Boolean,
    enablePrevious: Boolean,
    enableNext: Boolean,
    enableLast: Boolean,
    showAdd: { type: Boolean, required: false },
    count: { type: Number, required: false },
    first: Function as PropType<() => void>,
    previous: Function as PropType<() => void>,
    next: Function as PropType<() => void>,
    last: Function as PropType<() => void>,
    add: Function as PropType<() => void>
  },
});
</script>
