<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="true">
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 114px">
      <CsiroRenderer/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { settings } from "~/helpers/user_settings";

export default Vue.extend({
  head: {
    title: "SmartForms",
  },
  mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
  },
  methods: {
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },
  }
});
</script>
