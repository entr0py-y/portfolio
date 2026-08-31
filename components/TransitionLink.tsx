"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const handleTransition = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const doc = document as any;
    if (!doc.startViewTransition) {
      startTransition(() => {
        router.push(href.toString());
      });
      return;
    }

    const transition = doc.startViewTransition(async () => {
      startTransition(() => {
        router.push(href.toString());
      });
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    transition.ready.then(() => {
      const right = window.innerWidth - x;
      const bottom = window.innerHeight - y;
      const maxRadius = Math.hypot(
        Math.max(x, right),
        Math.max(y, bottom)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1400,
          easing: "linear",
          pseudoElement: "::view-transition-new(root)",
          fill: "forwards",
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
