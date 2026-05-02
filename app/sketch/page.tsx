"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PageShell from "@/components/PageShell";

export default function SketchingPage() {
  const [selectedSketch, setSelectedSketch] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Random ideas, rough thoughts, unfinished things.
        </p>

        {/* Placeholder Grid */}
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              onClick={() => setSelectedSketch(i)}
              className="group relative aspect-[4/3] rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
            >
              {/* Subtle sketch pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-12 h-12 text-[var(--color-outline-variant)] opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                >
                  <path d="M20 80 L50 20 L80 80" />
                  <circle cx="50" cy="35" r="8" />
                  <path d="M15 85 H85" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] text-[var(--color-outline)] font-medium">
                  sketch_{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[var(--color-outline)] mt-6 italic">
          more coming soon.
        </p>
      </div>

      {/* Maximized View Overlay */}
      {mounted && selectedSketch !== null && createPortal(
        <div 
          className="fixed inset-0 z-[1000] bg-[var(--color-background)] flex flex-col items-center justify-center p-10 animate-in fade-in duration-300"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {/* Back Button (matching top-right style) */}
          <button
            onClick={() => setSelectedSketch(null)}
            className="absolute top-10 right-10 flex items-center justify-center border-[1.5px] border-[var(--color-on-background)] rounded-xl px-2 py-1 bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60"
            aria-label="Back to sketches"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[14px]">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div className="w-full max-w-[1000px] aspect-[4/3] relative rounded-2xl bg-[var(--color-surface)] border-[2px] border-[var(--color-on-background)] flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-48 h-48 text-[var(--color-outline-variant)] opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <path d="M20 80 L50 20 L80 80" />
              <circle cx="50" cy="35" r="8" />
              <path d="M15 85 H85" />
            </svg>
            
            <div className="absolute bottom-10 left-10">
              <h2 className="text-[24px] font-semibold text-[var(--color-on-background)]">
                sketch_{String(selectedSketch + 1).padStart(2, "0")}
              </h2>
              <p className="text-[14px] text-[var(--color-outline)] mt-2">
                Drafting some thoughts about the universe...
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  );
}
