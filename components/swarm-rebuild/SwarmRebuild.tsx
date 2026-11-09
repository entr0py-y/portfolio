"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { restartSwarm, stopSwarm } from "./swarm-engine";

// Track visited routes so each page only animates ONCE per session.
// When returning to an already visited page (e.g. Back to Home),
// the animation does not repeat — it only initiates again on browser refresh.
const playedRoutes = new Set<string>();

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

    // Only initiate once per route in this session; do not repeat on return navigation
    if (playedRoutes.has(pathname)) {
      return;
    }
    playedRoutes.add(pathname);

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
