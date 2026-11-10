"use client";

import Link, { LinkProps } from "next/link";
import React, { useCallback, useEffect } from "react";

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
  useEffect(() => {
    ensureListeners();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    // Use the globally captured pointer coordinates.
    const x = lastX || e.clientX;
    const y = lastY || e.clientY;

    // Set the click coordinates as CSS custom properties on the root element.
    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);
  }, [onClick]);

  return (
    <Link {...props} href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
