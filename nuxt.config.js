export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fhirpath-lab',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Vuetify settings https://vuetifyjs.com/en/features/sass-variables/#nuxt-install
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-easytable"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/Questionnaire/',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://github.com/nuxt-community/applicationinsights-module
    '@nuxtjs/applicationinsights',
  ],

  // https://github.com/nuxt-community/applicationinsights-module
  appInsights: {
    instrumentationKey: '6734f815-da7c-4b6d-b532-90d1421dd2b8' //  your project's Instrumentation Key here
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    // how to get 3rd party components working in Nuxt
    // https://www.youtube.com/watch?v=j7l5e2ID0aw&t=7s
    transpile: [
      "vue-easytable",
      "@fhir-typescript/r4b-core",
      "fhirpath",
      "ucum-lhc",
      "openai",
    ]
  }
}
