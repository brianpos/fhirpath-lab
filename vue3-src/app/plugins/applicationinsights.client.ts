import { ApplicationInsights, type IApplicationInsights } from '@microsoft/applicationinsights-web'

// Client-only plugin that initialises Application Insights and exposes it as `$appInsights`.
// Matches the behaviour of the Nuxt 2 @nuxtjs/applicationinsights module used by the legacy pages.
export default defineNuxtPlugin((nuxtApp) => {
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: '6734f815-da7c-4b6d-b532-90d1421dd2b8',
      enableAutoRouteTracking: true,
    },
  })

  appInsights.loadAppInsights()
  appInsights.trackPageView()

  return {
    provide: {
      appInsights: appInsights as IApplicationInsights,
    },
  }
})
