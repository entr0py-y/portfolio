"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useTransition } from "react";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // Store the last touch/pointer coordinates so we can use them in the click handler.
  // On mobile, the synthetic click event can report clientX/clientY as 0,
  // but touchstart/pointerdown always have the correct coordinates.
  const lastPointerPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleTransition = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    // Prefer stored pointer/touch coordinates (always accurate on mobile),
    // then try click event coordinates, then fall back to element center.
    let x: number;
    let y: number;

    if (lastPointerPos.current) {
      x = lastPointerPos.current.x;
      y = lastPointerPos.current.y;
      lastPointerPos.current = null;
    } else if (e.clientX || e.clientY) {
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
    <Link {...props} href={href} onPointerDown={handlePointerDown} onClick={handleTransition} className={className}>
      {children}
    </Link>
  );
}
