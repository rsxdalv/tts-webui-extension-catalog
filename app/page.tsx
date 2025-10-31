"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Grid3x3,
  List,
  ExternalLink,
  Github,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { extensionsData } from "@/lib/extensions-data";
import type { Extension } from "@/lib/types";

// JSON syntax highlighting with spans
function formatJson(obj: any): string {
  const jsonString = JSON.stringify(obj, null, 2);
  const lines = jsonString.split("\n");
  const formattedLines = lines.map((line) => {
    // Key highlighting (before colon)
    line = line.replace(
      /"([^"]*)"(\s*:\s*)/g,
      '<span style="color: #259addff;">"$1"</span>$2'
    );
    // String value highlighting
    line = line.replace(
      /:\s*"([^"]*)"([,\s]*$)/g,
      ': <span style="color: #ecb234ff;">"$1"</span>$2'
    );
    // Number highlighting
    line = line.replace(
      /:\s*(-?\d+\.?\d*)([,\s]*$)/g,
      ': <span style="color: #21f3b4ff;">$1</span>$2'
    );
    // Boolean/null highlighting
    line = line.replace(
      /:\s*(true|false|null)([,\s]*$)/g,
      ': <span style="color: #ff9800;">$1</span>$2'
    );
    return line;
  });
  return formattedLines.join("\n");
}

// Header Component
function Header({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              TTS
            </span>
          </div>
          <h1 className="text-xl font-semibold">WebUI Extension Marketplace</h1>
        </button>
      </div>
    </header>
  );
}

