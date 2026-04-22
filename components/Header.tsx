"use client";

import { useIsEmbedded } from "./hooks/useIsEmbedded";

interface HeaderProps {
  onLogoClick: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const isEmbedded = useIsEmbedded();

  return (
    <header className="border-b border-border">
      <div
        className={`container mx-auto transition-all duration-500 ease-in-out ${
          isEmbedded ? "px-2 py-4" : "px-4 py-4"
        } flex items-center justify-between`}
      >
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
