"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteLogo() {
  const pathname = usePathname();

  // Get the current route segment (e.g. "/playing" -> "playing")
  const segment = pathname === "/" ? null : pathname.split("/").filter(Boolean)[0];

  return (
    <Link
      href="/"
      className="fixed top-10 left-10 z-[100] no-underline max-[768px]:top-5 max-[768px]:left-5"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <span className="text-[26px] font-semibold leading-none">
        <span className="text-[#44372d]">sylk</span>
        <span className="text-[var(--color-on-background)]">.monster</span>
        {segment && (
          <span className="text-[var(--color-on-background)]">/{segment}</span>
        )}
      </span>
    </Link>
  );
}
