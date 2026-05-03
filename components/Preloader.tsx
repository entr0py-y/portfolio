"use client";

import { useState, useEffect } from "react";

const ASSETS_TO_PRELOAD = [
  "/listen.png",
  "/character.png",
  "/signature.png",
  "/work.png",
  "/gear/audiocular-d07.png",
  "/gear/macbook-air-m1.jpg",
  "/gear/oneplus-nord5.png",
  "/gear/hyperx-stinger2.jpg",
  "/gear/oneplus-buds4.png",
  "/gear/tangzu-waner.jpg",
  "/sketch/sketch1.png",
  "/sketch/sketch2.jpeg",
  "/sketch/sketch3.jpeg",
  "/sketch/sketch4.jpeg",
  "/sketch/sketch5.jpeg",
  "/sketch/sketch6.jpeg",
  "/sketch/sketch7.jpeg",
  "/sketch/sketch8.jpeg",
  "https://is1-ssl.mzstatic.com/image/thumb/SG-MQ-US-001-Image000001/v4/b2/e1/7b/b2e17b53-344a-8e14-d0bc-5d8835c2c00c/image/400x400cc.jpg"
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(true); // Default to true for SSR mismatch prevention
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if already entered in this session
    const sessionEntered = sessionStorage.getItem("portfolio_entered");
    if (sessionEntered === "true") {
      setHasEntered(true);
      return;
    }

    setHasEntered(false); // We need to show the preloader

    let loadedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;

    if (totalAssets === 0) {
      setProgress(100);
      setIsLoaded(true);
      return;
    }

    const loadImages = async () => {
      const promises = ASSETS_TO_PRELOAD.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            setProgress((loadedCount / totalAssets) * 100);
            resolve();
          };
          img.onerror = () => {
            // Even if an image fails, we must increment so we don't get stuck
            loadedCount++;
            setProgress((loadedCount / totalAssets) * 100);
            resolve();
          };
        });
      });

      await Promise.all(promises);
      
      // Ensure the progress bar visually completes before showing the button
      setTimeout(() => {
        setIsLoaded(true);
      }, 400); 
    };

    loadImages();
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      sessionStorage.setItem("portfolio_entered", "true");
      setHasEntered(true);
    }, 600); // Wait for fade out animation
  };

  if (hasEntered) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[var(--color-background)] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="w-[200px] max-w-[80vw] flex flex-col items-center gap-3">
        {/* Loading Line */}
        <div className="w-full h-[1px] bg-[var(--color-outline-variant)] relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[var(--color-on-background)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Enter Text */}
        <div className="h-[20px] flex items-center justify-center overflow-hidden">
          <button 
            onClick={handleEnter}
            className={`
              bg-transparent border-none cursor-pointer p-0 text-[10px] font-bold tracking-widest uppercase text-[var(--color-on-background)]
              transition-all duration-500 hover:text-[var(--color-highlight)]
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px] pointer-events-none"}
            `}
            style={{ fontFamily: "var(--font-body)" }}
          >
            enter portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
