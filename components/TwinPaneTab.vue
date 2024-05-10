<template>
  <v-row dense :class="controlClassForLockedState()">
    <v-col>
      <v-tabs vertical @change="changeTab" v-model="selectedTabValue">
        <template v-for="(tabDetail, index) in tabs">
          <v-tab :key="index" :title="tabDetail.title" :class="tabIsActiveClass(index)" v-on:click="tabClicked"
            :disabled="!tabIsEnabled(index)" v-show="tabDetail.show">
            <v-icon left> {{ tabDetail.iconName }} </v-icon>
            {{ tabDetail.tabName }}
          </v-tab>
        </template>
        <div class="lock-unlock-panel" style="margin-left: auto; padding: 8px 1px;">
          <div>
            <v-btn v-if="!forceSinglePanel" class="btn-lock-toggle" elevation="0" tile small title="Lock left panel" value="left" @click="toggleLeft">
              <v-icon small v-if="paneLocked == 'left'">mdi-lock-outline</v-icon>
              <v-icon small v-if="paneLocked !== 'left'">mdi-lock-open-variant-outline</v-icon>
            </v-btn>
            <v-btn v-if="!forceSinglePanel" class="btn-lock-toggle" elevation="0" tile small title="Swap panels" @click="toggleLockPane">
              <v-icon small>mdi-swap-horizontal</v-icon>
            </v-btn>
            <v-btn v-if="!forceSinglePanel" class="btn-lock-toggle" elevation="0" tile small title="Lock right panel" value="right" @click="toggleRight">
              <v-icon small v-if="paneLocked !== 'left'">mdi-lock-outline</v-icon>
              <v-icon small v-if="paneLocked == 'left'">mdi-lock-open-variant-outline</v-icon>
            </v-btn>
            <v-btn v-if="!forceSinglePanel" class="btn-lock-toggle" v-model="forceSinglePanel" elevation="0" tile small title="Single panel view" @click="setSinglePanelMode(!forceSinglePanel)">
              <v-icon small>mdi-chevron-double-left</v-icon>
            </v-btn>
            <v-btn v-if="forceSinglePanel" class="btn-lock-toggle" v-model="forceSinglePanel" elevation="0" tile small title="Dual panel view" @click="setSinglePanelMode(!forceSinglePanel)">
              <v-icon small>mdi-chevron-double-right</v-icon>
            </v-btn>
          </div>
        </div>

        <v-tabs-items class="custom-tab" style="height: calc(100vh - 168px)" touchless v-model="selectedTabValue">

          <template v-for="(tabDetail, index) in tabs">
            <v-scroll-x-transition :key="index" mode="out-in" :hide-on-leave="true">
              <div v-show="tabIsVisible(index)" :eager="true" v-bind:style="tabStyleForOrder(index)" class="tab-scroll-parent">
                <v-card flat>
                  <v-card-text>
                    <p class="fl-tab-header" :title="tabDetail.title">{{ (tabDetail.tabHeaderName ?
    tabDetail.tabHeaderName : tabDetail.tabName) }}</p>
                    <div class="tab-detail">
                      <slot :name="tabDetail.tabName.replace(' ', '_')"></slot>
                    </div>
                  </v-card-text>
                </v-card>

              </div>
            </v-scroll-x-transition>
          </template>
        </v-tabs-items>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.custom-tab>div {
  flex-direction: row;
  position: relative;
}

.custom-tab>div>div {
  height: calc(100vh - 168px);
  overflow-y: auto;
}

.tab-detail {
  height: calc(100vh - 204px);
}

.tab-scroll-parent {
  position: relative;
}

.leftlocked .v-tabs-slider-wrapper {
  left: unset !important;
  right: 1px;
}

.leftlocked .primary-tab::after {
  left: 0;
}

.rightlocked .primary-tab::after {
  right: 1px;
}

.primary-tab::after {
  content: " ";
  height: 48px;
  width: 2px;
  position: absolute;
  z-index: 1;
  background-color: #1976d2;
  color: #1976d2 !important;
  border: thin;
}

