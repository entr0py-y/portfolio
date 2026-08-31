"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useTransition } from "react";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

// Global touch coordinate tracker — captures every touch on the page.
// This is far more reliable than per-element listeners because it doesn't
// depend on ref forwarding, event propagation, or React synthetic events.
let lastTouchX = 0;
let lastTouchY = 0;
let touchListenerAttached = false;

function ensureTouchListener() {
  if (touchListenerAttached || typeof window === "undefined") return;
  touchListenerAttached = true;
  document.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      if (touch) {
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;
      }
    },
    { passive: true }
  );
  // Also capture pointerdown for devices that use Pointer Events
  document.addEventListener(
    "pointerdown",
    (e) => {
      lastTouchX = e.clientX;
      lastTouchY = e.clientY;
    },
    { passive: true }
  );
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    ensureTouchListener();
  }, []);

  const handleTransition = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    // Use click event coords if available (desktop), otherwise fall back
    // to the globally captured touch/pointer coords (mobile).
    const x = (e.clientX !== 0 || e.clientY !== 0) ? e.clientX : lastTouchX;
    const y = (e.clientX !== 0 || e.clientY !== 0) ? e.clientY : lastTouchY;

    const doc = document as any;
    if (!doc.startViewTransition) {
      startTransition(() => {
        router.push(href.toString());
      });
      return;
    }

    const transition = doc.startViewTransition(() => {
      return new Promise<void>((resolve) => {
        startTransition(() => {
          router.push(href.toString());
          setTimeout(resolve, 50);
        });
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(150% at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1400,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, [href, router, onClick]);

  return (
    <Link {...props} href={href} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
}
