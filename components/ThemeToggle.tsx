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
    const overlayColor = next ? "rgba(18, 18, 18, 0.45)" : "rgba(253, 253, 251, 0.45)";

    // Cat silhouette SVG path
    const catSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width:100%;height:100%;">
        <path fill="${next ? 'rgba(18,18,18,0.5)' : 'rgba(253,253,251,0.5)'}" d="
          M256 48
          C220 48 200 20 180 8
          C178 6 176 40 176 56
          C160 44 136 8 120 8
          C116 10 120 48 124 68
          C80 80 48 128 48 200
          C48 260 68 300 100 328
          C80 348 64 380 64 412
          C64 448 88 472 120 472
          L160 472
          C168 488 200 504 256 504
          C312 504 344 488 352 472
          L392 472
          C424 472 448 448 448 412
          C448 380 432 348 412 328
          C444 300 464 260 464 200
          C464 128 432 80 388 68
          C392 48 396 10 392 8
          C376 8 352 44 336 56
          C336 40 334 6 332 8
          C312 20 292 48 256 48Z
        "/>
        <circle cx="200" cy="180" r="24" fill="${next ? 'rgba(40,40,40,0.6)' : 'rgba(220,220,220,0.6)'}"/>
        <circle cx="312" cy="180" r="24" fill="${next ? 'rgba(40,40,40,0.6)' : 'rgba(220,220,220,0.6)'}"/>
        <ellipse cx="256" cy="220" rx="12" ry="8" fill="${next ? 'rgba(60,60,60,0.5)' : 'rgba(180,180,180,0.5)'}"/>
        <path d="M240 236 Q256 252 272 236" stroke="${next ? 'rgba(60,60,60,0.5)' : 'rgba(180,180,180,0.5)'}" stroke-width="3" fill="none"/>
        <line x1="168" y1="210" x2="120" y2="200" stroke="${next ? 'rgba(60,60,60,0.4)' : 'rgba(200,200,200,0.4)'}" stroke-width="2"/>
        <line x1="168" y1="224" x2="120" y2="228" stroke="${next ? 'rgba(60,60,60,0.4)' : 'rgba(200,200,200,0.4)'}" stroke-width="2"/>
        <line x1="344" y1="210" x2="392" y2="200" stroke="${next ? 'rgba(60,60,60,0.4)' : 'rgba(200,200,200,0.4)'}" stroke-width="2"/>
        <line x1="344" y1="224" x2="392" y2="228" stroke="${next ? 'rgba(60,60,60,0.4)' : 'rgba(200,200,200,0.4)'}" stroke-width="2"/>
      </svg>
    `;

    // Create overlay container
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99998;
      pointer-events: none;
      background: ${overlayColor};
      opacity: 0;
      transition: opacity 0.4s ease;
    `;

    // Create cat element
    const cat = document.createElement("div");
    const encodedSvg = btoa(unescape(encodeURIComponent(catSvg.trim())));
    cat.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 200px;
      height: 200px;
      transform: translate(-50%, -50%) scale(0);
      background-image: url("data:image/svg+xml;base64,${encodedSvg}");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      z-index: 99999;
      pointer-events: none;
      transition: transform 1s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s ease;
      opacity: 0;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(cat);

    // Force reflow
    cat.getBoundingClientRect();

    // Phase 1: Fade in overlay + cat appears and starts growing slowly
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      cat.style.opacity = "1";
      cat.style.transform = "translate(-50%, -50%) scale(1.5)";
    });

    // Phase 2: Cat grows rapidly to fill screen
    setTimeout(() => {
      cat.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
      cat.style.transform = "translate(-50%, -50%) scale(12)";
    }, 500);

    // Phase 3: Switch theme
    setTimeout(() => {
      setIsDark(next);
      if (next) {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    }, 700);

    // Phase 4: Fade everything out
    setTimeout(() => {
      overlay.style.opacity = "0";
      cat.style.opacity = "0";
    }, 900);

    // Cleanup
    setTimeout(() => {
      overlay.remove();
      cat.remove();
      setIsAnimating(false);
    }, 1300);
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
