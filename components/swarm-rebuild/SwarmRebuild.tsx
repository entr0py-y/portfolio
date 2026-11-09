"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { restartSwarm, stopSwarm } from "./swarm-engine";

// Track whether the home page animation has already played in this browser session.
// When returning to the home page via SPA navigation, it will not initiate again.
// It will only initiate on initial visit or when the user refreshes.
let homePlayed = false;

export default function SwarmRebuild() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut listener ('R' to manually replay on any page)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        restartSwarm({ showIntro: window.location.pathname === "/" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Do not repeat when returning to the home page; only initiate on initial visit or refresh
    if (pathname === "/") {
      if (homePlayed) return;
      homePlayed = true;
    }

    const isHome = pathname === "/";
    // Allow Next.js route transition to settle and render new DOM elements before rebuilding
    const timer = setTimeout(() => {
      restartSwarm({ showIntro: isHome });
    }, 120);

    return () => {
      clearTimeout(timer);
      stopSwarm(false);
    };
  }, [mounted, pathname]);

  return null;
}
