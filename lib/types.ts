export interface Extension {
  package_name: string
  name: string
  requirements: string
  description: string
  extension_type: "interface" | "decorator"
  extension_class: string
  author: string
  extension_author: string
  license: string
  website: string
  extension_website: string
  extension_platform_version: string
  recommended?: boolean
}

export interface ExtensionData {
  tabsInGroups: {
    settings: Extension[]
    "text-to-speech": Extension[]
    "audio-music-generation": Extension[]
    "audio-conversion": Extension[]
    outputs: Extension[]
    tools: Extension[]
    "conversational-ai": Extension[]
    tutorials: Extension[]
  }
  decorators: Extension[]
  tabs_not_recomended: Extension[]
}
