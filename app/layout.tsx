import type { Metadata } from "next";
import { Epilogue, Manrope, Caveat } from "next/font/google";
import TopNav from "@/components/TopNav";
import BackgroundCharacter from "@/components/BackgroundCharacter";
import Preloader from "@/components/Preloader";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-epilogue",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quiet Space — Pushkar Jha",
  description:
    "Personal portfolio of Pushkar Jha — a first-year CS student and software developer building clean, scalable applications.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark-mode');
                  } else {
                    document.documentElement.classList.remove('dark-mode');
                  }

                  if (sessionStorage.getItem('portfolio_entered') === 'true') {
                    document.documentElement.classList.add('has-entered');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Preloader />
        <BackgroundCharacter />
        <TopNav />
        {children}
      </body>
    </html>
  );
}
