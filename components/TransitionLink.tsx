"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useTransition } from "react";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

// Store the last interaction coordinates globally.
// Both touchstart and pointerdown fire before click and always have correct coordinates.
let lastX = 0;
let lastY = 0;
let listenerAttached = false;

function ensureListeners() {
  if (listenerAttached || typeof window === "undefined") return;
  listenerAttached = true;
  document.addEventListener("pointerdown", (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
  }, { passive: true });
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    ensureListeners();
  }, []);

  const handleTransition = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    // Use the globally captured pointer coordinates (reliable on both desktop and mobile).
    // Fall back to click event coords if pointerdown hasn't fired yet (shouldn't happen).
    const x = lastX || e.clientX;
    const y = lastY || e.clientY;

    // Set the click coordinates as CSS custom properties on the root element.
    // The view transition CSS will use these to position the clip-path circle.
    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);

    startTransition(() => {
      router.push(href.toString());
    });
  }, [href, router, onClick, startTransition]);

  return (
    <Link {...props} href={href} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
}
