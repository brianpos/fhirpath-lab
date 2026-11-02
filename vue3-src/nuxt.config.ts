// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  pages: true,
  devtools: { enabled: true },
  // https://github.com/nuxt/devtools/issues/868
  ignoreOptions: {
    allowRelativePaths: true
  },

  // Add alias configuration
  alias: {
    '@legacy/helpers': resolve(currentDir, '../helpers'),
    '@legacy/types': resolve(currentDir, '../types'),
    'models': resolve(currentDir, '../models'),
    // Shared FML runtime consumed from source so no separate build step is required
    '@fhirpath-lab/validator': resolve(currentDir, '../fml-vscode-extension/fml-validator/src/index.ts'),
    '@fhirpath-lab/fml-executor': resolve(currentDir, '../fml-vscode-extension/fml-executor/src/index.ts'),
    '@legacy/fml-debug-service': resolve(currentDir, '../fml-vscode-extension/fml-debug-service/src'),
  },
  
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/fonts' /* https://fonts.nuxt.com/get-started/installation */
                  // alternate: https://www.npmjs.com/package/@fontsource/roboto
  ],
  css: [
    '~/assets/vuetify/main.scss', // If customizing Vuetify global sass variables, ensure disableVuetifyStyles: true with Nuxt Vuetity module
    '~/assets/variables.scss'
  ],
  vite: {
    resolve: {
      // Shared sources live outside vue3-src; make sure they use this app's copies
      dedupe: ['fhirpath', 'antlr4', 'lossless-json', 'luxon', 'entities'],
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@microsoft/applicationinsights-web',
        'fhirpath',
        'fhirpath/fhir-context/general-additions.js',
        'fhirpath/fhir-context/r4',
        'fhirpath/fhir-context/r5',
      ]
    }
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
     disableVuetifyStyles: true,
      /* If customizing sass variables of vuetify components */
      styles: {
        configFile: 'assets/vuetify/settings.scss',
      }
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#3F81AE',
              secondary: '#79B6E6',
              error: '#ff5252',
              'surface-hover': '#D2F5FF'
            },
            variables: {
              //'theme-on-surface': '#1976d2'
            }
          }
        }
      },
      defaults: {
        VTextField: {
          variant: 'underlined'
        },
        VTextarea: {
          variant: 'underlined'
        },
        VSelect: {
          variant: 'underlined'
        },
        VCombobox: {
          variant: 'underlined'
        },
        VAutocomplete: {
          variant: 'underlined'
        }
      }
    }
  },
  // Fix for "Cannot stringify a function" error in dev server logs
  ssr: false,
  nitro: {
    experimental: {
      wasm: true
    },
    prerender: {
      routes: ['/config.json']
    }
  },
  app: {
    head: {
      title: 'FHIRPath Lab - FHIR Expression Testing Tool',
      meta: [
        { name: 'description', content: 'FHIRPath Lab is an open source tool to simplify testing FHIRPath expressions against various FHIR engines' }
      ]
    }
  }
})