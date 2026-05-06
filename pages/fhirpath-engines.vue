<template>
  <div class="main">
    <HeaderNavbar />

    <div class="container bd-layout" style="padding-top: 100px; max-width: unset;">
      <p class="leader">
        FhirPath Engine Compatibility Test
      </p>
      <p class="hint-text mb-4">
        <v-icon small>mdi-information-outline</v-icon>
        Add custom engines via URL parameter: <code>?engines=url1,url2</code> or <code>?engines=url1&amp;engines=url2</code>
        <br/>
        Skip engines via URL parameter: <code>?skip={{ defaultEngineNames.join(',') }}</code> or <code>?skip=all</code> to hide all default engines
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
            <v-alert v-if="customEngineConfigs.length > 0" type="info" dense text class="mx-4 mb-2">
              <strong>Custom engines loaded from URL:</strong> 
              {{ customEngineConfigs.map(c => engineDisplayNames[c.name] || c.file).join(', ') }}
              <span v-if="loadedCustomEngineNames.length < customEngineConfigs.length" class="ml-2 red--text">
                ({{ customEngineConfigs.length - loadedCustomEngineNames.length }} failed to load)
              </span>
            </v-alert>
          </template>
          <template v-slot:item.expression="{ item }">
            <a class="link-plain-text expression-cell" :href="'https://hackweek.fhirpath-lab.com/FhirPath?expression=' + encodeURIComponent(item.expression)" target="_blank">{{ item.expression }}</a>
          </template>

          <template v-slot:item.successCount="{ item }">
            <span style="color: rgb(16, 185, 129);">{{ item.successCount }}</span>
          </template>
          <template v-slot:item.failedCount="{ item }">
            <span style="color: rgb(239, 68, 68);">{{ item.failedCount }}</span>
          </template>
          <template v-slot:item.notImplementedCount="{ item }">
            <span style="color: grey;">{{ item.notImplementedCount }}</span>
          </template>

          <!-- Dynamic engine header slots -->
          <template v-for="engine in engineConfigs" v-slot:[`header.${engine.name}`]="{ header }">
            <v-tooltip :key="'header-' + engine.name" bottom color="primary">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  {{ header.text }}
                  <v-icon v-if="engine.isCustom" x-small color="info" class="ml-1">mdi-account-plus</v-icon>
                </span>
              </template>
              <table>
                <tr><td>Passed</td><td align="right">{{ aggregateData[engine.name]?.passed }}</td></tr>
                <tr><td>Failed</td><td align="right">{{ aggregateData[engine.name]?.failed }}</td></tr>
                <tr><td>Not implemented</td><td align="right">{{ aggregateData[engine.name]?.notImplemented }}</td></tr>
              </table>
            </v-tooltip>
          </template>

          <template v-slot:item.name="{ item }">
            <span v-text="item.name" />
            <template v-if="item.description">
              <br/>
              <v-icon v-if="item.description.startsWith('Contested:')" color="purple" small>mdi-information-outline</v-icon>
              <v-icon v-if="item.description.startsWith('AI:')" color="green" small>mdi-brain</v-icon>
              <v-icon v-if="item.description.startsWith('HR:')" color="rgb(0,0,255)" small>mdi-brain</v-icon>
              <span v-if="item.description.startsWith('Contested:')" style="color: purple;" v-text="item.description" />
              <span v-if="item.description.startsWith('AI:')" class="ai-description" v-text="item.description" />
              <span v-if="item.description.startsWith('HR:')" class="hr-description" v-text="item.description" />
              <span v-if="!item.description.startsWith('Contested:') && !item.description.startsWith('AI:') && !item.description.startsWith('HR:')" style="color: grey; font-style: italic;" v-text="item.description" />
            </template>
          </template>

          <!-- Dynamic engine item slots -->
          <template v-for="engine in engineConfigs" v-slot:[`item.${engine.name}`]="{ item }">
            <span :key="'item-' + engine.name" :class="getResultClass(item[engine.name])" :title="item[engine.name]?.errMessage">{{ getResultSymbol(item[engine.name]) }}</span>
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

::v-deep tr:has(td span.ai-description) td {
  background-color: rgba(0, 255, 0, 0.1);
}

.ai-description {
  color: green;
  font-style: italic;
}

::v-deep tr:has(td span.hr-description) td {
  background-color: rgba(0, 0, 255, 0.1);
}

