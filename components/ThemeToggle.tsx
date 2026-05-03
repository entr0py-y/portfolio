"use client";

import { useEffect, useState, useCallback } from "react";

// Cat face SVG matching reference: round head, pointy ears, eyes, nose, whiskers
const catFaceSvg = (color: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path fill="${color}" d="
    M60 55 L48 15 Q47 12 50 14 L78 42
    Q90 32 100 30 Q110 32 122 42
    L150 14 Q153 12 152 15 L140 55
    Q165 75 165 110
    Q165 155 100 170
    Q35 155 35 110
    Q35 75 60 55Z
  "/>
  <ellipse cx="75" cy="95" rx="10" ry="12" fill="${color === '#121212' ? '#fdfdfb' : '#121212'}"/>
  <ellipse cx="125" cy="95" rx="10" ry="12" fill="${color === '#121212' ? '#fdfdfb' : '#121212'}"/>
  <path d="M95 118 L100 125 L105 118Z" fill="${color === '#121212' ? '#fdfdfb' : '#121212'}"/>
  <line x1="60" y1="112" x2="30" y2="105" stroke="${color === '#121212' ? '#fdfdfb' : '#121212'}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="60" y1="120" x2="28" y2="122" stroke="${color === '#121212' ? '#fdfdfb' : '#121212'}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="60" y1="128" x2="30" y2="138" stroke="${color === '#121212' ? '#fdfdfb' : '#121212'}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="140" y1="112" x2="170" y2="105" stroke="${color === '#121212' ? '#fdfdfb' : '#121212'}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="140" y1="120" x2="172" y2="122" stroke="${color === '#121212' ? '#fdfdfb' : '#121212'}" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="140" y1="128" x2="170" y2="138" stroke="${color === '#121212' ? '#fdfdfb' : '#121212'}" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

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
    const bgColor = next ? "#121212" : "#fdfdfb";
    const svg = catFaceSvg(bgColor);
    const encoded = btoa(unescape(encodeURIComponent(svg.trim())));

    // Create the cat element — sits BEHIND all content (z-index: 0)
    const cat = document.createElement("div");
    cat.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 220px;
      height: 220px;
      transform: translate(-50%, -50%) scale(0);
      background-image: url("data:image/svg+xml;base64,${encoded}");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 0;
      pointer-events: none;
      opacity: 1;
    `;
    document.body.appendChild(cat);

    // Full-screen background layer behind content
    const bg = document.createElement("div");
    bg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${bgColor};
      z-index: 0;
      pointer-events: none;
      opacity: 0;
    `;
    document.body.appendChild(bg);

    // Force reflow
    cat.getBoundingClientRect();

    // Phase 1: Cat appears and grows slowly
    requestAnimationFrame(() => {
      cat.style.transition = "transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1)";
      cat.style.transform = "translate(-50%, -50%) scale(2)";
    });

    // Phase 2: Cat expands rapidly + background fills
    setTimeout(() => {
      cat.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease";
      cat.style.transform = "translate(-50%, -50%) scale(18)";
      bg.style.transition = "opacity 0.3s ease";
      bg.style.opacity = "1";
    }, 550);

    // Phase 3: Switch theme while cat covers screen
    setTimeout(() => {
      setIsDark(next);
      if (next) {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    }, 750);

    // Phase 4: Remove overlays (theme is now applied to body)
    setTimeout(() => {
      cat.style.transition = "opacity 0.3s ease";
      cat.style.opacity = "0";
      bg.style.transition = "opacity 0.3s ease";
      bg.style.opacity = "0";
    }, 900);

    // Cleanup
    setTimeout(() => {
      cat.remove();
      bg.remove();
      setIsAnimating(false);
    }, 1250);
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
