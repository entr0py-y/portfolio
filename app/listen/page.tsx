import PageShell from "@/components/PageShell";

export default function ListeningPage() {
  return (
    <PageShell title="Listening">
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Usually looping the same few tracks.
        </p>

        {/* My Current Playlist */}
        <div className="mb-10">
          <h3 className="flex items-center gap-2 text-[12px] font-semibold mb-4 text-[var(--color-outline)] uppercase tracking-wider">
            <span className="w-[3px] h-[14px] bg-[var(--color-accent)] rounded-full inline-block" />
            My Current Playlist
          </h3>

          <div
            className="rounded-2xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="450"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/in/playlist/plastic-airbag/pl.u-8aAVZ5bUvqN74DV?theme=dark"
              className="w-full rounded-xl"
              style={{ maxWidth: "100%", overflow: "hidden", background: "transparent" }}
            />
          </div>
        </div>

        {/* Placeholder tracks */}
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-[12px] font-semibold mb-4 text-[var(--color-outline)] uppercase tracking-wider">
            <span className="w-[3px] h-[14px] bg-[var(--color-accent)] rounded-full inline-block" />
            On Repeat
          </h3>
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
        </div>

        <p className="text-[11px] text-[var(--color-outline)] italic">
          something like a last.fm or spotify integration would go here.
        </p>
      </div>
    </PageShell>
  );
}