@media (max-width: 596px) {
  .custom-tab>div>div {
    height: calc(100vh - 168px);
  }

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


.custom-tab>div>div {
  flex: 1;
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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TwinPaneTab extends Vue {

  // Properties visible to the parent component
  @Prop() readonly tabs!: TabData[];

  // Properties visible to the local template
  public selectedTabValue: number = 2;
  public paneLocked: 'left' | 'right' = 'left';
  public forceSinglePanel: boolean = false;

  // Internal variables
  lockedTab: number = 0;
  selectableTab: number = 2;
  windowWidth: number = 0;
  lastTabClicked: KeyboardEvent | MouseEvent | undefined = undefined;

  public singleTabMode(): boolean {
    return this.windowWidth <= 999 || this.forceSinglePanel;
  }

  /** Set the value of the SinglePanel mode */
  public setSinglePanelMode(value: boolean): void {
    this.forceSinglePanel = value;
    if (!value){
      this.$emit("change", this.lockedTab);
      this.$emit("change", this.selectableTab);
    } else {
      this.$emit("change", this.selectableTab);
    }
  }

  /** Get the index of the tab based on the tabName */
  public getTabIndex(name: string){
    return this.tabs.findIndex((tab, index) => tab.tabName.toLowerCase() === name.toLowerCase() || name == index.toString());
  }

  public selectTab(tabIndex: number): void {
    if ((this.lockedTab === tabIndex || this.selectableTab === tabIndex) && !this.singleTabMode()) {
      return;
    }
    this.changeTab(tabIndex);
  }

  /** Select the 2 tabs into the control, and lock one of them - unsets the forceSinglePanel mode too */
  public selectTabs(leftIndex: number, rightIndex: number, paneLocked: 'left' | 'right'): void {
    this.forceSinglePanel = false;
    this.paneLocked = paneLocked;
    if (paneLocked === 'left') {
      this.lockedTab = leftIndex;
      this.selectableTab = rightIndex;
    } else {
      this.lockedTab = rightIndex;
      this.selectableTab = leftIndex;
    }
    // Notify the parent component of the change
    this.$emit("change", this.lockedTab);
    this.$emit("change", this.selectableTab);
    this.lastTabClicked = undefined;
  }

  tabIsEnabled(index: number): boolean {
    // If the host explicitly disables the specific tab
    if (!this.tabs[index].enabled)
      return false;

    // Or the tab is the lockedTab
    if (index == this.lockedTab && !this.singleTabMode()) {
      return false;
    }
    return true;
  }

  tabIsVisible(index: number): boolean {
    if (this.singleTabMode()) {
      return this.selectableTab === index;
    }
    return this.lockedTab === index || (this.selectableTab === index && this.windowWidth > 999);
  }

  tabIsActiveClass(index: number): string {
    if (this.singleTabMode()) {
      return "";
    }
    let classValue = this.selectableTab === index || this.lockedTab === index ? "v-tab--active" : ""
    if (this.lockedTab === index) {
      classValue += " primary-tab";
    }
    return classValue;
  }

  controlClassForLockedState(): string {
    if (this.singleTabMode()) {
      return "";
    }
    return this.paneLocked === 'left' ? "leftlocked" : "rightlocked";
  }

  tabStyleForOrder(index: number): string {
    if (this.singleTabMode()) {
      return "order: 1;";
    }
    if (this.paneLocked !== 'left') {
      return `order: ${this.lockedTab === index ? 1 : 0};`;
    }
    return `order: ${this.lockedTab === index ? 1 : 2};`;
  }

  toggleLeft() {
    if (this.paneLocked != 'left') {
      this.paneLocked = 'left';
      this.toggleLockPane();
    }
  }
  toggleRight() {
    if (this.paneLocked != 'right') {
      this.paneLocked = 'right';
      this.toggleLockPane();
    }
  }

  toggleLockPane() {
    let temp = this.lockedTab;
    this.lockedTab = this.selectableTab;
    this.selectableTab = temp;
    this.selectedTabValue = this.selectableTab;
  }

  tabClicked(e: KeyboardEvent | MouseEvent): void {
    this.lastTabClicked = e;
  }

  changeTab(selectTab: number): void {
    if (this.lockedTab === selectTab && this.singleTabMode()) {
      // switch the lockedTab and selectableTab
      this.lockedTab = this.selectableTab;
    }
    this.selectableTab = selectTab;
    this.selectedTabValue = selectTab;
    this.$emit("change", selectTab);
    this.lastTabClicked = undefined;
  }

  mounted(): void {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      // if the boundary has transitioned, then we need to re-activate the locked/selectableTabs
      this.windowWidth = window.innerWidth
    }
    this.$emit("mounted");
  }
}

export interface TabData {
  iconName: string; // e.g. mdi-function-variant
  tabName: string;
  tabHeaderName?: string;
  title?: string;
  show: boolean;
  enabled: boolean;
}

</script>
