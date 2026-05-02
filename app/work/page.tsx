"use client";

import PageShell from "@/components/PageShell";

export default function WorkPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[32px] font-semibold text-[var(--color-on-background)] mb-2">
            Work
          </h1>
          <p className="text-[14px] leading-relaxed text-[var(--color-outline)] font-medium mb-8">
            What I’ve built, explored, and learned along the way.
          </p>
          <a
            href="/PushkarJhaResume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-[1.5px] border-[var(--color-on-background)] text-[13px] font-semibold text-[var(--color-on-background)] transition-all duration-300 hover:shadow-[0_0_12px_rgba(34,197,94,0.3)] hover:border-[#22c55e] no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* ACHIEVEMENTS */}
        <section className="mb-14">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-6">
            Achievements
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                Winner — GenCodeX Hackathon
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                200+ teams
              </div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                Top 5 — Brainwave 2.0 Hackathon
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                DTU · 800+ teams
              </div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                Top 5 — Innovision Ideathon
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                150+ teams
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="mb-14">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-6">
            Certifications
          </h2>
          <div className="flex flex-col gap-5">
            <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
              JP Morgan Chase — Software Engineering Job Simulation
            </div>
            <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
              Deloitte — Cyber Security Job Simulation
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="mb-10">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-6">
            Tech Stack
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Languages
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                C/C++ (Arduino), Python, Java
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Embedded Systems
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                ESP32/ESP8266, Arduino IDE, firmware flashing, WiFi (HTTP), UART
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Web
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                HTML, CSS, JavaScript
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Backend & APIs
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                REST APIs, API integration, HTTP request/response handling
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Tools
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                Git
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Core
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                Data Structures & Algorithms (basic), OOP fundamentals
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
