import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-[650px] px-10 pt-20 pb-10 relative flex flex-col min-h-screen box-border z-[1] max-[768px]:px-5 max-[768px]:pt-16 max-[768px]:pb-4">
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="mb-6 ml-0" style={{ fontFamily: "var(--font-body)" }}>
          <h1 className="text-[35px] font-semibold text-[var(--color-on-background)] m-0" style={{ fontFamily: "var(--font-body)" }}>
            Hi! I&apos;m <span className="text-[#aa8970]">Pushkar</span>
          </h1>
          <p className="text-[16px] leading-relaxed mt-2 mb-4 text-[var(--color-on-background)] font-normal" style={{ fontFamily: "var(--font-body)" }}>
            i build stuff.
          </p>
          <div className="flex gap-4 mt-0">
            <a href="https://instagram.com/endeavv0r" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--color-on-background)] no-underline flex items-center justify-center transition-opacity duration-200 hover:opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://github.com/entr0py-y" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--color-on-background)] no-underline flex items-center justify-center transition-opacity duration-200 hover:opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/pushk4rjha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--color-on-background)] no-underline flex items-center justify-center transition-opacity duration-200 hover:opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="mailto:pushkarjha880@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="text-[var(--color-on-background)] no-underline flex items-center justify-center transition-opacity duration-200 hover:opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="https://wa.me/917982499778" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[var(--color-on-background)] no-underline flex items-center justify-center transition-opacity duration-200 hover:opacity-60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <g transform="translate(3.5, 2.8) scale(0.75)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" fill="currentColor" stroke="none" />
                </g>
              </svg>
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="w-full flex flex-col flex-1">
          {/* About */}
          <section className="mb-6 max-w-[650px] ml-0" style={{ fontFamily: "var(--font-body)" }}>
            <div className="flex items-start mb-4 mt-0">
              <h2 className="text-[24px] font-normal m-0 leading-none" style={{ fontFamily: "var(--font-body)" }}>about</h2>
            </div>
            <p className="text-[13px] leading-[1.6] font-medium m-0 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              I&apos;m a first-year computer science student and software developer focused on building clean, scalable applications and exploring new technologies.
            </p>
            <p className="text-[13px] leading-[1.6] font-medium m-0 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              When I&apos;m not coding, I&apos;m usually{" "}
              <Link href="/sketch" className="interactive-word">sketching</Link>{" "}
              random ideas that don&apos;t always make sense at first, playing{" "}
              <Link href="/play" className="interactive-word">games</Link>{" "}
              to slow things down, tweaking my{" "}
              <Link href="/gear" className="interactive-word">gear</Link>{" "}
              just because I can, or just{" "}
              <Link href="/listen" className="interactive-word">listening</Link>{" "}
              to something on repeat while figuring things out in my head.
            </p>
          </section>

          {/* Escape Widget / Music Player */}
          <section className="mb-6 ml-0" style={{ fontFamily: "var(--font-body)" }}>
            <div className="flex items-start mb-4 mt-0">
              <h2 className="text-[24px] font-normal m-0 leading-none" style={{ fontFamily: "var(--font-body)" }}>mah plelist.</h2>
            </div>
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center relative w-full max-[768px]:relative max-[768px]:w-full max-[768px]:h-[180px] max-[768px]:mb-2">
                <a href="https://music.apple.com/in/playlist/plastic-airbag/pl.u-8aAVZ5bUvqN74DV" target="_blank" rel="noopener noreferrer" className="no-underline shrink-0 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://is1-ssl.mzstatic.com/image/thumb/SG-MQ-US-001-Image000001/v4/b2/e1/7b/b2e17b53-344a-8e14-d0bc-5d8835c2c00c/image/400x400cc.jpg"
                    alt="Plastic Airbag"
                    className="w-[200px] h-[200px] rounded-[6px] object-cover block album-art max-[768px]:w-[180px] max-[768px]:h-[180px]"
                    style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0,0,0,0.2)" }}
                  />
                </a>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/signature.png"
                  alt="Signature"
                  className="signature-img absolute left-[200px] right-0 mx-auto w-[420px] object-contain opacity-85 rotate-[30deg] pointer-events-none max-[768px]:absolute max-[768px]:left-[140px] max-[768px]:right-0 max-[768px]:mx-auto max-[768px]:top-1/2 max-[768px]:-translate-y-1/2 max-[768px]:rotate-[25deg] max-[768px]:w-[240px] max-[768px]:z-[20]"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] font-semibold mb-0.5">Plastic Airbag</div>
                <div className="text-[12px] text-[var(--color-on-background)] opacity-70 mb-2">what I disappear into</div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-6 max-w-[650px] ml-0" style={{ fontFamily: "var(--font-body)" }}>
            <div className="flex items-start mb-4 mt-0">
              <h2 className="text-[24px] font-normal m-0 leading-none" style={{ fontFamily: "var(--font-body)" }}>contact</h2>
            </div>
            <p className="text-[13px] leading-[1.6] font-medium m-0 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Whether it&apos;s a project, collaboration, or just a random idea you want to talk about, I&apos;m down.
              Hit me up on <a href="https://wa.me/917982499778" className="inline-link" target="_blank">WhatsApp</a> or <a href="#" className="inline-link">Discord</a>. If you prefer keeping things simple, <a href="mailto:pushkarjha880@gmail.com" className="inline-link">email</a> works just as well.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="ml-0 text-[12px] font-semibold mt-0 pb-0" style={{ fontFamily: "var(--font-body)" }}>
        <p>© 2026 Pushkar Jha</p>
      </footer>
    </div>
  );
}
