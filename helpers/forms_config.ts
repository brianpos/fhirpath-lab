export interface FormsRendererConfiguration {
  tabName: string;
  title: string;
  organization: string;
  smartWebMessagingUrl: string;
}

export interface FormsConfiguration {
  renderers: FormsRendererConfiguration[];
}

export function parseFormsConfiguration(
  value: unknown,
  baseUrl: string,
  reservedTabNames: readonly string[] = []
): FormsConfiguration {
  if (!isRecord(value) || !Array.isArray(value.renderers)) {
    throw new Error('Forms configuration must contain a renderers array.');
  }

  const tabNames = new Set(reservedTabNames.map(normalizeName));
  const slotNames = new Set(reservedTabNames.map(name => normalizeName(slotName(name))));
  const renderers = value.renderers.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`Renderer entry ${index + 1} must be an object.`);
    }

    const renderer: FormsRendererConfiguration = {
      tabName: requiredString(entry, 'tabName', index),
      title: requiredString(entry, 'title', index),
      organization: requiredString(entry, 'organization', index),
      smartWebMessagingUrl: requiredString(entry, 'smartWebMessagingUrl', index)
    };

    const normalizedTabName = normalizeName(renderer.tabName);
    if (tabNames.has(normalizedTabName)) {
      throw new Error(`Renderer tabName "${renderer.tabName}" is duplicated or reserved.`);
    }
    tabNames.add(normalizedTabName);

    const normalizedSlotName = normalizeName(slotName(renderer.tabName));
    if (slotNames.has(normalizedSlotName)) {
      throw new Error(`Renderer tabName "${renderer.tabName}" conflicts with another tab slot.`);
    }
    slotNames.add(normalizedSlotName);

    try {
      const rendererUrl = new URL(renderer.smartWebMessagingUrl, baseUrl);
      if (rendererUrl.protocol !== 'http:' && rendererUrl.protocol !== 'https:') {
        throw new Error('Unsupported URL protocol.');
      }
      renderer.smartWebMessagingUrl = rendererUrl.toString();
    } catch {
      throw new Error(
        `Renderer "${renderer.tabName}" has an invalid smartWebMessagingUrl.`
      );
    }

    return renderer;
  });

  return { renderers };
}

function requiredString(
  entry: Record<string, unknown>,
  propertyName: keyof FormsRendererConfiguration,
  index: number
): string {
  const value = entry[propertyName];
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Renderer entry ${index + 1} requires a non-empty ${propertyName}.`);
  }
  return value.trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function slotName(tabName: string): string {
  return tabName.replace(' ', '_');
}

function normalizeName(value: string): string {
  return value.toLocaleLowerCase();
}
