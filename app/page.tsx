"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Grid3x3, List } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
import { FeaturedExtensionsGrid } from "../components/FeaturedExtensionsGrid";
import { SearchResultsContent } from "../components/SearchResultsContent";
import { ExtensionDetailModal } from "../components/ExtensionDetailModal";
import { useIsEmbedded } from "../components/hooks/useIsEmbedded";
import { extensionsData } from "@/lib/extensions-data";
import type { Extension } from "@/lib/types";

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

export default function ExtensionMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(
    null,
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hideBuiltins, setHideBuiltins] = useState(true);
  const isEmbedded = useIsEmbedded();

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
    window.history.pushState({}, "", url.toString());
  };

  // Flatten all extensions from different categories
  const allExtensions = useMemo(() => {
    const extensions: Extension[] = [];
    Object.values(extensionsData.tabsInGroups).forEach((group) => {
      extensions.push(...group);
    });
    extensions.push(...extensionsData.decorators);
    if (hideBuiltins) {
      return extensions.filter((ext) => !ext.package_name.startsWith("extensions.builtin."));
    }
    return extensions;
  }, [hideBuiltins]);

  // Get extensions by category
  const getExtensionsByCategory = useMemo(() => {
    return (category: string) => {
      if (category === "all") return allExtensions;
      if (category === "decorators") return extensionsData.decorators;
      // Filter by extension_class property rather than storage location
      return allExtensions.filter((ext) => ext.extension_class === category);
    };
  }, [allExtensions]);

  // URL handling on mount and popstate
  useEffect(() => {
    const handlePopstate = () => {
      const params = new URLSearchParams(window.location.search);
      const extParam = params.get("extension");
      const extension = extParam
        ? allExtensions.find((e) => e.package_name === extParam) || null
        : null;
      setSelectedExtension(extension);
      const searchParam = params.get("search") || "";
      setSearchQuery(searchParam);
      const categoryParam = params.get("category") || "all";
      setSelectedCategory(categoryParam);
      const browseParam = params.get("browse");
      if (browseParam === "true" || searchParam.trim().length >= 2) {
        setIsSearchActive(true);
      } else if (!searchParam.trim() && browseParam !== "true") {
        setIsSearchActive(false);
      }
    };
    handlePopstate(); // initial load
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
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
        ext.author.toLowerCase().includes(query),
    );
  }, [searchQuery, selectedCategory, getExtensionsByCategory]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Activate browse mode when user types (at least 1 character)
    if (value.trim().length > 0 || isSearchActive) {
      setIsSearchActive(true);
      updateURL({ search: value.trim() || null, browse: "true" });
    } else {
      updateURL({ search: value.trim() || null, browse: "true" });
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category: category === "all" ? null : category });
  };

  const activateBrowseMode = () => {
    setIsSearchActive(true);
    updateURL({ browse: "true" });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsSearchActive(true);
    updateURL({
      category: category === "all" ? null : category,
      browse: "true",
    });
  };

  const openExtensionDetail = (extension: Extension) => {
    setSelectedExtension(extension);
    updateURL({ extension: extension.package_name });
  };

  const closeExtensionDetail = () => {
    setSelectedExtension(null);
    updateURL({ extension: null });
  };

  const returnToLanding = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    setSelectedCategory("all");
    updateURL({ browse: null, search: null, category: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onLogoClick={returnToLanding} />
      <main
        className={`container mx-auto px-4 transition-all duration-500 ease-in-out ${
          isSearchActive ? "py-8" : "py-20"
        }`}
      >
        {/* Shared Search Section */}
        <div
          className={`mx-auto transition-all duration-500 ease-in-out ${
            isSearchActive ? "max-w-full mb-8" : "max-w-3xl text-center mb-0"
          }`}
        >
          <div
            className={`transition-all duration-500 ease-in-out ${
              isSearchActive
                ? "opacity-0 h-0 overflow-hidden"
                : "opacity-100 mb-8"
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight text-balance">
                Discover TTS WebUI Extensions
              </h2>
              <p className="text-xl text-muted-foreground text-balance">
                Enhance your Text-to-Speech WebUI with powerful extensions from
                the community
              </p>
            </div>
          </div>

          {/* Search Bar with Controls */}
          <div
            className={`space-y-4 transition-all duration-500 ease-in-out ${
              isSearchActive ? "" : "text-center"
            }`}
          >
            {/* Search Input + View Mode Buttons */}
            <div className="flex gap-4 items-center">
              <div
                className={`relative flex-1 transition-all duration-500 ease-in-out ${
                  isSearchActive ? "max-w-2xl" : "max-w-2xl mx-auto"
                }`}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
                <Input
                  type="text"
                  placeholder={
                    isSearchActive
                      ? "Search extensions..."
                      : "Search or browse all extensions..."
                  }
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={activateBrowseMode}
                  onClick={activateBrowseMode}
                  autoFocus
                  className={`pl-12 bg-card border-border transition-all duration-500 ease-in-out ${
                    isSearchActive ? "h-12" : "h-14 text-lg cursor-pointer"
                  }`}
                />
              </div>
              {/* View Mode Buttons - only visible in browse mode */}
              <div
                className={`flex gap-2 transition-all duration-300 ease-in-out ${
                  isSearchActive
                    ? "opacity-100"
                    : "opacity-0 w-0 overflow-hidden pointer-events-none"
                }`}
              >
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
            <div
              className={`flex flex-wrap gap-2 transition-all duration-500 ease-in-out ${
                isSearchActive ? "" : "justify-center"
              }`}
            >
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.key}
                  variant={
                    selectedCategory === cat.key && isSearchActive
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    isSearchActive
                      ? handleCategoryChange(cat.key)
                      : handleCategorySelect(cat.key)
                  }
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Results Count - only visible in browse mode */}
            <div
              className={`text-sm text-muted-foreground transition-all duration-300 ease-in-out flex items-center gap-4 ${
                isSearchActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideBuiltins}
                  onChange={(e) => setHideBuiltins(e.target.checked)}
                  className="w-4 h-4"
                />
                Hide built-in extensions
              </label>
              <span>
                {filteredExtensions.length} extension
                {filteredExtensions.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </div>

        {/* Content Area with Transitions */}
        <div className="relative">
          <div
            className={`${isSearchActive ? "max-w-full" : "max-w-3xl mx-auto text-center"}`}
          >
            <FeaturedExtensionsGrid
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
        isEmbedded={isEmbedded}
      />
    </div>
  );
}
