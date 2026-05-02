import Link from "next/link";

interface PageShellProps {
  title: string;
  children: React.ReactNode;
}

export default function PageShell({ title, children }: PageShellProps) {
  return (
    <div className="w-full max-w-[650px] px-10 pt-10 pb-15 relative flex flex-col min-h-screen box-border z-[1] max-[768px]:px-5 max-[768px]:pt-4">
      {/* Breadcrumb */}
      <div className="mb-8 fade-in" style={{ fontFamily: "var(--font-body)" }}>
        <span className="text-[12px] tracking-wide text-[var(--color-outline)]">
          <Link href="/" className="text-[var(--color-outline)] no-underline hover:text-[var(--color-on-background)] transition-colors duration-200">
            Pushkar
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-[var(--color-on-background)]">{title}</span>
        </span>
      </div>

      {/* Title */}
      <h1
        className="text-[24px] font-normal m-0 mb-6 leading-none fade-in fade-in-delay-1"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {title}
      </h1>

      {/* Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <footer
        className="text-[12px] font-semibold mt-auto pt-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <p>© 2026 Pushkar Jha</p>
      </footer>
    </div>
  );
}
