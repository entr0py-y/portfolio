"use client";

import PageShell from "@/components/PageShell";
import TransitionLink from "@/components/TransitionLink";

const pillButtonClass =
  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-[1.5px] border-[var(--color-on-background)] text-[13px] font-semibold text-[var(--color-on-background)] transition-all duration-300 hover:shadow-[0_0_12px_rgba(34,197,94,0.3)] hover:border-[#22c55e] no-underline";

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
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/PushkarJhaResume.pdf"
              download
              className={pillButtonClass}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
            <TransitionLink
              href="/projects"
              className={pillButtonClass}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 7 3 12 8 17" />
                <polyline points="16 7 21 12 16 17" />
              </svg>
              Projects
            </TransitionLink>
          </div>
        </div>

        {/* EXPERIENCE */}
        <section className="mb-10">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-4">
            Experience
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                  Embedded Systems & Android Development Intern
                </div>
                <div className="text-[12px] text-[var(--color-outline)] font-medium">
                  Sep 2026 – Present
                </div>
              </div>
              <div className="text-[13px] text-[var(--color-highlight)] font-medium mt-0.5 mb-2">
                Exponent Solutions
              </div>
              <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                <li className="text-[13px] text-[var(--color-outline)] flex gap-2.5 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>Developing Android applications with backend API integration.</span>
                </li>
                <li className="text-[13px] text-[var(--color-outline)] flex gap-2.5 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>Working on embedded systems, firmware, and hardware-software integration.</span>
                </li>
                <li className="text-[13px] text-[var(--color-outline)] flex gap-2.5 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>Implementing communication between microcontrollers and application backends.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="mb-10">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-4">
            Achievements
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                  Winner: GenCodeX Hackathon
                </div>
                <div className="text-[12px] text-[var(--color-outline)] font-medium">
                  Mar 2026
                </div>
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                200+ teams
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                  Finalist: Brainwave 2.0 Hackathon
                </div>
                <div className="text-[12px] text-[var(--color-outline)] font-medium">
                  Jan 2026
                </div>
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                Delhi Technological University · 800+ teams
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                  Finalist: Zinnovatio Ideathon
                </div>
                <div className="text-[12px] text-[var(--color-outline)] font-medium">
                  Oct 2026
                </div>
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                Chandigarh University · 890+ teams
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="mb-10">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-col gap-4">
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
                ESP32, ESP8266, Arduino IDE, Firmware Development, WiFi UART
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Android Development
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                Android Studio, Java, Android UI Development, API Integration
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Web & Backend
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                HTML, CSS, JavaScript, REST APIs, API integration, HTTP
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Tools
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                Git, GitHub, Android Studio, Arduino IDE
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-on-background)] mb-1">
                Core Concepts
              </div>
              <div className="text-[13px] text-[var(--color-outline)] leading-relaxed">
                Data Structures & Algorithms, OOP
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-8">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-outline)] mb-4">
            Education
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                  B.Tech in Computer Science (Data Science)
                </div>
                <div className="text-[12px] text-[var(--color-outline)] font-medium">
                  2025 – 2029
                </div>
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                Guru Gobind Singh Indraprastha University (GGSIPU)
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div className="text-[14px] font-semibold text-[var(--color-on-background)]">
                  CBSE Class XII
                </div>
                <div className="text-[12px] text-[var(--color-outline)] font-medium">
                  2025
                </div>
              </div>
              <div className="text-[12px] text-[var(--color-outline)] mt-1 font-medium">
                JNV Delhi-II
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
