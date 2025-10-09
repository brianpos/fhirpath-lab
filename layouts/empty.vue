<template>
  <v-app>
    <v-main style="padding: 0;">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class EmptyLayout extends Vue {}
</script>

<style scoped>
/* Remove all padding and margins for iframe embedding */
</style>
