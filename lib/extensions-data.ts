import type { ExtensionData } from "./types"

// Import JSON sources. resolveJsonModule is enabled in tsconfig.
import baseData from "./extensions.json"
import externalData from "./extensions.external.json"

// Shallow merge strategy:
// - For top-level keys we let external overwrite base by spreading both objects.
// - For `tabsInGroups` and `tabs` (objects) we merge their nested properties.
// - For `decorators` (arrays) we concatenate base + external.
const merged = {
  ...(externalData as any),
  ...(baseData as any),
  tabsInGroups: { ...(externalData.tabsInGroups ?? {}), ...(baseData.tabsInGroups ?? {}) },
  tabs: { ...(externalData.tabs ?? {}), ...(baseData.tabs ?? {}) },
  decorators: [ ...(externalData.decorators ?? []), ...(baseData.decorators ?? []) ],
}

export const extensionsData: ExtensionData = merged as ExtensionData
