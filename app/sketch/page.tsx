"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PageShell from "@/components/PageShell";

const sketches = [
  { src: "/sketch/sketch1.png", top: "0%", left: "5%", rotate: "-12deg", z: 10 },
  { src: "/sketch/sketch2.jpeg", top: "8%", left: "35%", rotate: "8deg", z: 20 },
  { src: "/sketch/sketch3.jpeg", top: "20%", left: "-2%", rotate: "-6deg", z: 15 },
  { src: "/sketch/sketch4.jpeg", top: "25%", left: "42%", rotate: "14deg", z: 25 },
  { src: "/sketch/sketch5.jpeg", top: "45%", left: "8%", rotate: "-18deg", z: 5 },
  { src: "/sketch/sketch6.jpeg", top: "48%", left: "48%", rotate: "5deg", z: 30 },
  { src: "/sketch/sketch7.jpeg", top: "68%", left: "-5%", rotate: "-8deg", z: 20 },
  { src: "/sketch/sketch8.jpeg", top: "72%", left: "40%", rotate: "12deg", z: 35 },
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
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-12">
          Random ideas, rough thoughts, unfinished things.
        </p>

        {/* Scattered Collage */}
        <div className="relative w-full h-[1200px] max-[768px]:h-[1000px] mb-[300px] max-[768px]:mb-[250px]">
          {sketches.map((sketch, i) => (
            <div
              key={i}
              onClick={() => setSelectedSketch(i)}
              className="absolute w-[50%] max-[768px]:w-[65%] p-2 rounded-sm bg-[#e8e8e8] shadow-2xl cursor-pointer hover:!z-[100] transition-transform duration-300 hover:scale-[1.05]"
              style={{
                top: sketch.top,
                left: sketch.left,
                transform: `rotate(${sketch.rotate}) translateZ(0)`,
                zIndex: sketch.z,
              }}
            >
              <div className="w-full relative pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sketch.src}
                  alt={`Sketch ${i + 1}`}
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-[var(--color-outline)] mt-6 italic">
          Consider following my <a href="https://instagram.com/yeagr.art" target="_blank" rel="noopener noreferrer" className="interactive-word">art page</a>
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
            className="absolute top-10 right-10 flex items-center justify-center bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60 z-[1010]"
            aria-label="Back to sketches"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[14px]">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div className="relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sketches[selectedSketch].src}
              alt={`Sketch ${selectedSketch + 1}`}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl border-[2px] border-[var(--color-on-background)] shadow-2xl bg-[var(--color-surface)] object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </PageShell>
  );
}
