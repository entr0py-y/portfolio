import PageShell from "@/components/PageShell";

export default function ListeningPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Usually looping the same few tracks.
        </p>

        <div
          className="rounded-2xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] p-3 backdrop-blur-sm smooth-card"
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

        <div className="mt-10 flex flex-col gap-4 text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)]">
          <p>
            Mostly alt, indie, and a lot of Radiohead, with some soundtracks and random tracks that just linger longer than expected.
          </p>
          <p>
            I usually end up replaying the same few songs over and over until they wear out, then replace them with something that hits just as hard.
          </p>
          <p>
            It’s less about what I listen to and more about what stays.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
