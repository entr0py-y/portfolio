import type { Metadata } from "next";
import { Epilogue, Manrope, Caveat } from "next/font/google";
import TopNav from "@/components/TopNav";
import BackgroundCharacter from "@/components/BackgroundCharacter";
import Preloader from "@/components/Preloader";
import { SwarmRebuild } from "@/components/swarm-rebuild";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quiet Space",
  description:
    "Personal portfolio of Pushkar Jha — a second-year CS student and software developer building clean, scalable applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${manrope.variable} ${caveat.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html:not(.swarm-ready) body {
                opacity: 0 !important;
                visibility: hidden !important;
              }
              html.swarm-navigating body {
                opacity: 0 !important;
                visibility: hidden !important;
              }
              #pre-veil {
                position: fixed;
                inset: 0;
                background-color: #fdfdfb;
                z-index: 2147483640;
                pointer-events: none;
              }
              html.dark-mode #pre-veil {
                background-color: #121212;
              }
              html.swarm-ready #pre-veil {
                display: none !important;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved === 'dark';
                  if (isDark) {
                    document.documentElement.classList.add('dark-mode');
                  } else {
                    document.documentElement.classList.remove('dark-mode');
                  }

                  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    document.documentElement.classList.add('swarm-ready');
                  }

                  setTimeout(function() {
                    document.documentElement.classList.add('swarm-ready');
                  }, 2500);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div id="pre-veil" aria-hidden="true" />
        <Preloader />
        <SwarmRebuild />
        <BackgroundCharacter />
        <TopNav />
        {children}
      </body>
    </html>
  );
}
