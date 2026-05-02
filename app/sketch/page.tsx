"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PageShell from "@/components/PageShell";

const sketches = [
  "/sketch/sketch1.png",
  "/sketch/sketch2.jpeg",
  "/sketch/sketch3.jpeg",
  "/sketch/sketch4.jpeg",
  "/sketch/sketch5.jpeg",
  "/sketch/sketch6.jpeg",
  "/sketch/sketch7.jpeg",
  "/sketch/sketch8.jpeg",
];

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

        {/* Sketches Grid */}
        <div className="grid grid-cols-2 gap-4">
          {sketches.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelectedSketch(i)}
              className="group relative aspect-[4/3] rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Sketch ${i + 1}`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[var(--color-surface)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] text-[var(--color-on-background)] font-medium drop-shadow-md">
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
            className="absolute top-10 right-10 flex items-center justify-center border-[1.5px] border-[var(--color-on-background)] rounded-xl px-2 py-1 bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60 z-[1010]"
            aria-label="Back to sketches"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[14px]">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div className="w-full max-w-[1000px] h-[80vh] relative rounded-2xl bg-[var(--color-surface)] border-[2px] border-[var(--color-on-background)] flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sketches[selectedSketch]}
              alt={`Sketch ${selectedSketch + 1}`}
              className="w-full h-full object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)] to-transparent opacity-90 pointer-events-none">
              <h2 className="text-[24px] font-semibold text-[var(--color-on-background)] drop-shadow-lg">
                sketch_{String(selectedSketch + 1).padStart(2, "0")}
              </h2>
            </div>
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  );
}
