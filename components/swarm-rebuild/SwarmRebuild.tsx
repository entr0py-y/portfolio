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
      document.documentElement.classList.add("swarm-ready");
      return;
    }

    // Do not repeat when returning to the home page; only initiate on initial visit or refresh
    if (pathname === "/") {
      if (homePlayed) {
        document.documentElement.classList.add("swarm-ready");
        document.documentElement.classList.remove("swarm-navigating");
        return;
      }
      homePlayed = true;
      document.documentElement.classList.add("swarm-navigating");
    } else {
      // Navigating to subpage: veil page until swarm rebuild overlay mounts
      document.documentElement.classList.add("swarm-navigating");
    }

    const isHome = pathname === "/";
    if (isHome) {
      restartSwarm({ showIntro: true });
      return () => {
        stopSwarm(false);
      };
    }

    // Allow Next.js route transition to settle and render new DOM elements before rebuilding
    const timer = setTimeout(() => {
      restartSwarm({ showIntro: false });
    }, 40);

    return () => {
      clearTimeout(timer);
      stopSwarm(false);
    };
  }, [mounted, pathname]);

  return null;
}
