"use client";

import { usePathname } from "next/navigation";

export default function BackgroundCharacter() {
  const pathname = usePathname();
  const isListenPage = pathname === "/listen";
  const isWorkPage = pathname === "/work";

  let containerClassName = "fixed bottom-[-20px] right-[-20px] w-[575px] pointer-events-none z-0 scale-x-[-1] max-[768px]:w-[130vw] max-[768px]:max-w-[550px] max-[768px]:opacity-80 max-[768px]:bottom-[-10px]";
  let imgSrc = "/character.png";
  let imgClassName = "w-full h-auto block";
  let imgOpacity = 0.12;

  if (isListenPage) {
    containerClassName = "fixed bottom-[-90px] right-[-80px] w-[575px] pointer-events-none z-0 scale-x-[-1] max-[768px]:w-[130vw] max-[768px]:max-w-[550px] max-[768px]:opacity-80 max-[768px]:bottom-[-50px] max-[768px]:right-[-50px]";
    imgSrc = "/listen.png";
    imgClassName = "w-full h-auto block bg-character-img";
    imgOpacity = 0.14;
  } else if (isWorkPage) {
    imgSrc = "/work.png";
    imgClassName = "w-full h-auto block bg-character-img";
    imgOpacity = 0.14;
  }

  return (
    <div className={containerClassName} aria-hidden="true">
      {/* Using img tag to match original behavior exactly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt=""
        className={imgClassName}
        style={{ imageRendering: "pixelated", opacity: imgOpacity }}
      />
    </div>
  );
}
