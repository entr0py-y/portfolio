"use client";

import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function TopNav() {
  const pathname = usePathname();
  const isSubPage = pathname !== "/";
  const segment = isSubPage ? pathname.split("/").filter(Boolean)[0] : null;
  const [hovered, setHovered] = useState<"work" | "project" | null>(null);

  return (
    <div className="w-full max-w-none px-10 pt-10 pb-0 flex items-start justify-between z-[100] max-[768px]:px-5 max-[768px]:pt-5 absolute top-0 left-0 right-0">
      {/* Logo — left */}
      <TransitionLink
        href="/"
        className="no-underline"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <span className="text-[21px] font-semibold leading-none">
          <span className="text-[#aa8970]">sylk</span>
          <span className="text-[var(--color-on-background)]">.monster</span>
          {segment && (
            <span className="text-[#aa8970]">/{segment}</span>
          )}
        </span>
      </TransitionLink>

      {/* Icons & Stacked Labels — right */}
      <nav className="flex flex-col items-end">
        {isSubPage ? (
          <div className="flex gap-4 items-center">
            <TransitionLink
              href="/"
              className="flex items-center justify-center bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 hover:opacity-60"
              aria-label="Back to home"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[17px] h-[17px]">
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </TransitionLink>
            <ThemeToggle />
          </div>
        ) : (
          <div className="relative w-[83px] flex flex-col items-end">
            {/* Row 1: The 3 compact symbols pinned to the right edge */}
            <div className="flex gap-4 items-center w-[83px] justify-between">
              <div className="flex items-center justify-center w-[17px] h-[17px]">
                <ThemeToggle />
              </div>

              <TransitionLink
                href="/projects"
                className={`flex items-center justify-center w-[17px] h-[17px] bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 ${
                  hovered === "project" ? "opacity-60" : "hover:opacity-60"
                }`}
                aria-label="Projects"
                onMouseEnter={() => setHovered("project")}
                onMouseLeave={() => setHovered(null)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[17px] h-[17px]">
                  <polyline points="8 7 3 12 8 17" />
                  <polyline points="16 7 21 12 16 17" />
                </svg>
              </TransitionLink>

              <TransitionLink
                href="/work"
                className={`flex items-center justify-center w-[17px] h-[17px] bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 ${
                  hovered === "work" ? "opacity-60" : "hover:opacity-60"
                }`}
                aria-label="Work"
                onMouseEnter={() => setHovered("work")}
                onMouseLeave={() => setHovered(null)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[17px] h-[17px]">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="12" y1="14" x2="12" y2="14.01" />
                </svg>
              </TransitionLink>
            </div>

            {/* Stacked words & connecting lines */}
            <div className="relative w-[83px] h-[52px]">
              {/* Connector lines SVG */}
              <svg
                width="83"
                height="52"
                viewBox="0 0 83 52"
                fill="none"
                className="absolute top-0 left-0 pointer-events-none"
              >
                {/* Straight vertical line with equal top & bottom gap */}
                <line
                  x1="41.5"
                  y1="1"
                  x2="41.5"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className={`transition-colors duration-200 ${
                    hovered === "project"
                      ? "text-[var(--color-on-background)]"
                      : "text-[var(--color-outline)]"
                  }`}
                />
                {/* Line from Briefcase leading horizontally left to the side of 'work' */}
                <path
                  d="M 74.5 3.8 V 36 Q 74.5 41 69.5 41 H 65"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-colors duration-200 ${
                    hovered === "work"
                      ? "text-[var(--color-on-background)]"
                      : "text-[var(--color-outline)]"
                  }`}
                />
              </svg>

              {/* Slot 1: projects (centered under straight line at 'e') */}
              <div
                className="absolute left-0 w-full flex items-center pl-[22px] z-10"
                style={{ top: "21px", transform: "translateY(-50%)" }}
              >
                <TransitionLink
                  href="/projects"
                  className={`text-[10.5px] font-medium tracking-wide lowercase no-underline select-none transition-colors duration-200 leading-none ${
                    hovered === "project"
                      ? "text-[var(--color-on-background)]"
                      : "text-[var(--color-outline)] hover:text-[var(--color-on-background)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  onMouseEnter={() => setHovered("project")}
                  onMouseLeave={() => setHovered(null)}
                >
                  projects
                </TransitionLink>
              </div>

              {/* Slot 2: work (shortened line, positioned right below projects) */}
              <div
                className="absolute z-10 flex items-center"
                style={{
                  top: "41px",
                  transform: "translateY(-50%)",
                  right: "22px",
                }}
              >
                <TransitionLink
                  href="/work"
                  className={`text-[10.5px] font-medium tracking-wide lowercase no-underline select-none transition-colors duration-200 leading-none ${
                    hovered === "work"
                      ? "text-[var(--color-on-background)]"
                      : "text-[var(--color-outline)] hover:text-[var(--color-on-background)]"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  onMouseEnter={() => setHovered("work")}
                  onMouseLeave={() => setHovered(null)}
                >
                  work
                </TransitionLink>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
