import type { Plugin } from '@nuxt/types'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { settings } from '~/helpers/user_settings'

declare module 'vue/types/vue' {
  interface Vue {
    $appInsights?: ApplicationInsights
  }
}

declare module '@nuxt/types' {
  interface Context {
    $appInsights?: ApplicationInsights
  }
  interface NuxtAppOptions {
    $appInsights?: ApplicationInsights
  }
}

const plugin: Plugin = async (_ctx, inject) => {
  let key: string | undefined

  try {
    const cfg = await settings.getServerConnectionData()
    key = cfg?.appInsightsKey
  } catch (err) {
    console.warn('Failed to load Application Insights key from config:', err)
  }

  if (!key) {
    // No key configured - inject undefined so optional chaining at usage sites is a no-op.
    inject('appInsights', undefined as unknown as ApplicationInsights)
    return
  }

  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: key,
      enableAutoRouteTracking: true,
    },
  })

  appInsights.loadAppInsights()
  appInsights.trackPageView()

  inject('appInsights', appInsights)
}

export default plugin
