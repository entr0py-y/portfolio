"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PageShell from "@/components/PageShell";

// 12 sketches arranged so column heights balance evenly in 4-column (desktop) and 2-column (mobile) masonry
const sketches = [
  // Col 1 items (tall + short + medium):
  { src: "/sketch/sketch7.jpeg", width: 1080, height: 1920, aspect: "1080/1920", title: "Sketch 1" },
  { src: "/sketch/sketch1.png", width: 1000, height: 732, aspect: "1000/732", title: "Sketch 2" },
  { src: "/sketch/sketch4.jpeg", width: 1080, height: 1351, aspect: "1080/1351", title: "Sketch 3" },

  // Col 2 items (tall + short + medium):
  { src: "/sketch/sketch8.jpeg", width: 1080, height: 1920, aspect: "1080/1920", title: "Sketch 4" },
  { src: "/sketch/sketch2.jpeg", width: 1000, height: 750, aspect: "1000/750", title: "Sketch 5" },
  { src: "/sketch/sketch5.jpeg", width: 1080, height: 1350, aspect: "1080/1350", title: "Sketch 6" },

  // Col 3 items (medium + square + medium):
  { src: "/sketch/sketch3.jpeg", width: 800, height: 1000, aspect: "800/1000", title: "Sketch 7" },
  { src: "/sketch/24.jpg", width: 736, height: 736, aspect: "1/1", title: "Sketch 8" },
  { src: "/sketch/23.jpg", width: 736, height: 981, aspect: "736/981", title: "Sketch 9" },

  // Col 4 items (medium + square + medium):
  { src: "/sketch/sketch6.jpeg", width: 1080, height: 1350, aspect: "1080/1350", title: "Sketch 10" },
  { src: "/sketch/25.jpg", width: 736, height: 736, aspect: "1/1", title: "Sketch 11" },
  { src: "/sketch/26.jpg", width: 735, height: 897, aspect: "735/897", title: "Sketch 12" },
];

export default function SketchingPage() {
  const [selectedSketch, setSelectedSketch] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (selectedSketch === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSketch(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSketch]);

  return (
    <PageShell maxWidth="max-w-[1200px]">
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Random ideas, rough thoughts, unfinished things.
        </p>

        {/* Pinterest-style Masonry Grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 gap-3.5 sm:gap-4 mb-12">
          {sketches.map((sketch, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-3.5 sm:mb-4 cursor-pointer group"
              onClick={() => setSelectedSketch(i)}
            >
              <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface)] shadow-sm hover:shadow-md transition-all duration-300 ease-out">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sketch.src}
                  alt={`Sketch ${i + 1}`}
                  width={sketch.width}
                  height={sketch.height}
                  style={{ aspectRatio: sketch.aspect }}
                  className="w-full h-auto block object-cover rounded-2xl opacity-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-[1.025]"
                  decoding="async"
                  loading={i < 4 ? "eager" : "lazy"}
                />
                {/* Subtle Pinterest hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-200 pointer-events-none rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-[var(--color-outline)] mt-6 italic">
          Consider following my{" "}
          <a
            href="https://instagram.com/yeagr.art"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-word"
          >
            art page
          </a>
        </p>
      </div>

      {/* Maximized View Overlay */}
      {mounted && selectedSketch !== null && createPortal(
        <div
          className="fixed inset-0 z-[1000] bg-[var(--color-background)]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-10 sketch-lightbox cursor-zoom-out"
          style={{ fontFamily: "var(--font-body)" }}
          onClick={() => setSelectedSketch(null)}
        >
          {/* Back Button */}
          <button
            onClick={() => setSelectedSketch(null)}
            className="absolute top-6 right-6 sm:top-10 sm:right-10 flex items-center justify-center bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60 z-[1010]"
            aria-label="Back to sketches"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px]">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div
            className="relative flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sketches[selectedSketch].src}
              alt={`Sketch ${selectedSketch + 1}`}
              className="max-w-[92vw] max-h-[85vh] rounded-2xl border border-[var(--color-outline)]/20 shadow-2xl bg-[var(--color-surface)] object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  );
}
