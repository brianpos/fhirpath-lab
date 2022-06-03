<template>
  <v-fab-transition>
    <div class="host"
        absolute
        right
    >
      <v-btn
        class="action-button"
        fab
        v-if="canEdit"
        dark
        elevation="2"
        icon
        x-small
        :title="'Edit ' + title"
        @click.stop="clickEdit()"
      >
        <v-icon small> mdi-pencil-outline </v-icon>
      </v-btn>
      <v-btn
        class="action-button"
        fab
        dark
        elevation="2"
        icon
        x-small
        :title="'Add New ' + title"
        @click.stop="clickAdd()"
      >
        <v-icon small> mdi-plus </v-icon>
      </v-btn>
      <v-btn
        class="action-button"
        fab
        v-if="canDelete"
        dark
        elevation="2"
        icon
        x-small
        :title="'Delete ' + title"
        @click.stop="clickDelete()"
      >
        <v-icon small> mdi-delete </v-icon>
      </v-btn>
    </div>
  </v-fab-transition>
</template>

<style scoped>
.host {
  right: 0px;
  bottom: -16px;
  display: inline-flex;
  gap: 4px;
  position: absolute;
  z-index: 2;
}
.action-button {
  background-color: #b19cd9 !important;
  /* right: 0px;
  bottom: -16px; */
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    title: { type: String, required: false },
    canDelete: { type: Boolean, required: false, default: false },
    canEdit: { type: Boolean, required: false, default: false },
  },
  methods: {
    clickAdd() {
      this.$emit("add");
    },
    clickEdit() {
      this.$emit("edit");
    },
    clickDelete() {
      this.$emit("delete");
    },
  },
});
</script>