<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px; max-width: unset;">
      <br />
      <p class="leader">
        FhirPath Engine Compatibility Test
      </p>
      <template>
        <v-data-table :headers="headers" :items="testData" item-key="name" sort-by="name" group-by="groupName"
          class="elevation-1" :items-per-page="-1" :search="search" show-group-by dense>
          <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
          </template>
          <template v-slot:item.expression="{ item }">
            <a class="link-plain-text" :href="'FhirPath?expression=' + encodeURIComponent(item.expression)" target="_blank" v-html="item.expression?.replaceAll('\n', '<br/>')">
            </a>
          </template>

          <template v-slot:header.Firely="{ header }">
            <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ header.text.toUpperCase() }}</span>
            </template>
            <table>
              <tr><td>Passed</td><td align="right">{{ aggregateData.Firely?.passed }}</td></tr>
              <tr><td>Failed</td><td align="right">{{ aggregateData.Firely?.failed }}</td></tr>
              <tr><td>Not implemented</td><td align="right">{{ aggregateData.Firely?.notImplemented }}</td></tr>
            </table>
          </v-tooltip>
          </template>
          <template v-slot:header.FhirPathJS="{ header }">
            <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ header.text.toUpperCase() }}</span>
            </template>
            <table>
              <tr><td>Passed</td><td align="right">{{ aggregateData.FhirPathJS?.passed }}</td></tr>
              <tr><td>Failed</td><td align="right">{{ aggregateData.FhirPathJS?.failed }}</td></tr>
              <tr><td>Not implemented</td><td align="right">{{ aggregateData.FhirPathJS?.notImplemented }}</td></tr>
            </table>
          </v-tooltip>
          </template>
          <template v-slot:header.Hapi="{ header }">
            <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ header.text.toUpperCase() }}</span>
            </template>
            <table>
              <tr><td>Passed</td><td align="right">{{ aggregateData.Hapi?.passed }}</td></tr>
              <tr><td>Failed</td><td align="right">{{ aggregateData.Hapi?.failed }}</td></tr>
              <tr><td>Not implemented</td><td align="right">{{ aggregateData.Hapi?.notImplemented }}</td></tr>
            </table>
          </v-tooltip>
          </template>
          <template v-slot:header.AidboxData="{ header }">
            <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ header.text }}</span>
            </template>
            <table>
              <tr><td>Passed</td><td align="right">{{ aggregateData.AidboxData?.passed }}</td></tr>
              <tr><td>Failed</td><td align="right">{{ aggregateData.AidboxData?.failed }}</td></tr>
              <tr><td>Not implemented</td><td align="right">{{ aggregateData.AidboxData?.notImplemented }}</td></tr>
            </table>
          </v-tooltip>
          </template>
          <template v-slot:item.name="{ item }">
            <span v-html="item.name" />
            <template v-if="item.description">
              <br/>
              <span style="color: grey; font-style: italic;" v-html="item.description" />
            </template>
          </template>
          <template v-slot:item.Firely="{ item }">
            <v-icon v-if="item.Firely?.result === true" color="rgb(16, 185, 129)">mdi-check</v-icon>
            <v-icon v-if="item.Firely?.result === false" :title="computeMessage(item.Firely)" color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            <v-icon v-if="item.Firely?.notImplemented === true" :title="computeMessage(item.Firely)" color="grey">mdi-hammer-wrench</v-icon>
          </template>
          <template v-slot:item.FhirPathJS="{ item }">
            <v-icon v-if="item.FhirPathJS?.result === true" color="rgb(16, 185, 129)">mdi-check</v-icon>
            <v-icon v-if="item.FhirPathJS?.result === false" :title="computeMessage(item.FhirPathJS)" color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            <v-icon v-if="item.FhirPathJS?.notImplemented === true" :title="computeMessage(item.FhirPathJS)" color="grey">mdi-hammer-wrench</v-icon>
          </template>
          <template v-slot:item.Hapi="{ item }">
            <v-icon v-if="item.Hapi?.result === true" color="rgb(16, 185, 129)">mdi-check</v-icon>
            <v-icon v-if="item.Hapi?.result === false" :title="computeMessage(item.Hapi)" color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            <v-icon v-if="item.Hapi?.notImplemented === true" :title="computeMessage(item.Hapi)" color="grey">mdi-hammer-wrench</v-icon>
          </template>
          <template v-slot:item.AidboxData="{ item }">
            <v-icon v-if="item.AidboxData?.result === true" color="rgb(16, 185, 129)">mdi-check</v-icon>
            <v-icon v-if="item.AidboxData?.result === false" :title="computeMessage(item.AidboxData)" color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            <v-icon v-if="item.AidboxData?.notImplemented === true" :title="computeMessage(item.AidboxData)" color="grey">mdi-hammer-wrench</v-icon>
          </template>
          <template v-slot:item.Unknown="{ item }">
            <icon v-if="item.Unknown?.result === true">
              <v-icon color="rgb(16, 185, 129)">mdi-check</v-icon>
            </icon>
            <icon v-if="item.Unknown?.result === false">
              <v-icon color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            </icon>
          </template>
        </v-data-table>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
