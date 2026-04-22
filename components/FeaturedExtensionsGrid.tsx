import { Award } from "lucide-react";
import { ExtensionCardGrid } from "./ExtensionCard";
import type { Extension } from "@/lib/types";

interface FeaturedExtensionsGridProps {
  featuredExtensions: Extension[];
  onOpenExtensionDetail: (extension: Extension) => void;
  isActive: boolean;
}

export function FeaturedExtensionsGrid({
  featuredExtensions,
  onOpenExtensionDetail,
  isActive,
}: FeaturedExtensionsGridProps) {
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none absolute inset-x-0"
      }`}
      style={{ transitionProperty: "opacity, transform" }}
    >
      {/* Featured Extensions */}
      <div className="pt-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Featured Extensions</h3>
        </div>
        {featuredExtensions.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredExtensions.map((extension) => (
              <ExtensionCardGrid
                key={extension.package_name}
                extension={extension}
                onClick={() => onOpenExtensionDetail(extension)}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No featured extensions</p>
        )}
      </div>
    </div>
  );
}
