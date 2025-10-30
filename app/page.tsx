"use client"

import { useState, useMemo } from "react"
import { Search, Grid3x3, List, ExternalLink, Github, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { extensionsData } from "@/lib/extensions-data"
import type { Extension } from "@/lib/types"

export default function ExtensionMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null)
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Flatten all extensions from different categories
  const allExtensions = useMemo(() => {
    const extensions: Extension[] = []
    Object.values(extensionsData.tabsInGroups).forEach((group) => {
      extensions.push(...group)
    })
    extensions.push(...extensionsData.decorators)
    return extensions
  }, [])

  // Get top 3 recommended extensions
  const topExtensions = useMemo(() => {
    return allExtensions.filter((ext) => ext.recommended).slice(0, 3)
  }, [allExtensions])

  // Filter extensions based on search
  const filteredExtensions = useMemo(() => {
    if (!searchQuery.trim()) return allExtensions

    const query = searchQuery.toLowerCase()
    return allExtensions.filter(
      (ext) =>
        ext.name.toLowerCase().includes(query) ||
        ext.description.toLowerCase().includes(query) ||
        ext.extension_class.toLowerCase().includes(query) ||
        ext.author.toLowerCase().includes(query),
    )
  }, [searchQuery, allExtensions])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      setIsSearchActive(true)
    }
  }

  const openExtensionDetail = (extension: Extension) => {
    setSelectedExtension(extension)
    // Update URL for sharing
    window.history.pushState({}, "", `?extension=${encodeURIComponent(extension.package_name)}`)
  }

  const closeExtensionDetail = () => {
    setSelectedExtension(null)
    window.history.pushState({}, "", "/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TTS</span>
            </div>
            <h1 className="text-xl font-semibold">Extension Marketplace</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {!isSearchActive ? (
        // Landing Page - Google-like centered search
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight text-balance">Discover TTS Extensions</h2>
              <p className="text-xl text-muted-foreground text-balance">
                Enhance your Text-to-Speech WebUI with powerful extensions from the community
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search extensions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setIsSearchActive(true)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>

            {/* Top 3 Extensions */}
            <div className="pt-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Featured Extensions</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {topExtensions.map((extension) => (
                  <Card
                    key={extension.package_name}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => openExtensionDetail(extension)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg">{extension.name}</CardTitle>
                        <Badge variant="secondary" className="shrink-0">
                          {extension.extension_class}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{extension.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>by {extension.extension_author}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : (
        // Search Results View
        <main className="container mx-auto px-4 py-8">
          {/* Search Bar + Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search extensions..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-12 bg-card border-border"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredExtensions.length} extension{filteredExtensions.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {/* Results Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredExtensions.map((extension) => (
                <Card
                  key={extension.package_name}
                  className="cursor-pointer hover:border-primary transition-colors flex flex-col"
                  onClick={() => openExtensionDetail(extension)}
                >
                  <CardHeader className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">{extension.name}</CardTitle>
                        {extension.recommended && <Award className="h-4 w-4 text-primary shrink-0" />}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {extension.extension_class}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-3 text-sm">{extension.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">by {extension.extension_author}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExtensions.map((extension) => (
                <Card
                  key={extension.package_name}
                  className="cursor-pointer hover:border-primary transition-colors"
                  onClick={() => openExtensionDetail(extension)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">{extension.name}</CardTitle>
                          {extension.recommended && <Award className="h-4 w-4 text-primary" />}
                          <Badge variant="secondary" className="text-xs">
                            {extension.extension_class}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{extension.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {extension.extension_author}</span>
                          <span>•</span>
                          <span>{extension.extension_type}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Extension Detail Modal */}
      <Dialog open={!!selectedExtension} onOpenChange={(open) => !open && closeExtensionDetail()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedExtension && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <DialogTitle className="text-3xl">{selectedExtension.name}</DialogTitle>
                      {selectedExtension.recommended && <Award className="h-6 w-6 text-primary" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{selectedExtension.extension_class}</Badge>
                      <Badge variant="outline">{selectedExtension.extension_type}</Badge>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base leading-relaxed">
                  {selectedExtension.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 pt-6">
                {/* Authors Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Authors</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Original Author</div>
                      <div className="font-medium">{selectedExtension.author}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Extension Author</div>
                      <div className="font-medium">{selectedExtension.extension_author}</div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Details</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Package Name</div>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{selectedExtension.package_name}</code>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Requirements</div>
                      <code className="text-sm bg-muted px-2 py-1 rounded block break-all">
                        {selectedExtension.requirements}
                      </code>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">License</div>
                        <div className="font-medium">{selectedExtension.license}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Platform Version</div>
                        <div className="font-medium">{selectedExtension.extension_platform_version}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <a href={selectedExtension.extension_website} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Extension Repository
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                    {selectedExtension.website !== selectedExtension.extension_website && (
                      <Button variant="outline" asChild>
                        <a href={selectedExtension.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Original Project
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
