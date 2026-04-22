import { Download, Github, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatJson } from "./utils/formatJson";
import type { Extension } from "@/lib/types";

interface ExtensionDetailModalProps {
  selectedExtension: Extension | null;
  onClose: () => void;
  isEmbedded: boolean;
}

export function ExtensionDetailModal({
  selectedExtension,
  onClose,
  isEmbedded,
}: ExtensionDetailModalProps) {
  // Handler for Install Extension button
  const handleInstallExtension = () => {
    if (!selectedExtension) return;

    // Send extension data to parent window via postMessage
    window.parent.postMessage(
      {
        type: "install-extension",
        data: selectedExtension,
      },
      "*",
    );
  };

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
                    {isEmbedded &&
                      (selectedExtension.package_name?.startsWith(
                        "extensions.builtin.",
                      ) ? (
                        <Button disabled>Cannot be installed</Button>
                      ) : (
                        <Button onClick={handleInstallExtension}>
                          <Download className="h-4 w-4 mr-2" />
                          Install Extension
                        </Button>
                      ))}
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
