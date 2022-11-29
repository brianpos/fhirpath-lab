<template>
<div>
  <v-overlay v-if="visible" style="z-index:6;" :value="visible" >
    <v-card light style="margin: 12px; width: min(650px, 100vw)">
      <v-card-title v-text="title"></v-card-title>
      <v-card-text class="issue-list">
        <v-text-field label="Test Resource Id" full-width v-model="filename" hide-details="auto" autocomplete="off"
                        :prepend-icon="iconName"
                        autocorrect="off" autocapitalize="off" spellcheck="false">
          <template v-slot:append>
            <v-btn icon small tile @click="filename = ''">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary"  @click="download">Download</v-btn>
        <v-btn ref="closeButton" @click="close">Cancel</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-overlay>
</div>
</template>

<style scoped>
.inline-panel-issues {
  border-top: solid thin silver;
  border-bottom: solid thin silver;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
}

.issue-list {
  display: table;
  border-spacing: 8px;
  max-height: 80vh;
  overflow-y: auto;
}

.issue-item {
  display: table-row;
}

.issue-code {
  color: grey;
  font-size: small;
}

.issue-item > span {
  display: table-cell;
  padding-bottom: 8px;
  padding-right: 8px;
}

.details span{
  word-break: break-word;
}

.fp-fatal {
  color: red;
  font-weight: bold;
}

.fp-error {
  color: red;
  font-weight: bold;
}

.fp-warning {
  color: orange;
  font-weight: bold;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BaseResourceNoData } from "~/models/BaseResourceTableData";

export default Vue.extend({
  props: {
    iconName: String,
    title: String,
    visible: Boolean,
    initialFilename: String
  },
  methods: {
    download() {
      this.$emit("download", this.filename);
    },
    close() {
      this.$emit("close");
    },
  },
  data() {
    return {
      filename: ''
    };
  }
});
</script>
