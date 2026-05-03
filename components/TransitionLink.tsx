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

    const x = e.clientX;
    const y = e.clientY;

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
          // Since startTransition doesn't await the actual React commit natively,
          // a short timeout ensures the new page has at least started rendering.
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
