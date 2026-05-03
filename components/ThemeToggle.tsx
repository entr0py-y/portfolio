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

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    if (doc.startViewTransition) {
      const transition = doc.startViewTransition(() => {
        applyTheme();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: ["circle(0% at 50% 50%)", "circle(150% at 50% 50%)"],
          },
          {
            duration: 1400,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });

      transition.finished.then(() => {
        setIsAnimating(false);
      });
    } else {
      applyTheme();
      setIsAnimating(false);
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
