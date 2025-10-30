import type { ExtensionData } from "./types"

// Import JSON sources. resolveJsonModule is enabled in tsconfig.
import baseData from "./extensions.json"
import externalData from "./extensions.external.json"

// Shallow merge strategy:
// - For top-level keys we let external overwrite base by spreading both objects.
// - For `tabsInGroups` and `tabs` (objects) we merge their nested properties.
// - For `decorators` (arrays) we concatenate base + external.
const merged = {
  ...(baseData as any),
  ...(externalData as any),
  tabsInGroups: { ...(baseData.tabsInGroups ?? {}), ...(externalData.tabsInGroups ?? {}) },
  tabs: { ...(baseData.tabs ?? {}), ...(externalData.tabs ?? {}) },
  decorators: [ ...(baseData.decorators ?? []), ...(externalData.decorators ?? []) ],
}

export const extensionsData: ExtensionData = merged as ExtensionData
