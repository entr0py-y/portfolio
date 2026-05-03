export default function BackgroundCharacter() {
  return (
    <div
      className="fixed bottom-[-60px] right-[-50px] w-[575px] pointer-events-none z-0 scale-x-[-1] max-[768px]:w-[130vw] max-[768px]:max-w-[550px] max-[768px]:opacity-80 max-[768px]:bottom-[-30px] max-[768px]:right-[-30px]"
      aria-hidden="true"
    >
      {/* Using img tag to match original behavior exactly */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/listen.png"
        alt=""
        className="w-full h-auto block bg-character-img"
        style={{ imageRendering: "pixelated", opacity: 0.14 }}
      />
    </div>
  );
}
