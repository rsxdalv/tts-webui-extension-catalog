import { Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