.hr-description {
  color: blue;
  font-style: italic;
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

.hint-text {
  font-size: small;
  color: grey;
}

.hint-text code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9em;
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
const defaultEngineConfigs: EngineConfig[] = [
  { name: 'Firely', file: '/results/Firely-5.12.1 R5.json' },
  { name: 'FhirPathJS', file: '/results/fhirpath.js-4.5.1 r5.json' },
  { name: 'Hapi', file: '/results/Java 6.6.2 R5.json' },
  { name: 'Python', file: '/results/fhirpath-py 1.0.3.json' },
  { name: 'Aidbox', file: '/results/Aidbox FHIR R5.json' },
  { name: 'Helios', file: '/results/Helios Software r5.json' },
  { name: 'Ignixa', file: '/results/Ignixa-0.0.151 R5.json' },
];

interface EngineConfig {
  name: string;
  file: string;
  isCustom?: boolean;
}

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
    this.parseUrlParameters();
    await this.loadData();
  },
  computed: {
    defaultEngineNames(): string[] {
      return defaultEngineConfigs.map(c => c.name.toLowerCase());
    },
    engineConfigs(): EngineConfig[] {
      const allConfigs = [...defaultEngineConfigs, ...this.customEngineConfigs];
      if (this.skipEngines.length === 0) return allConfigs;
      const skipLower = this.skipEngines.map(s => s.toLowerCase());
      if (skipLower.includes('all')) {
        return allConfigs.filter(c => c.isCustom);
      }
      return allConfigs.filter(c => !skipLower.includes(c.name.toLowerCase()));
    },
    filteredTestData(): Array<any> {
      if (!this.hideFullySupported) {
        return this.testData;
      }
      return this.testData.filter(item => item.successCount !== this.engineConfigs.length);
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
    parseUrlParameters() {
      // Parse URL parameters for custom engine files
      // Supports: ?engines=url1,url2,url3 or ?engines=url1&engines=url2
      // Supports: ?skip=Firely,Hapi to exclude engines by name
      const urlParams = new URLSearchParams(window.location.search);

      // Parse skip parameter
      const skipNames: string[] = [];
      urlParams.getAll('skip').forEach(param => {
        param.split(',').forEach(name => {
          const trimmed = name.trim();
          if (trimmed) {
            skipNames.push(trimmed);
          }
        });
      });
      this.skipEngines = skipNames;
      if (skipNames.length > 0) {
        console.log('Skipping engines:', skipNames);
      }
      const engineUrls: string[] = [];
      
      // Handle comma-separated values
      urlParams.getAll('engines').forEach(param => {
        param.split(',').forEach(url => {
          const trimmed = url.trim();
          if (trimmed) {
            engineUrls.push(trimmed);
          }
        });
      });
      
      // Create custom engine configs from URLs
      this.customEngineConfigs = engineUrls.map((url, index) => {
        // Generate a unique name based on URL or index
        const urlParts = url.split('/');
        const filename = urlParts[urlParts.length - 1] || `CustomEngine${index + 1}`;
        const name = `Custom${index + 1}_${filename.replace(/[^a-zA-Z0-9]/g, '_')}`;
        return {
          name,
          file: url,
          isCustom: true,
        };
      });
      
      if (this.customEngineConfigs.length > 0) {
        console.log('Custom engine configs loaded from URL:', this.customEngineConfigs);
      }
    },
    async loadData() {
      this.loading = true;
      try {
        const configs = this.engineConfigs;
        
        // Fetch all engine data in parallel (with cache bypass for refresh)
        // For custom engines, handle potential CORS or fetch errors gracefully
        const responses = await Promise.all(
          configs.map(async (config) => {
            try {
              const response = await fetch(config.file, { cache: 'reload' });
              if (!response.ok) {
                console.warn(`Failed to load engine data from ${config.file}: ${response.statusText}`);
                return null;
              }
              return await response.json();
            } catch (error) {
              console.warn(`Error loading engine data from ${config.file}:`, error);
              return null;
            }
          })
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
          { text: '# ✓', align: 'center', value: 'successCount', groupable: false },
          { text: '# ✗', align: 'center', value: 'failedCount', groupable: false },
          { text: '# 🔧', align: 'center', value: 'notImplementedCount', groupable: false },
        ];
        
        // Track successfully loaded engines for the custom engines list
        const loadedCustomEngines: string[] = [];
        
        // Process each engine's data
        responses.forEach((data, index) => {
          if (!data) return; // Skip failed loads
          
          const engineName = configs[index].name;
          const isCustom = configs[index].isCustom;
          
          localEngineDisplayNames[engineName] = data.EngineName;
          if (isCustom) {
            loadedCustomEngines.push(engineName);
          }
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
                  failedCount: 0,
                  notImplementedCount: 0,
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
              if (test.Result === false) {
                item.failedCount += 1;
              }
              if (test.NotImplemented === true) {
                item.notImplementedCount += 1;
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
        this.loadedCustomEngineNames = loadedCustomEngines;

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
      skipEngines: [] as string[],
      customEngineConfigs: [] as EngineConfig[],
      loadedCustomEngineNames: [] as string[],
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
        {
          text: '# ✗',
          align: 'center',
          value: 'failedCount',
          groupable: false,
        },
        {
          text: '# 🔧',
          align: 'center',
          value: 'notImplementedCount',
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
