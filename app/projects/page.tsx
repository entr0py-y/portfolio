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
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <h2 className="text-[20px] font-bold text-[var(--color-on-background)] m-0">
                Vision-Aid
              </h2>
              <a
                href="https://github.com/entr0py-y/VisionAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[var(--color-highlight)] hover:underline flex items-center gap-1 font-medium"
              >
                GitHub Repo ↗
              </a>
            </div>
            <div className="text-[13px] text-[var(--color-outline)] font-medium mb-2">
              Assistive System for Visually Impaired · Feb 2026 – Jul 2026
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--color-on-background)] mb-3">
              An assistive IoT solution combining wearable ESP32 microcontrollers with real-time computer vision to empower visually impaired individuals.
            </p>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
              {[
                "Developed an Android assistive app integrating ESP32-based hardware and real-time sensor data",
                "Integrated YOLO-based detection and SOS emergency alert system",
                "Built Wi-Fi communication pipeline connecting embedded hardware with backend APIs",
                "Implemented voice feedback and emergency assistance features for accessibility"
              ].map((detail, idx) => (
                <li key={idx} className="text-[13px] text-[var(--color-outline)] flex gap-3 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* PROJECT 2: Encrypt-Plus */}
          <section>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <h2 className="text-[20px] font-bold text-[var(--color-on-background)] m-0">
                Encrypt-Plus
              </h2>
              <a
                href="https://github.com/entr0py-y/EncryptPlus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[var(--color-highlight)] hover:underline flex items-center gap-1 font-medium"
              >
                GitHub Repo ↗
              </a>
            </div>
            <div className="text-[13px] text-[var(--color-outline)] font-medium mb-2">
              Cryptographic Security & Quantum Readiness Analyzer · Feb 2026 – Apr 2026
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--color-on-background)] mb-3">
              A developer security analysis tool designed to audit repositories and evaluate cryptographic algorithms for post-quantum vulnerability.
            </p>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
              {[
                "Developed a cryptographic security analyzer for repositories and codebases",
                "Implemented quantum-readiness assessment for cryptographic algorithms",
                "Generated reports to track cryptographic security findings",
                "Automated vulnerability detection and security risk analysis"
              ].map((detail, idx) => (
                <li key={idx} className="text-[13px] text-[var(--color-outline)] flex gap-3 items-start leading-relaxed">
                  <span className="text-[var(--color-highlight)] mt-[6px] text-[8px] flex-shrink-0">●</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* PROJECT 3: Copify */}
          <section>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <h2 className="text-[20px] font-bold text-[var(--color-on-background)] m-0">
                Copify
              </h2>
              <a
                href="https://github.com/entr0py-y/copify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[var(--color-highlight)] hover:underline flex items-center gap-1 font-medium"
              >
                GitHub Repo ↗
              </a>
            </div>
            <div className="text-[13px] text-[var(--color-outline)] font-medium mb-2">
              Web-Based File & Text Transfer Platform · Feb 2026 – Jul 2026
            </div>
            <p className="text-[14px] leading-[1.6] text-[var(--color-on-background)] mb-3">
              A cloud-synchronized file and text clipboard transfer application engineered for fast, frictionless cross-device sharing.
            </p>
            <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
              {[
                "Developed a responsive text transfer web application using Next.js and React",
                "Integrated Supabase for backend services and data management",
                "Implemented file transfer workflows using Next.js API routes",
                "Configured application deployment on Render with environment-based setup"
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
