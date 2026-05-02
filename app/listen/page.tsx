import PageShell from "@/components/PageShell";

export default function ListeningPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Usually looping the same few tracks.
        </p>

        <div
          className="rounded-2xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="650"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://embed.music.apple.com/in/playlist/plastic-airbag/pl.u-8aAVZ5bUvqN74DV?theme=dark"
            className="w-full rounded-xl"
            style={{ maxWidth: "100%", overflow: "hidden", background: "transparent" }}
          />
        </div>
      </div>
    </PageShell>
  );
}
