"use client";

import { usePathname } from "next/navigation";

export default function BackgroundCharacter() {
  const pathname = usePathname();
  const isListenPage = pathname === "/listen";

  return (
    <div
      className={
        isListenPage
          ? "fixed bottom-[-90px] right-[-80px] w-[575px] pointer-events-none z-0 scale-x-[-1] max-[768px]:w-[130vw] max-[768px]:max-w-[550px] max-[768px]:opacity-80 max-[768px]:bottom-[-50px] max-[768px]:right-[-50px]"
          : "fixed bottom-[-20px] right-[-20px] w-[575px] pointer-events-none z-0 scale-x-[-1] max-[768px]:w-[130vw] max-[768px]:max-w-[550px] max-[768px]:opacity-80 max-[768px]:bottom-[-10px]"
      }
      aria-hidden="true"
    >
      {/* Using img tag to match original behavior exactly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isListenPage ? "/listen.png" : "/character.png"}
        alt=""
        className={isListenPage ? "w-full h-auto block bg-character-img" : "w-full h-auto block"}
        style={{ imageRendering: "pixelated", opacity: isListenPage ? 0.14 : 0.12 }}
      />
    </div>
  );
}
