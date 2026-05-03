"use client";

import { useEffect, useState, useCallback } from "react";

// Cat face SVG matching the reference exactly: round head, pointy ears with inner lines,
// filled circle eyes, triangle nose, small mouth, 3 whiskers each side
const createCatSvg = (fillColor: string) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 200 180");
  svg.setAttribute("fill", "none");
  svg.style.width = "100%";
  svg.style.height = "100%";

  svg.innerHTML = `
    <!-- Head outline -->
    <path d="
      M58 60
      L45 18 Q44 14 48 17 L75 48
      Q88 38 100 36 Q112 38 125 48
      L152 17 Q156 14 155 18 L142 60
      Q168 80 168 112
      Q168 158 100 165
      Q32 158 32 112
      Q32 80 58 60Z
    " stroke="${fillColor}" stroke-width="5" fill="none"/>
    <!-- Inner ear lines -->
    <line x1="55" y1="56" x2="50" y2="30" stroke="${fillColor}" stroke-width="3" stroke-linecap="round"/>
    <line x1="145" y1="56" x2="150" y2="30" stroke="${fillColor}" stroke-width="3" stroke-linecap="round"/>
    <!-- Eyes -->
    <circle cx="75" cy="100" r="10" fill="${fillColor}"/>
    <circle cx="125" cy="100" r="10" fill="${fillColor}"/>
    <!-- Nose -->
    <path d="M95 122 L100 130 L105 122Z" fill="${fillColor}"/>
    <!-- Mouth -->
    <path d="M90 136 Q95 142 100 136 Q105 142 110 136" stroke="${fillColor}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Left whiskers -->
    <line x1="62" y1="118" x2="22" y2="110" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="60" y1="126" x2="18" y2="126" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="62" y1="134" x2="22" y2="142" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Right whiskers -->
    <line x1="138" y1="118" x2="178" y2="110" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="140" y1="126" x2="182" y2="126" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="138" y1="134" x2="178" y2="142" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
  `;
  return svg;
};

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
    const catColor = next ? "#fdfdfb" : "#1a1a1a";

    // Create cat element
    const catContainer = document.createElement("div");
    catContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 180px;
      height: 180px;
      transform: translate(-50%, -50%) scale(0);
      z-index: 999999;
      pointer-events: none;
    `;
    const catSvg = createCatSvg(catColor);
    catContainer.appendChild(catSvg);
    document.body.appendChild(catContainer);

    const applyTheme = () => {
      setIsDark(next);
      if (next) {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    };

    // Try View Transitions API for pixel-perfect theme change as circle passes
    const doc = document as unknown as { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } };

    if (doc.startViewTransition) {
      const transition = doc.startViewTransition(() => {
        applyTheme();
      });

      transition.ready.then(() => {
        // Animate the NEW view revealing with expanding circle — elements change
        // theme exactly when the circle reaches them
        document.documentElement.animate(
          {
            clipPath: ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"],
          },
          {
            duration: 900,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );

        // Cat appears and grows alongside the circle
        catContainer.animate(
          [
            { transform: "translate(-50%, -50%) scale(0)", opacity: "1" },
            { transform: "translate(-50%, -50%) scale(2.5)", opacity: "1", offset: 0.6 },
            { transform: "translate(-50%, -50%) scale(3.5)", opacity: "0" },
          ],
          {
            duration: 900,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );
      });

      transition.finished.then(() => {
        catContainer.remove();
        setIsAnimating(false);
      });
    } else {
      // Fallback for browsers without View Transitions API
      // Cat animation
      catContainer.style.transition = "transform 0.8s ease-in-out, opacity 0.3s ease";
      requestAnimationFrame(() => {
        catContainer.style.transform = "translate(-50%, -50%) scale(2.5)";
      });

      setTimeout(() => {
        applyTheme();
        catContainer.style.transform = "translate(-50%, -50%) scale(4)";
        catContainer.style.opacity = "0";
      }, 500);

      setTimeout(() => {
        catContainer.remove();
        setIsAnimating(false);
      }, 900);
    }
  }, [isDark, isAnimating]);

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60"
      aria-label="Toggle theme"
    >
      {isDark ? (
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[17px] h-[17px]">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
