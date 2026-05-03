"use client";

import { useEffect, useState, useCallback } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark-mode");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark-mode");
      setIsDark(true);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const next = !isDark;
    // The overlay color is the NEXT theme's background
    const overlayColor = next ? "#121212" : "#fdfdfb";

    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      pointer-events: none;
      background: ${overlayColor};
      clip-path: circle(0% at 50% 50%);
    `;
    document.body.appendChild(overlay);

    // Force reflow
    overlay.getBoundingClientRect();

    // Start slow, then snap to full screen
    overlay.style.transition = "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    overlay.style.clipPath = "circle(150% at 50% 50%)";

    // Switch theme midway through the animation
    setTimeout(() => {
      setIsDark(next);
      if (next) {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    }, 400);

    // Fade out overlay after theme is applied
    setTimeout(() => {
      overlay.style.transition = "opacity 0.3s ease";
      overlay.style.opacity = "0";
    }, 700);

    // Clean up
    setTimeout(() => {
      overlay.remove();
      setIsAnimating(false);
    }, 1000);
  }, [isDark, isAnimating]);

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60"
      aria-label="Toggle theme"
    >
      {isDark ? (
        /* Sun icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[17px] h-[17px]">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      ) : (
        /* Moon icon */
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[17px] h-[17px]">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
