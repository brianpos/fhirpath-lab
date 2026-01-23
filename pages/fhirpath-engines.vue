<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px; max-width: unset;">
      <br />
      <p class="leader">
        FhirPath Engine Compatibility Test
      </p>

      <!-- Summary Table -->
      <!-- <v-progress-circular v-if="loading" indeterminate color="primary" class="ma-4"></v-progress-circular> -->
      <v-simple-table dense class="elevation-1 summary-table mb-4">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Engine</th>
              <th class="text-right">Passed</th>
              <th class="text-right">Failed</th>
              <th class="text-right">Not Implemented</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, engine) in aggregateData" :key="engine">
              <td>{{ engineDisplayNames[engine] || engine }}</td>
              <td class="text-right" style="color: rgb(16, 185, 129);">{{ data.passed }}</td>
              <td class="text-right" style="color: rgb(239, 68, 68);">{{ data.failed }}</td>
              <td class="text-right" style="color: grey;">{{ data.notImplemented }}</td>
              <td class="text-right"><strong>{{ data.passed + data.failed + data.notImplemented }}</strong></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <template >
        <v-data-table :headers="headers" :items="filteredTestData" item-key="name" 
          sort-by="name" group-by="groupName"
          class="elevation-1" :items-per-page="-1" :search="debouncedSearch" :custom-filter="customFilter" 
          show-group-by dense>
          <template v-slot:top>
            <div class="d-flex align-center mx-4">
              <v-text-field v-model="search" label="Search" class="mr-4"></v-text-field>
              <v-checkbox v-model="hideFullySupported" label="Hide fully supported" hide-details dense class="mr-4"></v-checkbox>
              <v-btn icon small @click="loadData" :loading="loading" title="Refresh data">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:item.expression="{ item }">
            <a class="link-plain-text expression-cell" :href="'https://hackweek.fhirpath-lab.com/FhirPath?expression=' + encodeURIComponent(item.expression)" target="_blank">{{ item.expression }}</a>
          </template>

          <template v-slot:header.Firely="{ header }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ header.text }}</span>
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
                <span v-bind="attrs" v-on="on">{{ header.text }}</span>
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
                <span v-bind="attrs" v-on="on">{{ header.text }}</span>
              </template>
              <table>
                <tr><td>Passed</td><td align="right">{{ aggregateData.Hapi?.passed }}</td></tr>
                <tr><td>Failed</td><td align="right">{{ aggregateData.Hapi?.failed }}</td></tr>
                <tr><td>Not implemented</td><td align="right">{{ aggregateData.Hapi?.notImplemented }}</td></tr>
              </table>
            </v-tooltip>
          </template>
          <template v-slot:header.PythonData="{ header }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ header.text }}</span>
              </template>
              <table>
                <tr><td>Passed</td><td align="right">{{ aggregateData.PythonData?.passed }}</td></tr>
                <tr><td>Failed</td><td align="right">{{ aggregateData.PythonData?.failed }}</td></tr>
                <tr><td>Not implemented</td><td align="right">{{ aggregateData.PythonData?.notImplemented }}</td></tr>
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
          <template v-slot:header.HeliosData="{ header }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ header.text }}</span>
              </template>
              <table>
                <tr><td>Passed</td><td align="right">{{ aggregateData.HeliosData?.passed }}</td></tr>
                <tr><td>Failed</td><td align="right">{{ aggregateData.HeliosData?.failed }}</td></tr>
                <tr><td>Not implemented</td><td align="right">{{ aggregateData.HeliosData?.notImplemented }}</td></tr>
              </table>
            </v-tooltip>
          </template>
          <template v-slot:header.IgnixaData="{ header }">
            <v-tooltip bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">{{ header.text }}</span>
              </template>
              <table>
                <tr><td>Passed</td><td align="right">{{ aggregateData.IgnixaData?.passed }}</td></tr>
                <tr><td>Failed</td><td align="right">{{ aggregateData.IgnixaData?.failed }}</td></tr>
                <tr><td>Not implemented</td><td align="right">{{ aggregateData.IgnixaData?.notImplemented }}</td></tr>
              </table>
            </v-tooltip>
          </template>

          <template v-slot:item.name="{ item }">
            <span v-text="item.name" />
            <template v-if="item.description">
              <br/>
              <v-icon v-if="item.description.startsWith('Contested:')" color="purple">mdi-information-outline</v-icon>
              <span v-if="item.description.startsWith('Contested:')" style="color: purple;;" v-text="item.description" />
              <span v-if="!item.description.startsWith('Contested:')" style="color: grey; font-style: italic;" v-text="item.description" />
            </template>
          </template>

          <template v-slot:item.Firely="{ item }">
            <span :class="getResultClass(item.Firely)" :title="item.Firely?.errMessage">{{ getResultSymbol(item.Firely) }}</span>
          </template>
          <template v-slot:item.FhirPathJS="{ item }">
            <span :class="getResultClass(item.FhirPathJS)" :title="item.FhirPathJS?.errMessage">{{ getResultSymbol(item.FhirPathJS) }}</span>
          </template>
          <template v-slot:item.Hapi="{ item }">
            <span :class="getResultClass(item.Hapi)" :title="item.Hapi?.errMessage">{{ getResultSymbol(item.Hapi) }}</span>
          </template>
          <template v-slot:item.PythonData="{ item }">
            <span :class="getResultClass(item.PythonData)" :title="item.PythonData?.errMessage">{{ getResultSymbol(item.PythonData) }}</span>
          </template>
          <template v-slot:item.AidboxData="{ item }">
            <span :class="getResultClass(item.AidboxData)" :title="item.AidboxData?.errMessage">{{ getResultSymbol(item.AidboxData) }}</span>
          </template>
          <template v-slot:item.HeliosData="{ item }">
            <span :class="getResultClass(item.HeliosData)" :title="item.HeliosData?.errMessage">{{ getResultSymbol(item.HeliosData) }}</span>
          </template>
          <template v-slot:item.IgnixaData="{ item }">
            <span :class="getResultClass(item.IgnixaData)" :title="item.IgnixaData?.errMessage">{{ getResultSymbol(item.IgnixaData) }}</span>
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

