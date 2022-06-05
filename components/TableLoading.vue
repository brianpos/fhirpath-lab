<template>
  <span style="height 0;">
    <v-progress-circular
      class="fl-spinner"
      indeterminate
      :size="80"
      :width="10"
      color="#6f42c1"
    >
    </v-progress-circular>
  </span>
</template>

<style>
.fl-spinner {
  position: absolute;
  top: calc(50vh - 40px);
  left: calc(50vw - 40px);
  z-index: 1000;
}
</style>
