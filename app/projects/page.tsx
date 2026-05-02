"use client";

import PageShell from "@/components/PageShell";

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold text-[var(--color-on-background)] mb-2">
            Projects
          </h1>
          <p className="text-[14px] leading-relaxed text-[var(--color-outline)] font-medium">
            Things I&apos;ve built and actually care about.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* PROJECT 1: Vision-Aid */}
          <section>
            <h2 className="text-[20px] font-bold text-[var(--color-on-background)] mb-1">
              Vision-Aid
            </h2>
            <div className="text-[13px] text-[var(--color-outline)] font-medium mb-2">
              Assistive system for visually impaired
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--color-on-background)] mb-3">
              An embedded system that performs real-time object detection using a WiFi-connected backend.
            </p>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
              {[
                "Built using ESP32 with a Python backend",
                "Integrated YOLO-based detection for real-time inference",
                "Designed full pipeline: device → API → backend → response",
                "Reduced latency by ~30% with optimized request handling"
              ].map((detail, idx) => (
                <li key={idx} className="text-[13px] text-[var(--color-outline)] flex gap-3 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* PROJECT 2: SweepX */}
          <section>
            <h2 className="text-[20px] font-bold text-[var(--color-on-background)] mb-1">
              SweepX
            </h2>
            <div className="text-[13px] text-[var(--color-outline)] font-medium mb-2">
              Gamified waste management platform
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--color-on-background)] mb-3">
              A mobile-first platform that turns real-world cleanup into AI-validated missions.
            </p>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
              {[
                "Built full-stack system (frontend, backend, AI validation)",
                "Implemented image-based verification (before/after)",
                "Integrated Supabase for real-time tracking",
                "Designed engagement system through gamification"
              ].map((detail, idx) => (
                <li key={idx} className="text-[13px] text-[var(--color-outline)] flex gap-3 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="text-[12px] text-[var(--color-outline)] mt-16 italic">
          more in the works.
        </p>
      </div>
    </PageShell>
  );
}
