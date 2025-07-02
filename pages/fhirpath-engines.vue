<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px">
      <br />
      <p class="leader">
        FhirPath Engine Compatibility Test
      </p>
      <template>
        <v-data-table :headers="headers" :items="testData" item-key="name" sort-by="name" group-by="groupName"
          class="elevation-1" :items-per-page="-1" :search="search" show-group-by>
          <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
          </template>
          <template v-slot:item.expression="{ item }">
            <span v-html="item.expression?.replaceAll('\n', '<br/>')" />
          </template>
          <template v-slot:item.name="{ item }">
            <span v-html="item.name" />
            <template v-if="item.description">
              <br/>
              <span style="color: grey; font-style: italic;" v-html="item.description" />
            </template>
          </template>
          <template v-slot:item.Firely="{ item }">
            <icon v-if="item.Firely?.result === true">
              <v-icon color="rgb(16, 185, 129)">mdi-check</v-icon>
            </icon>
            <icon v-if="item.Firely?.result === false">
              <v-icon color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            </icon>
          </template>
          <template v-slot:item.FhirPathJS="{ item }">
            <icon v-if="item.FhirPathJS?.result === true">
              <v-icon color="rgb(16, 185, 129)">mdi-check</v-icon>
            </icon>
            <icon v-if="item.FhirPathJS?.result === false" :title="computeMessage(item.FhirPathJS)">
              <v-icon color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            </icon>
            <icon v-if="item.FhirPathJS?.notImplemented === true" :title="computeMessage(item.FhirPathJS)">
              <v-icon color="grey">mdi-hammer-wrench</v-icon>
            </icon>
          </template>
          <template v-slot:item.Hapi="{ item }">
            <icon v-if="item.Hapi?.result === true">
              <v-icon color="rgb(16, 185, 129)">mdi-check</v-icon>
            </icon>
            <icon v-if="item.Hapi?.result === false">
              <v-icon color="rgb(239, 68, 68)">mdi-alert-outline</v-icon>
            </icon>
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
import { Expression } from "cql-execution";
import Vue, { PropType } from "vue";
var firelyData = require('~/static/results/Firely-5.11.4 R5.json');
var unknownData = require('~/static/results/Unknown.json');
var hapiData = require('~/static/results/Java 6.5.27 R5.json');
var fhirPathJSData = require('~/static/results/fhirpath.js-4.4.0 R5.json');

export default Vue.extend({
  mounted() {
    this.injectData('Firely', firelyData);
    this.injectData('FhirPathJS', fhirPathJSData);
    this.injectData('Hapi', hapiData);
    this.injectData('Unknown', unknownData);
  },
  computed: {
  },
  methods: {
    computeMessage(item: any): string {
      return item?.errMessage;
    },
    injectData(engineName: string, data: any) {
      this.headers.push({
        text: data.EngineName,
        value: engineName,
        align: 'center',
        groupable: false,
      });

      for (let group of data.Groups) {
        console.log(group.Name);
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
          item[engineName] = { result: test.Result, notImplemented: test.NotImplemented, errMessage: test.FailureMessage };
        }
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
      ],
      testData: [
        {
          name: 'testWhere1',
          groupName: 'testWhere',
        }
      ],
    }
  }
});
</script>
