"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { restartSwarm, stopSwarm } from "./swarm-engine";

export default function SwarmRebuild() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut listener ('R' to replay on any page)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        restartSwarm({ showIntro: isHomepage });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHomepage]);

  useEffect(() => {
    if (!mounted) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Allow Next.js route transition to settle and render new DOM elements before rebuilding
    const timer = setTimeout(() => {
      restartSwarm({ showIntro: isHomepage });
    }, 120);

    return () => {
      clearTimeout(timer);
      stopSwarm(false);
    };
  }, [mounted, pathname, isHomepage]);

  return null;
}
