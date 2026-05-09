<template>
  <v-overlay :model-value="true" persistent contained class="fl-table-loading-overlay" :opacity="0">
    <v-progress-circular
      class="fl-spinner2"
      indeterminate
      :size="80"
      :width="10"
      color="#3F81AE"
    />
  </v-overlay>
</template>

<style scoped>
.fl-spinner2 {
  position: fixed;
  top: calc(50vh - 40px);
  left: calc(50vw - 40px);
  z-index: 1000;
}
</style>

<script setup lang="ts">
</script>
