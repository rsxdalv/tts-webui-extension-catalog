"use client";

import { useState, useEffect } from "react";

// Hook to detect if the app is embedded in an iframe
export function useIsEmbedded() {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check query parameter
    const params = new URLSearchParams(window.location.search);
    const embeddedParam = params.get("embedded") === "true";

    // Check if actually in an iframe
    const inIframe = window.self !== window.top;

    // Set embedded if either condition is true
    setIsEmbedded(embeddedParam || inIframe);
  }, []);

  return isEmbedded;
}
