import PageShell from "@/components/PageShell";

export default function SketchingPage() {
  return (
    <PageShell title="Sketching">
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Random ideas, rough thoughts, unfinished things.
        </p>

        {/* Placeholder Grid */}
        <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline-variant)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--color-accent)]"
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
    </PageShell>
  );
}
