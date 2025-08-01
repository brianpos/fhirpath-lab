// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  pages: true,
  devtools: { enabled: true },

  // Add alias configuration
  alias: {
    '~/legacy-helpers': '../helpers',
    '~/legacy-types': '../types',
    '~/legacy-models': '../models',
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
              error: '#ff5252'
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