"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function TopNav() {
  const pathname = usePathname();
  const isSubPage = pathname !== "/";

  return (
    <>
      <div className="fixed top-24 left-10 flex items-center gap-0 text-[18px] font-medium z-[100] max-[768px]:top-16 max-[768px]:left-5" style={{ fontFamily: "var(--font-body)" }}>
        <span className="text-[#aa8970]">sylk</span>
        <span className="opacity-30">.monster</span>
        {pathname !== "/" && (
          <span className="opacity-30">{pathname}</span>
        )}
      </div>
      <nav className="fixed top-10 right-10 flex gap-3 z-[100] max-[768px]:top-5 max-[768px]:right-5">
      {isSubPage && (
        <Link
          href="/"
          className="flex items-center justify-center border-[1.5px] border-[var(--color-on-background)] rounded-[4px] p-1.5 bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 hover:opacity-60"
          aria-label="Back to home"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px]">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
      )}
      <Link
        href="/"
        className="flex items-center justify-center border-[1.5px] border-[var(--color-on-background)] rounded-[4px] p-1.5 bg-transparent cursor-pointer text-[var(--color-on-background)] no-underline transition-opacity duration-200 hover:opacity-60"
        aria-label="Portfolio"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px]">
          <path d="M4 7h16v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="12.01" />
        </svg>
      </Link>
      <button
        className="flex items-center justify-center border-[1.5px] border-[var(--color-on-background)] rounded-[4px] p-1.5 bg-transparent cursor-pointer text-[var(--color-on-background)] transition-opacity duration-200 hover:opacity-60"
        aria-label="Code"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[18px] h-[18px]">
          <polyline points="8 7 3 12 8 17" />
          <polyline points="16 7 21 12 16 17" />
        </svg>
      </button>
      <ThemeToggle />
      </nav>
    </>
  );
}