.summary-table {
  max-width: 600px;
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

.expression-cell {
  white-space: pre-wrap;
}

.result-pass {
  color: rgb(16, 185, 129);
  font-weight: bold;
}

.result-fail {
  color: rgb(239, 68, 68);
  font-weight: bold;
}

.result-not-implemented {
  color: grey;
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

// Engine configuration - file paths for lazy loading
const engineConfigs = [
  { name: 'Firely', file: '/results/Firely-5.12.1 R5.json' },
  { name: 'FhirPathJS', file: '/results/fhirpath.js-4.5.1 r5.json' },
  { name: 'Hapi', file: '/results/Java 6.6.2 R5.json' },
  { name: 'PythonData', file: '/results/fhirpath-py 1.0.3.json' },
  { name: 'AidboxData', file: '/results/Aidbox FHIR R5.json' },
  { name: 'HeliosData', file: '/results/Helios Software r5.json' },
  { name: 'IgnixaData', file: '/results/Ignixa-0.0.151 R5.json' },
];

interface ItemTestData {
  notImplemented?: boolean;
  result?: boolean;
  errMessage?: string;
  sortValue?: number;
}

interface HeaderData { 
  text: string; 
  value: string; 
  align?: string; 
  groupable?: boolean; 
  sort?: (a: any, b: any) => number;
}

export default Vue.extend({
  async mounted() {
    await this.loadData();
  },
  computed: {
    filteredTestData(): Array<any> {
      if (!this.hideFullySupported) {
        return this.testData;
      }
      return this.testData.filter(item => item.successCount !== engineConfigs.length);
    },
  },
  watch: {
    search(newVal: string) {
      // Debounce search input by 300ms
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.debouncedSearch = newVal;
      }, 300);
    },
  },
  methods: {
    getResultClass(engineResult: ItemTestData | undefined): string {
      if (!engineResult) return '';
      if (engineResult.result === true) return 'result-pass';
      if (engineResult.result === false) return 'result-fail';
      if (engineResult.notImplemented) return 'result-not-implemented';
      return '';
    },
    getResultSymbol(engineResult: ItemTestData | undefined): string {
      if (!engineResult) return '';
      if (engineResult.result === true) return '✓';
      if (engineResult.result === false) return '✗';
      if (engineResult.notImplemented) return '🔧';
      return '';
    },
    customFilter(value: any, search: string | null, item: any): boolean {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (item.name?.toLowerCase().includes(searchLower) ||
              item.expression?.toLowerCase().includes(searchLower)) ?? false;
    },
    customItemSort(a: ItemTestData, b: ItemTestData): number {
      // Use pre-computed sortValue for O(1) comparison
      const aVal = a?.sortValue ?? 3; // undefined items sort last
      const bVal = b?.sortValue ?? 3;
      return aVal - bVal;
    },
    async loadData() {
      this.loading = true;
      try {
        // Fetch all engine data in parallel (with cache bypass for refresh)
        const responses = await Promise.all(
          engineConfigs.map(config => 
            fetch(config.file, { cache: 'reload' }).then(r => r.json())
          )
        );
        
        // Process all data into non-reactive structures first
        const localTestDataMap = new Map<string, any>();
        const localAggregateData: Record<string, any> = {};
        const localEngineDisplayNames: Record<string, string> = {};
        
        // Reset headers to base headers (remove any previously added engine columns)
        const localHeaders: HeaderData[] = [
          { text: 'Category', value: 'groupName', align: 'start' },
          { text: 'Test name', align: 'start', value: 'name', groupable: false },
          { text: 'Expression', align: 'start', value: 'expression', groupable: false },
          { text: '#', align: 'center', value: 'successCount', groupable: false },
        ];
        
        // Process each engine's data
        responses.forEach((data, index) => {
          const engineName = engineConfigs[index].name;
          
          localEngineDisplayNames[engineName] = data.EngineName;
          localHeaders.push({
            text: data.EngineName,
            value: engineName,
            align: 'center',
            groupable: false,
            sort: this.customItemSort,
          });
          
          let passed = 0;
          let failed = 0;
          let notImplemented = 0;
          
          for (const group of data.Groups) {
            for (const test of group.TestCases) {
              const itemKey = `${group.Name}::${test.Name}`;
              let item = localTestDataMap.get(itemKey);
              
              if (!item) {
                item = {
                  name: test.Name,
                  groupName: group.Name,
                  successCount: 0,
                };
                localTestDataMap.set(itemKey, item);
              }
              
              if (test.Expression) {
                item.expression = test.Expression.trim();
              }
              if (test.Description) {
                item.description = test.Description.trim();
              }
              if (test.Result === true) {
                item.successCount += 1;
              }
              
              // Freeze the engine result object - it never changes
              item[engineName] = Object.freeze({
                result: test.Result,
                notImplemented: test.NotImplemented,
                errMessage: test.FailureMessage,
                sortValue: test.Result ? 0 : (test.NotImplemented ? 2 : 1),
              });
              
              if (test.Result === true) passed++;
              else if (test.Result === false) failed++;
              else if (test.NotImplemented === true) notImplemented++;
            }
          }
          
          localAggregateData[engineName] = { passed, failed, notImplemented };
        });
        
        // Now assign everything to reactive properties in one batch
        this.headers = localHeaders;
        this.engineDisplayNames = localEngineDisplayNames;

        // Use nextTick to avoid blocking the UI during large data assignment
        this.$nextTick(() => {
          this.aggregateData = localAggregateData;
          // Convert Map to array and freeze each item (they won't change)
          this.testData = Array.from(localTestDataMap.values()).map(item => Object.freeze(item));
        });
        
        console.log('Summary results', this.aggregateData);
      } catch (error) {
        console.error('Failed to load engine data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  data() {
    return {
      loading: true,
      search: '',
      hideFullySupported: false,
      debouncedSearch: '',
      searchTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
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
        {
          text: '#',
          align: 'center',
          value: 'successCount',
          groupable: false,
        },
      ] as Array<HeaderData>,
      testData: [] as Array<any>,
      aggregateData: {
      } as Record<string, { notImplemented: number; failed: number; passed: number }>,
      engineDisplayNames: {
      } as Record<string, string>,
    }
  }
});
</script>
