"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { startSwarm, stopSwarm, restartSwarm } from "./swarm-engine";

// Track auto-play so SPA navigation doesn't re-trigger unexpectedly,
// while browser reload/refresh re-plays automatically.
let hasAutoPlayed = false;

export default function SwarmRebuild() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut listener ('R' to replay)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.key === "r" || e.key === "R") && isHomepage && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        restartSwarm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHomepage]);

  useEffect(() => {
    if (!mounted || !isHomepage) {
      stopSwarm(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (hasAutoPlayed) {
      return;
    }

    hasAutoPlayed = true;

    // Launch authentic Swarm Rebuild
    const timer = setTimeout(() => {
      startSwarm();
    }, 100);

    return () => {
      clearTimeout(timer);
      stopSwarm(false);
    };
  }, [mounted, isHomepage]);

  return null;
}