span.markdown p {
  margin-bottom: 8px;
}

.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  grid-auto-flow: dense;
}

.extractme {
  margin-top: 8px;
  padding: 12px;
  border: silver 1px solid;
}

.leader {
  font-size: x-large;
}

.link-plain-text {
  text-decoration: initial;
  color: initial;
}

p {
  text-align: justify;
  text-justify: inter-word;
}

.main::before {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('/fhir-lab-ico-300x300.png');
  background-position: center;
  background-attachment: fixed;
  /* Center the image */
  opacity: 0.2;
  z-index: -1;
}

.grid-span-2 {
  grid-column: span 2;
}

.logo {
  vertical-align: middle;
  justify-self: center;
  grid-row: span 6;
  grid-column: 3/5;
}

h5 {
  font-size: 18px;
}

.extra-links {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px 24px;
  grid-auto-flow: dense;

}

@media (max-width: 1200px) {
  .home-grid {
    grid-template-columns: auto 1fr auto 1fr;
  }

  .logo {
    grid-column: span 2;
    grid-row: span 4;
  }
}

@media (max-width: 1024px) {
  .home-grid {
    grid-template-columns: auto 1fr;
  }
}

@media (max-width: 596px) {
  .home-grid {
    grid-template-columns: auto;
    gap: 0;
  }

  .grid-span-2 {
    grid-column: span 1 !important;
  }

  .link-item {
    margin-top: 12px;
    justify-self: left !important;
  }
}
</style>
<script lang="ts">
import Vue from "vue";
var firelyData = require('~/static/results/Firely-5.11.4 R5.json');
var fhirPathJSData = require('~/static/results/fhirpath.js-4.4.0 R5.json');
var hapiData = require('~/static/results/Java 6.5.27 R5.json');
var aidboxData = require('~/static/results/Aidbox FHIR R5.json');
// var unknownData = require('~/static/results/Unknown.json');

interface ItemTestData {
  notImplemented?: boolean;
  result?: boolean;
  errMessage?: string;
}

export default Vue.extend({
  mounted() {
    this.injectData('Firely', firelyData);
    this.injectData('FhirPathJS', fhirPathJSData);
    this.injectData('Hapi', hapiData);
    this.injectData('AidboxData', aidboxData);
    // this.injectData('Unknown', unknownData);
    console.log('Summary results', this.aggregateData);
  },
  computed: {
  },
  methods: {
    computeMessage(item: any): string {
      return item?.errMessage;
    },
    customItemSort(a: ItemTestData, b: ItemTestData): number {
      // console.log('customItemSort called for', a, b);
      if (!a && !b) return 0;
      if (!a) return 1; // a is undefined, b is defined
      if (!b) return -1; // a is undefined, b is defined
      if (a?.valueOf() < b?.valueOf()) return -1;
      if (a?.valueOf() > b?.valueOf()) return 1;
      return 0;
    },
    injectData(engineName: string, data: any) {
      this.headers.push({
        text: data.EngineName,
        value: engineName,
        align: 'center',
        groupable: false,
        sort: this.customItemSort,
      });

      
      let  passed = 0;
      let failed = 0;
      let notImplemented = 0;

      for (let group of data.Groups) {
        // console.log(group.Name);
        for (let test of group.TestCases) {
          let item: { name: any; description?: string, groupName: any; expression?: string;[key: string]: any };

          // Check if the item already exists in testData
          let existingItem = this.testData.find(i => i.name === test.Name && i.groupName === group.Name);
          if (existingItem) {
            item = existingItem;
          } else {
            item = {
              name: test.Name,
              groupName: group.Name,
            };
            this.testData.push(item);
          }
          if (test.Expression) {
            item.expression = test.Expression;
          }
          if (test.Description) {
            item.description = test.Description;
          }
          item[engineName] = { 
            result: test.Result, 
            notImplemented: test.NotImplemented, 
            errMessage: test.FailureMessage, 
            valueOf: function() {
              if (this.result)
                return 0;
              if (this.notImplemented)
                return 2;
              return 1;
            }
          };
          if (test.Result === true) passed++;
          else if (test.Result === false) failed++;
          else if (test.NotImplemented === true) notImplemented++;
        }
        this.aggregateData[engineName] = {
          passed: passed,
          failed: failed,
          notImplemented: notImplemented,
        };
      }
    },
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Category', value: 'groupName', align: 'start' },
        {
          text: 'Test name',
          align: 'start',
          value: 'name',
          groupable: false,
        },
        {
          text: 'Expression',
          align: 'start',
          value: 'expression',
          groupable: false,
        },
      ] as Array<{ text: string; value: string; align?: string; groupable?: boolean; sort?: (a: any, b: any) => number }>,
      testData: [
        {
          name: 'testWhere1',
          groupName: 'testWhere',
        }
      ],
      aggregateData: {
      } as Record<string, { notImplemented: number; failed: number; passed: number }>,
    }
  }
});
</script>
