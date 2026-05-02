import PageShell from "@/components/PageShell";

export default function ListeningPage() {
  return (
    <PageShell title="Listening">
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[16px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Usually looping the same few tracks.
        </p>

        {/* Placeholder tracks */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01]"
            >
              {/* Album art placeholder */}
              <div className="w-10 h-10 rounded-lg bg-[var(--color-outline-variant)] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4 text-[var(--color-outline)]">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-semibold text-[var(--color-on-background)]">
                  Track {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-[var(--color-outline)]">
                  Artist
                </span>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] text-[var(--color-outline)]">—:——</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[var(--color-outline)] mt-6 italic">
          something like a last.fm or spotify integration would go here.
        </p>
      </div>
    </PageShell>
  );
}
