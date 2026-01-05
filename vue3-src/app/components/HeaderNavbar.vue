<template>
  <div class="header" data-app>
    <v-app-bar fixed app elevate-on-scroll theme="dark">
      <v-app-bar-nav-icon class="logo" @click="navigateTo('/')" title="Fhirpath Lab Home">
        <img alt="" style="margin-top:-15px;margin-bottom:-10px;" src="/Square44x44Logo.scale-150.png"/>
      </v-app-bar-nav-icon>
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

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="0"
            dark
            v-bind="props"
            class="fl-nav dots"
            title="Expression Sources"
          >
            <span class="fl-refdata">Expression Sources</span
            ><v-icon class="fl-refdata2">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list theme="light">
          <v-list-item @click="navigateTo('/FhirPath')" :active="isActive('/FhirPath')">
            <template v-slot:prepend>
              <v-icon> mdi-bug-outline </v-icon>
            </template>
            <v-list-item-title>Test FhirPath</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/fml')" :active="isActive('/fml')">
            <template v-slot:prepend>
              <v-icon> mdi-chart-gantt </v-icon>
            </template>
            <v-list-item-title>Test Structure Map</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="navigateTo('/Library')" :active="isActive('/Library')">
            <template v-slot:prepend>
              <v-icon> mdi-library-outline </v-icon>
            </template>
            <v-list-item-title>Expression Library</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="navigateTo('/StructureDefinition')" :active="isActive('/StructureDefinition')">
            <v-list-item-title>Structure Definitions</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/SearchParameter')" :active="isActive('/SearchParameter')">
            <v-list-item-title>Search Parameters</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/Questionnaire')" :active="isActive('/Questionnaire')">
            <v-list-item-title>Questionnaires</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/SubscriptionTopic')" :active="isActive('/SubscriptionTopic')">
            <v-list-item-title>Subscription Topics</v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/StructureMap')" :active="isActive('/StructureMap')">
            <v-list-item-title>Structure Maps</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon size="small" density="comfortable" @click="overlay = true" title="Settings">
        <v-icon size="medium">mdi-cog</v-icon>
      </v-btn>

      <template v-if="extended" v-slot:extension>
        <slot name="extension"></slot>
      </template>
      
      <slot name="extraNavButtons"></slot>
    </v-app-bar>
    <v-dialog v-model="overlay" max-width="600px">
      <!-- TODO: Implement UserSettings component for Vue 3 -->
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-card-text>Settings panel coming soon...</v-card-text>
        <v-card-actions>
          <v-btn @click="closeSettings">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
::v-deep(.v-list-item__spacer) {
    width: 12px !important;
}

.logo:hover img {
  filter: drop-shadow(1px 1px 4px white);
}

.fp-username {
  font-weight: normal;
  text-transform: none;
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// TODO: Import UserSettings component when available in Vue 3 version
// import UserSettings from './UserSettings.vue'

// Props interface
interface Props {
  extended?: boolean
  favourites?: boolean
  toggleFavourite?: () => void
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  extended: false,
  favourites: false,
  toggleFavourite: undefined
})

// Define emits
const emit = defineEmits<{
  'close-settings': []
}>()

// Vue Router
const router = useRouter()
const route = useRoute()

// TypeScript reactive data
const overlay = ref(false)

// Computed property to check if a path is active
const isActive = (path: string) => {
  // Case-insensitive comparison and handle trailing slashes
  const currentPath = route.path.toLowerCase().replace(/\/$/, '')
  const checkPath = path.toLowerCase().replace(/\/$/, '')
  return currentPath === checkPath
}

// Methods
const clickToggleFavourite = () => {
  if (props.toggleFavourite) {
    props.toggleFavourite()
  }
}

const closeSettings = () => {
  overlay.value = false
  emit('close-settings')
}

const navigateTo = (path: string) => {
  router.push(path)
}
</script>