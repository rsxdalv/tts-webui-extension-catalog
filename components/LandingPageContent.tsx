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

interface LandingPageContentProps {
  topExtensions: Extension[];
  onOpenExtensionDetail: (extension: Extension) => void;
  isActive: boolean;
}

export function LandingPageContent({
  topExtensions,
  onOpenExtensionDetail,
  isActive,
}: LandingPageContentProps) {
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
