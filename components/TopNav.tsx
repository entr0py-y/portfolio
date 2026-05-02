"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function TopNav() {
  const pathname = usePathname();
  const isSubPage = pathname !== "/";
  const segment = isSubPage ? pathname.split("/").filter(Boolean)[0] : null;

  return (
    <div className="w-full max-w-none px-10 pt-10 pb-0 flex items-start justify-between z-[100] max-[768px]:px-5 max-[768px]:pt-5 absolute top-0 left-0 right-0">
      {/* Logo — left */}
      <Link
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
      </Link>

      {/* Icons — right */}
      <nav className="flex flex-col gap-2 items-end">
        {isSubPage ? (
          <Link
            href="/"
            className="flex items-center justify-center bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 hover:opacity-60"
            aria-label="Back to home"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[14px]">
              <path d="M19 12H5" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[var(--color-outline)] lowercase tracking-[0.05em] opacity-60">switch mode</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[var(--color-outline)] lowercase tracking-[0.05em] opacity-60">projects</span>
              <Link
                href="/projects"
                className="flex items-center justify-center bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 hover:opacity-60"
                aria-label="Projects"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[14px]">
                  <polyline points="8 7 3 12 8 17" />
                  <polyline points="16 7 21 12 16 17" />
                </svg>
              </Link>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[var(--color-outline)] lowercase tracking-[0.05em] opacity-60">experience</span>
              <Link
                href="/work"
                className="flex items-center justify-center bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 hover:opacity-60"
                aria-label="Work"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[14px] h-[14px]">
                  <path d="M4 7h16v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="12" y1="12" x2="12" y2="12.01" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