// Landing Page Content (Featured Extensions)
function LandingPageContent({
  topExtensions,
  onOpenExtensionDetail,
  isActive,
}: {
  topExtensions: Extension[];
  onOpenExtensionDetail: (extension: Extension) => void;
  isActive: boolean;
}) {
  return (
    <div 
      className={`transition-all duration-500 ease-in-out ${
        isActive 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95 pointer-events-none absolute inset-x-0'
      }`}
      style={{ transitionProperty: 'opacity, transform' }}
    >
      {/* Featured Extensions */}
      <div className="pt-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Featured Extensions</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {topExtensions.map((extension) => (
            <Card
              key={extension.package_name}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => onOpenExtensionDetail(extension)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{extension.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {extension.extension_class}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {extension.description}
                </CardDescription>
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
  );
}

// Category type and labels
const CATEGORIES = [
  { key: "all", label: "All Extensions" },
  { key: "text-to-speech", label: "Text-to-Speech" },
  { key: "audio-music-generation", label: "Audio & Music" },
  { key: "audio-conversion", label: "Audio Conversion" },
  { key: "conversational-ai", label: "Conversational AI" },
  { key: "tools", label: "Tools" },
  { key: "settings", label: "Settings" },
  { key: "outputs", label: "Outputs" },
  { key: "tutorials", label: "Tutorials" },
  { key: "decorators", label: "Decorators" },
] as const;

// Search Results Content (Grid/List only)
function SearchResultsContent({
  viewMode,
  filteredExtensions,
  onOpenExtensionDetail,
  isActive,
}: {
  viewMode: "grid" | "list";
  filteredExtensions: Extension[];
  onOpenExtensionDetail: (extension: Extension) => void;
  isActive: boolean;
}) {
  return (
    <div 
      className={`transition-all duration-500 ease-in-out ${
        isActive 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95 pointer-events-none absolute inset-x-0'
      }`}
      style={{ transitionProperty: 'opacity, transform' }}
    >

      {/* Results Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredExtensions.map((extension) => (
            <Card
              key={extension.package_name}
              className="cursor-pointer hover:border-primary transition-colors flex flex-col"
              onClick={() => onOpenExtensionDetail(extension)}
            >
              <CardHeader className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-tight">
                      {extension.name}
                    </CardTitle>
                    {extension.recommended && (
                      <Award className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {extension.extension_class}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3 text-sm">
                  {extension.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  by {extension.extension_author}
                </div>
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
              onClick={() => onOpenExtensionDetail(extension)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {extension.name}
                      </CardTitle>
                      {extension.recommended && (
                        <Award className="h-4 w-4 text-primary" />
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {extension.extension_class}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {extension.description}
                    </CardDescription>
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
    </div>
  );
}

// Extension Detail Modal Component
function ExtensionDetailModal({
  selectedExtension,
  onClose,
}: {
  selectedExtension: Extension | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={!!selectedExtension}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="max-w-3xl lg:max-w-5xl xl:max-w-7xl max-h-[90vh] overflow-y-auto">
        {selectedExtension && (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <DialogTitle className="text-3xl">
                      {selectedExtension.name}
                    </DialogTitle>
                    {selectedExtension.recommended && (
                      <Award className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {selectedExtension.extension_class}
                    </Badge>
                    <Badge variant="outline">
                      {selectedExtension.extension_type}
                    </Badge>
                  </div>
                </div>
              </div>
              <DialogDescription className="text-base leading-relaxed">
                {selectedExtension.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid lg:grid-cols-2 gap-8 space-y-8 lg:space-y-0 pt-6">
              {/* Left Column - Main Content */}
              <div className="space-y-8">
                {/* Authors Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Authors</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Original Author
                      </div>
                      <div className="font-medium">
                        {selectedExtension.author}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Extension Author
                      </div>
                      <div className="font-medium">
                        {selectedExtension.extension_author}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Details</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Package Name
                      </div>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {selectedExtension.package_name}
                      </code>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Requirements
                      </div>
                      <code className="text-sm bg-muted px-2 py-1 rounded block break-all">
                        {selectedExtension.requirements}
                      </code>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          License
                        </div>
                        <div className="font-medium">
                          {selectedExtension.license}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Platform Version
                        </div>
                        <div className="font-medium">
                          {selectedExtension.extension_platform_version}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <a
                        href={selectedExtension.extension_website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Extension Repository
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                    {selectedExtension.website !==
                      selectedExtension.extension_website && (
                      <Button variant="outline" asChild>
                        <a
                          href={selectedExtension.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Original Project
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Install Data */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Install Data</h3>
                <div className="space-y-2 text-xs">
                  <div className="text-muted-foreground">
                    JSON Configuration
                  </div>
                  <pre className="bg-muted p-4 rounded-md overflow-x-hidden font-mono leading-relaxed">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: formatJson(selectedExtension),
                      }}
                    />
                  </pre>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ExtensionMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(
    null
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Helper function to update URL parameters
  const updateURL = (updates: Record<string, string | null>) => {
    const url = new URL(window.location.href);
    for (const [key, val] of Object.entries(updates)) {
      if (val) {
        url.searchParams.set(key, val);
      } else {
        url.searchParams.delete(key);
      }
    }
    window.history.pushState({}, '', url.toString());
  };

  // Flatten all extensions from different categories
  const allExtensions = useMemo(() => {
    const extensions: Extension[] = [];
    Object.values(extensionsData.tabsInGroups).forEach((group) => {
      extensions.push(...group);
    });
    extensions.push(...extensionsData.decorators);
    return extensions;
  }, []);

  // Get extensions by category
  const getExtensionsByCategory = useMemo(() => {
    return (category: string) => {
      if (category === "all") return allExtensions;
      if (category === "decorators") return extensionsData.decorators;
      if (category in extensionsData.tabsInGroups) {
        return extensionsData.tabsInGroups[category as keyof typeof extensionsData.tabsInGroups];
      }
      return [];
    };
  }, [allExtensions]);

  // URL handling on mount and popstate
  useEffect(() => {
    const handlePopstate = () => {
      const params = new URLSearchParams(window.location.search);
      const extParam = params.get('extension');
      const extension = extParam ? allExtensions.find(e => e.package_name === extParam) || null : null;
      setSelectedExtension(extension);
      const searchParam = params.get('search') || '';
      setSearchQuery(searchParam);
      const categoryParam = params.get('category') || 'all';
      setSelectedCategory(categoryParam);
      const browseParam = params.get('browse');
      if (browseParam === 'true' || searchParam.trim().length >= 2) {
        setIsSearchActive(true);
      } else if (!searchParam.trim() && browseParam !== 'true') {
        setIsSearchActive(false);
      }
    };
    handlePopstate(); // initial load
    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, [allExtensions]);

  // Get top 3 recommended extensions
  const topExtensions = useMemo(() => {
    return allExtensions.filter((ext) => ext.recommended).slice(0, 3);
  }, [allExtensions]);

  // Filter extensions based on search and category
  const filteredExtensions = useMemo(() => {
    // First filter by category
    const categoryExtensions = getExtensionsByCategory(selectedCategory);
    
    // Then filter by search query if present
    if (!searchQuery.trim()) return categoryExtensions;

    const query = searchQuery.toLowerCase();
    return categoryExtensions.filter(
      (ext) =>
        ext.name.toLowerCase().includes(query) ||
        ext.description.toLowerCase().includes(query) ||
        ext.extension_class.toLowerCase().includes(query) ||
        ext.author.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedCategory, getExtensionsByCategory]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    updateURL({search: value.trim() || null, browse: 'true'});
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({category: category === 'all' ? null : category});
  };

  const activateBrowseMode = () => {
    setIsSearchActive(true);
    updateURL({browse: 'true'});
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsSearchActive(true);
    updateURL({category: category === 'all' ? null : category, browse: 'true'});
  };

  const openExtensionDetail = (extension: Extension) => {
    setSelectedExtension(extension);
    updateURL({extension: extension.package_name});
  };

  const closeExtensionDetail = () => {
    setSelectedExtension(null);
    updateURL({extension: null});
  };

  const returnToLanding = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setSelectedCategory('all');
    updateURL({browse: null, search: null, category: null});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogoClick={returnToLanding} />
      <main className={`container mx-auto px-4 transition-all duration-500 ease-in-out ${
        isSearchActive ? 'py-8' : 'py-20'
      }`}>
        {/* Shared Search Section */}
        <div className={`mx-auto transition-all duration-500 ease-in-out ${
          isSearchActive ? 'max-w-full mb-8' : 'max-w-3xl text-center mb-0'
        }`}>
          <div className={`transition-all duration-500 ease-in-out ${
            isSearchActive ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mb-8'
          }`}>
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight text-balance">
                Discover TTS WebUI Extensions
              </h2>
              <p className="text-xl text-muted-foreground text-balance">
                Enhance your Text-to-Speech WebUI with powerful extensions from the
                community
              </p>
            </div>
          </div>

          {/* Search Bar with Controls */}
          <div className={`space-y-4 transition-all duration-500 ease-in-out ${
            isSearchActive ? '' : 'text-center'
          }`}>
            {/* Search Input + View Mode Buttons */}
            <div className="flex gap-4 items-center">
              <div className={`relative flex-1 transition-all duration-500 ease-in-out ${
                isSearchActive ? 'max-w-2xl' : 'max-w-2xl mx-auto'
              }`}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder={isSearchActive ? "Search extensions..." : "Search or browse all extensions..."}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={activateBrowseMode}
                  onClick={activateBrowseMode}
                  autoFocus
                  className={`pl-12 bg-card border-border transition-all duration-500 ease-in-out ${
                    isSearchActive ? 'h-12' : 'h-14 text-lg cursor-pointer'
                  }`}
                />
              </div>
              {/* View Mode Buttons - only visible in browse mode */}
              <div className={`flex gap-2 transition-all duration-300 ease-in-out ${
                isSearchActive ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden pointer-events-none'
              }`}>
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

            {/* Category Tabs - visible in both modes */}
            <div className={`flex flex-wrap gap-2 transition-all duration-500 ease-in-out ${
              isSearchActive ? '' : 'justify-center'
            }`}>
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.key}
                  variant={selectedCategory === cat.key && isSearchActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => isSearchActive ? handleCategoryChange(cat.key) : handleCategorySelect(cat.key)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Results Count - only visible in browse mode */}
            <div className={`text-sm text-muted-foreground transition-all duration-300 ease-in-out ${
              isSearchActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
            }`}>
              {filteredExtensions.length} extension
              {filteredExtensions.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>

        {/* Content Area with Transitions */}
        <div className="relative">
          <div className={`${isSearchActive ? 'max-w-full' : 'max-w-3xl mx-auto text-center'}`}>
            <LandingPageContent
              topExtensions={topExtensions}
              onOpenExtensionDetail={openExtensionDetail}
              isActive={!isSearchActive}
            />
            <SearchResultsContent
              viewMode={viewMode}
              filteredExtensions={filteredExtensions}
              onOpenExtensionDetail={openExtensionDetail}
              isActive={isSearchActive}
            />
          </div>
        </div>
      </main>
      <ExtensionDetailModal
        selectedExtension={selectedExtension}
        onClose={closeExtensionDetail}
      />
    </div>
  );
}
