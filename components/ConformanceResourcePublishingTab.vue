<template>
  <v-card flat>
    <v-card-text>
      <p class="fl-tab-header">Publishing</p>
      <v-form>
        <v-row no-gutters>
            <v-textarea auto-grow rows="1"
              label="Canonical URL"
              v-model="raw.url"
              :readonly="readonly || raw.status !== 'draft'"
              hide-details="auto"
              @input="notifyChange"
              :rules="rules"
              spellcheck="false"
            />
            <v-text-field
              class="version"
              label="Version"
              v-model="raw.version"
              :readonly="readonly || raw.status !== 'draft'"
              hide-details="auto"
              @input="notifyChange"
              spellcheck="false"
            />
        </v-row>
        <v-row no-gutters class="row-gap">
            <v-select
              label="Status"
              class="version"
              :items="statuses"
              v-model="raw.status"
              hide-details="auto"
              @input="notifyStatusChange"
            />
            <a
              v-if="raw.status !== 'draft' && raw.id"
              v-bind:href="'/' + raw.resourceType + '/' + raw.id + ':new'"
              target="_blank"
            >
              <v-btn class="row-button" small> Draft New Version </v-btn>
            </a>
        </v-row>
        <template v-if="showAdvancedSettings">
        Publish Date:
        <span v-text="formatDate(raw.date, '(unpublished)')" />
        <br />
        </template>

        <v-text-field
          label="Publisher"
          v-show="showAdvancedSettings"
          v-model="raw.publisher"
          :readonly="readonly"
          @input="notifyChange"
          hide-details="auto"
        />

        <v-textarea
          label="Copyright"
          v-show="showAdvancedSettings"
          v-model="raw.copyright"
          :readonly="readonly"
          @input="notifyChange"
          auto-grow
          hide-details="auto"
          clearable
          rows="2"
        />
        <span class="markdown" v-html="convertHtml(raw.copyright)" />
      </v-form>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Canonical Version</th>
              <th class="text-left">Status</th>
              <th class="text-left">Version</th>
              <th class="text-left">Modified</th>
            </tr>
          </thead>
          <tbody v-if="publishedVersions">
            <tr v-for="(item, index) in publishedVersions" :key="index">
              <template v-if="raw && item.id === raw.id">
                <td>
                  <b>{{ item.id }}</b>
                </td>
                <td>
                  <b>{{ item.version }}</b>
                </td>
                <td>
                  <b>{{ item.status }}</b>
                </td>
                <td>
                  <b v-if="item.meta">{{ item.meta.versionId }}</b>
                </td>
                <td>
                  <b v-if="item.meta">{{
                    formatDate(item.meta.lastUpdated)
                  }}</b>
                </td>
              </template>
              <template v-if="item.id !== raw.id">
                <td>
                  <a
                    v-bind:href="item.id"
                    target="_blank"
                    v-bind:title="item.title"
                    >{{ item.id }}</a
                  >
                </td>
                <td>{{ item.version }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <template v-if="item.meta">{{
                    item.meta.versionId
                  }}</template>
                </td>
                <td>
                  <template v-if="item.meta">{{
                    formatDate(item.meta.lastUpdated)
                  }}</template>
                </td>
              </template>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<style>

.row-button {
  margin-top: 16px;
}
.row-gap {
  column-gap: 4px;
}
.row.no-gutters {
  column-gap: 20px;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { formatDate, parseDate } from "~/helpers/datetime";
import { ConformanceResourceInterface } from "~/models/ConformanceResourceInterface";
import { marked } from "marked";
import { DateTime } from "luxon";

export default Vue.extend({
  props: {
    readonly: Boolean,
    showAdvancedSettings: Boolean,
    raw: Object as PropType<ConformanceResourceInterface>,
    publishedVersions: {
      type: Array as PropType<ConformanceResourceInterface[]>,
      required: false,
    },
  },
  computed: {
    useExtensions: function (): boolean {
      if (this.raw.resourceType === "SearchParameter") return true;
      if (this.raw.resourceType === "StructureDefinition") return true;
      return false;
    },
    effectiveStartDate: function () {
      if (this.raw.effectivePeriod)
        return formatDate(this.raw.effectivePeriod.start);
      return undefined;
    },
    effectiveEndDate: function () {
      if (this.raw.effectivePeriod)
        return formatDate(this.raw.effectivePeriod.end);
      return undefined;
    },
  },
  methods: {
    notifyChange() {
      this.$emit("update");
    },
    notifyStatusChange() {
      if (this.raw.status === "active") {
        // status was changed to publishing, so set the date
        this.raw.date =
          DateTime.now().toISODate() + "T" + DateTime.now().toISOTime();
      }
      this.notifyChange();
    },
    setEffectiveStartDate(value: any) {
      const oldVal = this.raw.effectivePeriod?.start;
      if (!this.raw.effectivePeriod) this.raw.effectivePeriod = {};
      this.raw.effectivePeriod.start = parseDate(value);
      if (!this.raw.effectivePeriod.start && !this.raw.effectivePeriod.end) {
        delete this.raw.effectivePeriod;
      }
      if (oldVal !== this.raw.effectivePeriod?.start) this.notifyChange();
    },
    setEffectiveEndDate(value: any) {
      const oldVal = this.raw.effectivePeriod?.end;
      if (!this.raw.effectivePeriod) this.raw.effectivePeriod = {};
      this.raw.effectivePeriod.end = parseDate(value);
      if (!this.raw.effectivePeriod.start && !this.raw.effectivePeriod.end) {
        delete this.raw.effectivePeriod;
      }
      if (oldVal !== this.raw.effectivePeriod?.end) this.notifyChange();
    },
    formatDate(
      fhirDateTime: string | undefined,
      emptyMessage?: string
    ): string {
      return formatDate(fhirDateTime, emptyMessage);
    },
    parseDate(value: string) {
      return parseDate(value);
    },
    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
  },
  data: () => {
    return {
      statuses: ["active", "draft", "retired"],
      rules: [
        (value: string) => !!value || "Required.",
        (value: string) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
  },
});
</script>
