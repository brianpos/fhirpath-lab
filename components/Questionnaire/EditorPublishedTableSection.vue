<template>
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
        <tr v-for="(item, index) in publishedVersions"
            :key="index">
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
              <b v-if="item.meta">{{ formatDate(item.meta.lastUpdated) }}</b>
            </td>
          </template>
          <template v-if="item.id !== raw.id">
            <td>
              <a v-bind:href="item.id"
                 target="_blank"
                 v-bind:title="item.title">{{ item.id }}</a>
            </td>
            <td>{{ item.version }}</td>
            <td>{{ item.status }}</td>
            <td><template  v-if="item.meta">{{ item.meta.versionId }}</template></td>
            <td><template  v-if="item.meta">{{ formatDate(item.meta.lastUpdated) }}</template></td>
          </template>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<style>
.group {
  background-color: #b19cd920;
}
td {
  vertical-align: top;
  height: unset !important;
  padding: 8px !important;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Questionnaire } from "fhir/r4";
import { formatDate, parseDate } from "~/helpers/datetime";

export default {
  props: {
    raw: Object as PropType<Questionnaire>,
  },
  methods: {
    formatDate(
      fhirDateTime: string | undefined,
      emptyMessage?: string
    ): string {
      return formatDate(fhirDateTime, emptyMessage);
    },
  },
  data(): ComponentData {
    return {
      publishedVersions : []}
  }
};

interface ComponentData {
  publishedVersions: Questionnaire[]
}
</script>
