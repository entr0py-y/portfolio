"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Every image used across ALL pages ─── */
const IMAGES_TO_PRELOAD = [
  // Home page
  "/character.png",
  "/signature.png",
  "https://is1-ssl.mzstatic.com/image/thumb/SG-MQ-US-001-Image000001/v4/b2/e1/7b/b2e17b53-344a-8e14-d0bc-5d8835c2c00c/image/400x400cc.jpg",
  // Listen page
  "/listen.png",
  // Work / Projects page
  "/work.png",
  // Gear page
  "/gear/audiocular-d07.png",
  "/gear/macbook-air-m1.jpg",
  "/gear/oneplus-nord5.png",
  "/gear/hyperx-stinger2.jpg",
  "/gear/oneplus-buds4.png",
  "/gear/tangzu-waner.jpg",
  // Sketch page
  "/sketch/sketch1.png",
  "/sketch/sketch2.jpeg",
  "/sketch/sketch3.jpeg",
  "/sketch/sketch4.jpeg",
  "/sketch/sketch5.jpeg",
  "/sketch/sketch6.jpeg",
  "/sketch/sketch7.jpeg",
  "/sketch/sketch8.jpeg",
  // SVG
  "/spider-mask.svg",
];

/* ─── All internal routes to prefetch ─── */
const ROUTES_TO_PREFETCH = [
  "/listen",
  "/play",
  "/sketch",
  "/gear",
  "/work",
  "/projects",
];

/* ─── Font files to ensure are loaded ─── */
function waitForFonts(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  return document.fonts.ready.then(() => {});
}

/* ─── Preload a single image ─── */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't block on failures
  });
}

/* ─── Prefetch a route (fetches the HTML so Next.js caches it) ─── */
function prefetchRoute(path: string): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    link.as = "document";
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
    // Safety timeout — don't hang if prefetch stalls
    setTimeout(resolve, 8000);
  });
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hasEntered, setHasEntered] = useState(true); // SSR default
  const [isFadingOut, setIsFadingOut] = useState(false);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const sessionEntered = sessionStorage.getItem("portfolio_entered");
    if (sessionEntered === "true") {
      setHasEntered(true);
      return;
    }

    setHasEntered(false);
    startTimeRef.current = Date.now();

    let loadedCount = 0;

    const totalTasks =
      IMAGES_TO_PRELOAD.length +
      ROUTES_TO_PREFETCH.length +
      1 /* fonts */ +
      1; /* document ready */

    const tick = () => {
      loadedCount++;
      setProgress((loadedCount / totalTasks) * 100);
    };

    const finishLoading = () => {
      setProgress(100);
      // Ensure a minimum 800ms display so the bar doesn't flash
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 800 - elapsed);

      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          sessionStorage.setItem("portfolio_entered", "true");
          setHasEntered(true);
        }, 600);
      }, remaining);
    };

    const run = async () => {
      // 1. Preload all images in parallel
      const imagePromises = IMAGES_TO_PRELOAD.map((src) =>
        preloadImage(src).then(tick)
      );

      // 2. Prefetch all routes in parallel
      const routePromises = ROUTES_TO_PREFETCH.map((route) =>
        prefetchRoute(route).then(tick)
      );

      // 3. Wait for fonts
      const fontPromise = waitForFonts().then(tick);

      // 4. Wait for document to be fully interactive
      const docPromise = new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", () => resolve(), { once: true });
        }
      }).then(tick);

      await Promise.all([
        ...imagePromises,
        ...routePromises,
        fontPromise,
        docPromise,
      ]);

      finishLoading();
    };

    run();
  }, []);

  if (hasEntered) return null;

  return (
    <div
      className={`preloader-overlay ${isFadingOut ? "preloader-fadeout" : ""}`}
    >
      <div className="preloader-bar-container">
        <div className="preloader-bar-track">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
