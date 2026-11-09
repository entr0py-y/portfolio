import Link from "next/link";

interface PageShellProps {
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export default function PageShell({
  title,
  children,
  maxWidth = "max-w-[650px]",
  className = "",
}: PageShellProps) {
  return (
    <div
      className={`w-full ${maxWidth} px-10 pt-20 pb-6 relative flex flex-col min-h-screen box-border z-[1] max-[768px]:px-5 max-[768px]:pt-16 max-[768px]:pb-4 ${className}`}
    >
      {/* Title */}
      {title && (
        <h1
          className="text-[24px] font-normal m-0 mb-6 leading-none fade-in fade-in-delay-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {title}
        </h1>
      )}

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <footer
        className="text-[12px] font-semibold mt-2"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <p>© 2026 Pushkar Jha</p>
      </footer>
    </div>
  );
}
