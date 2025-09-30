<template>
  <v-row dense :class="controlClassForLockedState()">
    <v-col cols="auto" style="padding-right:0">
      <!-- Vertical Tab Navigation -->
      <div class="tab-navigation">
        <template v-for="(tabDetail, index) in tabs" :key="index">
          <v-btn
            v-show="tabDetail.show"
            :disabled="!tabIsEnabled(index)"
            :class="['tab-button', tabIsActiveClass(index)]"
            :title="tabDetail.title"
            @click="changeTab(index)"
            variant="text"
            block
            size="large"
            style="justify-content: start;"
          >
            <v-icon :start="!showIconsOnly"> {{ tabDetail.iconName }} </v-icon>
            <span v-if="!showIconsOnly" style="text-align: left;">{{ tabDetail.tabName }}
              <template v-if="tabDetail.tabSubName"><i style="font-size: x-small; text-transform: lowercase"><br/>{{ tabDetail.tabSubName }}</i></template>
            </span>
          </v-btn>
        </template>
        
        <!-- Lock/Unlock Panel Controls -->
        <div class="lock-unlock-panel" style="padding: 8px 1px; margin-left: auto;">
          <div>
            <v-btn 
              v-if="!forceSinglePanel" 
              class="btn-lock-toggle" 
              elevation="0" 
              variant="text"
              size="small" 
              title="Lock left panel" 
              @click="toggleLeft"
            >
              <v-icon size="small" v-if="paneLocked == 'left'">mdi-lock-outline</v-icon>
              <v-icon size="small" v-if="paneLocked !== 'left'">mdi-lock-open-variant-outline</v-icon>
            </v-btn>
            <v-btn 
              v-if="!forceSinglePanel" 
              class="btn-lock-toggle" 
              elevation="0" 
              variant="text"
              size="small" 
              title="Swap panels" 
              @click="toggleLockPane"
            >
              <v-icon size="small">mdi-swap-horizontal</v-icon>
            </v-btn>
            <v-btn 
              v-if="!forceSinglePanel" 
              class="btn-lock-toggle" 
              elevation="0" 
              variant="text"
              size="small" 
              title="Lock right panel" 
              @click="toggleRight"
            >
              <v-icon size="small" v-if="paneLocked !== 'left'">mdi-lock-outline</v-icon>
              <v-icon size="small" v-if="paneLocked == 'left'">mdi-lock-open-variant-outline</v-icon>
            </v-btn>
            <v-btn 
              v-if="!forceSinglePanel" 
              class="btn-lock-toggle" 
              elevation="0" 
              variant="text"
              size="small" 
              title="Single panel view" 
              @click="setSinglePanelMode(!forceSinglePanel)"
            >
              <v-icon size="small">mdi-chevron-double-left</v-icon>
            </v-btn>
            <v-btn 
              v-if="forceSinglePanel" 
              class="btn-lock-toggle" 
              elevation="0" 
              variant="text"
              size="small" 
              title="Dual panel view" 
              @click="setSinglePanelMode(!forceSinglePanel)"
            >
              <v-icon size="small">mdi-chevron-double-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-col>
    
    <v-col style="padding-left:0">
      <!-- Tab Content Area -->
      <div class="custom-tab" style="height: calc(100vh - 168px)">
        <template v-for="(tabDetail, index) in tabs" :key="index">
          <div 
            v-if="tabIsVisible(index)" 
            :style="tabStyleForOrder(index)" 
            class="tab-scroll-parent"
          >
            <v-card variant="flat">
              <v-card-text>
                <p class="fl-tab-header" :title="tabDetail.title">
                  {{ (tabDetail.tabHeaderName ? tabDetail.tabHeaderName : tabDetail.tabName) }}
                  <template v-if="tabDetail.tabSubName"><i style="font-size: x-small; text-transform: lowercase"> {{ tabDetail.tabSubName }}</i></template>
                </p>
                <div class="tab-detail">
                  <slot :name="tabDetail.tabName.replace(' ', '_')"></slot>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.tab-navigation {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  height: calc(100vh - 168px);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

@media (max-width: 596px) {
  .tab-navigation {
    min-width: 60px; /* Narrower when showing icons only */
  }
}

.v-btn--disabled {
    opacity: 0.5;
}

.v-btn::after {
    border: none;
}

.tab-button {
  // margin-bottom: 2px !important;
  text-align: left;
  flex: none !important;
  border-radius: 0 !important;
  
  &.v-btn--active,
  &.tab-active {
    background-color: #D2F5FF;
    color: rgba(0, 0, 0, 0.87);
  }
  
  &.primary-tab {
    position: relative;
    
    &::after {
      content: "";
      height: 100%;
      width: 3px;
      position: absolute;
      top: 0;
      z-index: 1;
      background-color: #1976d2 !important;
      opacity: 1 !important;
      border: none;
    }
  }
  
  &.secondary-tab {
    position: relative;
    
    &::after {
      content: "";
      height: 100%;
      width: 3px;
      position: absolute;
      top: 0;
      z-index: 1;
      background-color: #1976d2 !important;
      opacity: 1 !important;
      border: none;
    }
  }
}

.custom-tab {
  height: calc(100vh - 168px);
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: row;
}

.custom-tab > div {
  position: relative;
  height: 100%;
}

/* Single tab mode - full width */
.custom-tab > div:only-child {
  flex: 1;
  width: 100%;
}

/* Dual tab mode - 50/50 split */
.custom-tab > div:not(:only-child) {
  flex: 1;
  width: 50%;
  min-width: 0; /* Allows flex items to shrink below their content size */
}

.tab-detail {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 204px);
}

