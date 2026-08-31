"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useTransition } from "react";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const lastTouchPos = useRef<{ x: number; y: number } | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Attach a native touchstart listener directly to the DOM element.
  // This is the most reliable way to capture touch coordinates on mobile,
  // since React synthetic events and Next.js Link can sometimes swallow
  // or misreport coordinates from touch-originated click events.
  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => el.removeEventListener("touchstart", onTouchStart);
  }, []);

  const handleTransition = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    // Priority: stored touch coords > click event coords > element center
    let x: number;
    let y: number;

    if (lastTouchPos.current) {
      x = lastTouchPos.current.x;
      y = lastTouchPos.current.y;
      lastTouchPos.current = null;
    } else if (e.clientX !== 0 || e.clientY !== 0) {
      x = e.clientX;
      y = e.clientY;
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

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
    <Link {...props} href={href} ref={linkRef} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
}
