"use client";

import { useState, useEffect, createContext, useContext } from "react";

const ThemeTransitionContext = createContext({
  triggerTransition: (nextTheme: "light" | "dark", callback: () => void) => {},
});

export const useThemeTransition = () => useContext(ThemeTransitionContext);

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"light" | "dark">("dark");

  const triggerTransition = (nextTheme: "light" | "dark", callback: () => void) => {
    setTargetTheme(nextTheme);
    setIsTransitioning(true);

    // After the cat covers the screen (around 800ms of the 1.5s animation)
    setTimeout(() => {
      callback();
    }, 800);

    // Finish transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1600);
  };

  return (
    <ThemeTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {isTransitioning && (
        <div className="cat-transition-overlay">
          <div className={`cat-shape-wrapper ${isTransitioning ? "animating" : ""}`}>
            <svg
              viewBox="0 0 100 100"
              className="cat-svg"
              style={{
                fill: targetTheme === "dark" ? "#0b0b0b" : "#f5f5f5",
              }}
            >
              {/* Pusheen-style cat silhouette */}
              <path d="M25,40 C25,25 35,15 42,15 C44,15 45,18 45,20 C45,20 55,20 55,20 C55,18 56,15 58,15 C65,15 75,25 75,40 C85,45 90,55 90,70 C90,85 80,95 50,95 C20,95 10,85 10,70 C10,55 15,45 25,40 Z" />
              {/* Small tail bump */}
              <path d="M85,75 C95,75 98,85 92,90 C88,93 82,90 82,90" />
            </svg>
          </div>
        </div>
      )}

      <style jsx global>{`
        .cat-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .cat-shape-wrapper {
          width: 100px;
          height: 100px;
          transform: scale(0);
        }
        .cat-shape-wrapper.animating {
          animation: cat-zoom 1.6s cubic-bezier(0.7, 0, 0.3, 1) forwards;
        }
        .cat-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 20px rgba(0,0,0,0.3));
        }
        @keyframes cat-zoom {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          40% {
            transform: scale(1.5);
            opacity: 1;
          }
          75% {
            transform: scale(80);
            opacity: 1;
          }
          90% {
            transform: scale(80);
            opacity: 1;
          }
          100% {
            transform: scale(80);
            opacity: 0;
          }
        }
      `}</style>
    </ThemeTransitionContext.Provider>
  );
}
