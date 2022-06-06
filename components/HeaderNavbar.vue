<template>
  <div class="header" data-app>
    <v-app-bar fixed app elevate-on-scroll dark>
      <v-app-bar-nav-icon class="logo" href="/"
        ><NuxtLogo
      /></v-app-bar-nav-icon>
      <v-toolbar-title>Fhirpath Lab</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="toggleFavourite !== undefined && favourites"
        title="this item is in your favourites list, click to remove"
        @click="clickToggleFavourite()"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="toggleFavourite !== undefined && !favourites"
        title="click to set as a favourite"
        @click="clickToggleFavourite()"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="0"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            class="fl-nav dots"
          >
            <span class="fl-refdata">Expression Sources</span
            ><v-icon class="fl-refdata2">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item href="/Library">
              <v-list-item-title>Expression Library</v-list-item-title>
            </v-list-item>
            <v-list-item href="/StructureDefinition">
              <v-list-item-title>Structure Definitions</v-list-item-title>
            </v-list-item>
            <v-list-item href="/SearchParameter">
              <v-list-item-title>Search Parameters</v-list-item-title>
            </v-list-item>
            <v-list-item href="/Questionnaire">
              <v-list-item-title>Form Definitions</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn icon small @click="overlay = true">
        <v-icon small>mdi-cog</v-icon>
      </v-btn>

      <template v-if="extended" v-slot:extension>
        <slot name="extension"></slot>
      </template>
    </v-app-bar>
    <v-overlay :value="overlay"
      ><user-settings @close="closeSettings"
    /></v-overlay>
  </div>
</template>

<style scoped>
.logo:hover img {
  filter: drop-shadow(1px 1px 4px white);
}

.dots {
  min-width: 0 !important;
  padding: 0 6px !important;
}
.fl-spacer.v-list-item {
  min-height: unset;
}

.fl-spacer.v-list-item > hr {
  margin: 2px 0;
}

.v-toolbar__title {
  /* text-shadow: 1px 1px 0 #000; */
}

.v-list-item--link:link {
  text-decoration: unset;
}
.fl-nav,
.theme--dark.v-btn.v-btn--has-bg {
  background-color: transparent;
  /* text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000; */
}

.v-icon.fl-refdata2 {
  display: none;
}
@media (max-width: 596px) {
  .v-icon.fl-refdata2 {
    display: inline-flex;
  }
  .fl-refdata {
    display: none;
  }
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import UserSettings from "./UserSettings.vue";

export default Vue.extend({
  components: { UserSettings },
  props: {
    extended: { type: Boolean, required: false },
    favourites: { type: Boolean, required: false },
    toggleFavourite: Function,
  },
  methods: {
    clickToggleFavourite() {
      if (this.toggleFavourite) this.toggleFavourite();
    },
    closeSettings() {
      this.overlay = false;
      this.$emit("close-settings");
    },
  },
  data: () => ({
    overlay: false,
  }),
});
</script>