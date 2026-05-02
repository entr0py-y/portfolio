import PageShell from "@/components/PageShell";

const gearItems = [
  {
    category: "Machine",
    items: [
      { name: "—", detail: "add your laptop/desktop" },
    ],
  },
  {
    category: "Peripherals",
    items: [
      { name: "—", detail: "add your keyboard" },
      { name: "—", detail: "add your mouse" },
      { name: "—", detail: "add your headphones" },
    ],
  },
  {
    category: "Software",
    items: [
      { name: "VS Code", detail: "editor" },
      { name: "—", detail: "add your terminal" },
      { name: "—", detail: "add your browser" },
    ],
  },
];

export default function GearPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          What I use day to day. Nothing fancy — just what works.
        </p>

        <div className="flex flex-col gap-8">
          {gearItems.map((section) => (
            <div key={section.category}>
              <h3 className="text-[12px] font-semibold mb-3 text-[var(--color-outline)] uppercase tracking-wider">
                {section.category}
              </h3>
              <div className="flex flex-col gap-2">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01]"
                  >
                    <span className="text-[13px] font-semibold text-[var(--color-on-background)]">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[var(--color-outline)]">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[var(--color-outline)] mt-8 italic">
          update this list with your actual gear.
        </p>
      </div>
    </PageShell>
  );
}