.tab-detail > * {
  flex-shrink: 0;
}

.tab-scroll-parent {
  position: relative;
  height: 100%;
}

.leftlocked .primary-tab::after {
  left: 0;
  right: unset;
}

.rightlocked .primary-tab::after {
  right: 0;
  left: unset;
}

.leftlocked .secondary-tab::after {
  right: 0;
  left: unset;
}

.rightlocked .secondary-tab::after {
  left: 0;
}

@media (max-width: 596px) {
  .tab-detail {
    height: calc(100vh - 204px - 48px);
  }

  .btn-lock-toggle {
    min-width: unset !important;
    padding: 3px !important;
  }
}

.btn-lock-toggle {
  min-width: unset !important;
  padding: 3px !important;
}
</style>

<style lang="scss" scoped>
tr.ve-table-body-tr {
  cursor: pointer;
}

@media (max-width: 999px) {
  .lock-unlock-panel{
    display: none;
  }
}

td {
  vertical-align: top;
  height: unset !important;
  padding: 8px;
}

.fl-toolbar {
  margin-bottom: 6px;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Interface for tab data
export interface TabData {
  /** The icon to display in the tab e.g. mdi-function-variant */
  iconName: string;
  /** The name of the tab - also used as the slot name (spaces => `_`) */
  tabName: string;
  /** Display name for the tab */
  tabHeaderName?: string;
  /** Sub-name for the tab (shown under the header, or next to it in collapsed case) */
  tabSubName?: string;
  /** tooltip text for the tab */
  title?: string;
  /** Whether the tab is shown */
  show: boolean;
  /** Whether the tab is enabled */
  enabled: boolean;
}

// Props interface
interface Props {
  tabs: TabData[]
}

// Define props
const props = defineProps<Props>()

// Define emits
const emit = defineEmits<{
  'change': [tabIndex: number]
  'mounted': []
}>()

// Reactive state
const selectedTabValue = ref<number>(2)
const paneLocked = ref<'left' | 'right'>('left')
const forceSinglePanel = ref<boolean>(false)

// Internal variables
const lockedTab = ref<number>(0)
const selectableTab = ref<number>(1)
const windowWidth = ref<number>(0)

// Computed properties
const showIconsOnly = computed(() => {
  return windowWidth.value <= 596 // Show icons only when really narrow
})

// Methods
const getActiveTabs = (): TabData[] => {
  let result: TabData[] = []
  if (singleTabMode()) {
    const tab = props.tabs[selectableTab.value]
    if (tab) result.push(tab)
  } else {
    const lockedTabData = props.tabs[lockedTab.value]
    const selectableTabData = props.tabs[selectableTab.value]
    if (lockedTabData) result.push(lockedTabData)
    if (selectableTabData) result.push(selectableTabData)
  }
  return result
}

const singleTabMode = (): boolean => {
  return windowWidth.value <= 999 || forceSinglePanel.value
}

/** Set the value of the SinglePanel mode */
const setSinglePanelMode = (value: boolean): void => {
  forceSinglePanel.value = value
  if (!value) {
    emit("change", lockedTab.value)
    emit("change", selectableTab.value)
  } else {
    emit("change", selectableTab.value)
  }
}

/** Get the index of the tab based on the tabName */
const getTabIndex = (name: string): number => {
  return props.tabs.findIndex((tab, index) => 
    tab.tabName.toLowerCase() === name.toLowerCase() || name == index.toString()
  )
}

const selectTab = (tabIndex: number): void => {
  if ((lockedTab.value === tabIndex || selectableTab.value === tabIndex) && !singleTabMode()) {
    return
  }
  changeTab(tabIndex)
}

/** Select the 2 tabs into the control, and lock one of them - unsets the forceSinglePanel mode too */
const selectTabs = (leftIndex: number, rightIndex: number, paneLockedValue: 'left' | 'right'): void => {
  forceSinglePanel.value = false
  paneLocked.value = paneLockedValue
  if (paneLockedValue === 'left') {
    lockedTab.value = leftIndex
    selectableTab.value = rightIndex
  } else {
    lockedTab.value = rightIndex
    selectableTab.value = leftIndex
  }
  // Notify the parent component of the change
  emit("change", lockedTab.value)
  emit("change", selectableTab.value)
}

const tabIsEnabled = (index: number): boolean => {
  const tab = props.tabs[index]
  if (!tab) return false
  
  // If the host explicitly disables the specific tab
  if (!tab.enabled)
    return false

  // Or the tab is the lockedTab
  if (index == lockedTab.value && !singleTabMode()) {
    return false
  }
  return true
}

const tabIsVisible = (index: number): boolean => {
  if (singleTabMode()) {
    return selectableTab.value === index
  }
  return lockedTab.value === index || (selectableTab.value === index && windowWidth.value > 999)
}

const tabIsActiveClass = (index: number): string => {
  let classValue = ""
  
  if (singleTabMode()) {
    // In single mode, only highlight the currently selected tab
    if (selectableTab.value === index) {
      classValue += "tab-active"
    }
  } else {
    // In dual mode, highlight both the locked and selectable tabs
    if (selectableTab.value === index || lockedTab.value === index) {
      classValue += "tab-active"
    }
    
    // Add primary tab class for locked tab (shows the border)
    if (lockedTab.value === index) {
      classValue += " primary-tab"
    }
    
    // Add secondary tab class for selectable tab (shows the border on opposite side)
    if (selectableTab.value === index && lockedTab.value !== index) {
      classValue += " secondary-tab"
    }
  }
  
  return classValue
}

const controlClassForLockedState = (): string => {
  if (singleTabMode()) {
    return ""
  }
  return paneLocked.value === 'left' ? "leftlocked" : "rightlocked"
}

const tabStyleForOrder = (index: number): string => {
  if (singleTabMode()) {
    return "order: 1;"
  }
  if (paneLocked.value !== 'left') {
    return `order: ${lockedTab.value === index ? 1 : 0};`
  }
  return `order: ${lockedTab.value === index ? 1 : 2};`
}

const toggleLeft = (): void => {
  if (paneLocked.value != 'left') {
    paneLocked.value = 'left'
    toggleLockPane()
  }
}

const toggleRight = (): void => {
  if (paneLocked.value != 'right') {
    paneLocked.value = 'right'
    toggleLockPane()
  }
}

const toggleLockPane = (): void => {
  let temp = lockedTab.value
  lockedTab.value = selectableTab.value
  selectableTab.value = temp
  selectedTabValue.value = selectableTab.value
}

const changeTab = (selectTab: number): void => {
  if (lockedTab.value === selectTab && singleTabMode()) {
    // switch the lockedTab and selectableTab
    lockedTab.value = selectableTab.value
  }
  selectableTab.value = selectTab
  selectedTabValue.value = selectTab
  emit("change", selectTab)
}

// Lifecycle
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.onresize = () => {
    // if the boundary has transitioned, then we need to re-activate the locked/selectableTabs
    windowWidth.value = window.innerWidth
  }
  emit("mounted")
})

// Expose public methods for parent components
defineExpose({
  getActiveTabs,
  singleTabMode,
  setSinglePanelMode,
  getTabIndex,
  selectTab,
  selectTabs
})
</script>
