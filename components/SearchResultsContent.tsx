import { ExtensionCardGrid, ExtensionCardList } from "./ExtensionCard";
import type { Extension } from "@/lib/types";

interface SearchResultsContentProps {
  viewMode: "grid" | "list";
  filteredExtensions: Extension[];
  onOpenExtensionDetail: (extension: Extension) => void;
  isActive: boolean;
}

export function SearchResultsContent({
  viewMode,
  filteredExtensions,
  onOpenExtensionDetail,
  isActive,
}: SearchResultsContentProps) {
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none absolute inset-x-0"
      }`}
      style={{ transitionProperty: "opacity, transform" }}
    >
      {/* Results Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredExtensions.map((extension) => (
            <ExtensionCardGrid
              key={extension.package_name}
              extension={extension}
              onClick={() => onOpenExtensionDetail(extension)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExtensions.map((extension) => (
            <ExtensionCardList
              key={extension.package_name}
              extension={extension}
              onClick={() => onOpenExtensionDetail(extension)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
