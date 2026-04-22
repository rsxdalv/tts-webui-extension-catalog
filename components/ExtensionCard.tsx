import { Award, Star, Cpu } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Extension } from "@/lib/types";

interface ExtensionCardBaseProps {
  extension: Extension;
  onClick: () => void;
}

export function ExtensionCardGrid({
  extension,
  onClick,
}: ExtensionCardBaseProps) {
  return (
    <Card
      className="cursor-pointer hover:border-primary transition-colors flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="flex-1">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">
              {extension.name}
            </CardTitle>
            <div className="flex items-center gap-1 shrink-0">
              {extension.featured && <Award className="h-4 w-4 text-primary" />}
              {extension.proxy === "native" && (
                <Cpu className="h-4 w-4 text-muted-foreground" />
              )}
              {extension.recommended && <Star className="h-4 w-4 text-primary" />}
            </div>
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
  );
}

export function ExtensionCardList({
  extension,
  onClick,
}: ExtensionCardBaseProps) {
  return (
    <Card
      className="cursor-pointer hover:border-primary transition-colors"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg">{extension.name}</CardTitle>
              {extension.featured && <Award className="h-4 w-4 text-primary" />}
              {extension.proxy === "native" && (
                <Cpu className="h-4 w-4 text-muted-foreground" />
              )}
              {extension.recommended && <Star className="h-4 w-4 text-primary" />}
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
  );
}
