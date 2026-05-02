import PageShell from "@/components/PageShell";

const pcSpecs = [
  { label: "CPU", value: "Ryzen 7 9700X" },
  { label: "GPU", value: "Gigabyte RTX 5070 OC 12GB" },
  { label: "RAM", value: "32GB (16x2) DDR5 7000MT/s Patriot Viper Venom" },
  { label: "Storage", value: "ADATA XPG Gammix S60 1TB Gen4" },
  { label: "Motherboard", value: "MSI B850 Gaming Pro WiFi 6E" },
  { label: "PSU", value: "MSI 850W 80+ Gold" },
];

const machines = [
  { name: "MacBook Air M1", detail: "Portable setup" },
  { name: "OnePlus Nord 5 (12/256)", detail: "Daily driver" },
];

const peripherals = [
  { name: "Redragon K617 Fizz", detail: "Keyboard" },
  { name: "Redragon Predator Pro", detail: "Mouse" },
];

const audio = [
  { name: "HyperX Cloud Stinger 2", detail: "Headphones" },
  { name: "Tangzu Wan'er SG2 Red Lion Edition", detail: "IEMs" },
  { name: "OnePlus Buds 4", detail: "Wireless" },
  { name: "Audiocular D07 DAC", detail: "DAC" },
];

export default function GearPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          What I use day to day. Nothing fancy — just what works.
        </p>

        <div className="flex flex-col gap-8">
          {/* Machine */}
          <div>
            <h3 className="text-[12px] font-semibold mb-3 text-[var(--color-outline)] uppercase tracking-wider">
              Machine
            </h3>
            <div className="flex flex-col gap-2">
              {/* Custom PC Card */}
              <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[var(--color-on-background)]">
                    Custom PC
                  </span>
                  <span className="text-[11px] text-[var(--color-outline)]">
                    Main workstation
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {pcSpecs.map((spec) => (
                    <div key={spec.label} className="flex items-baseline justify-between">
                      <span className="text-[11px] font-medium text-[var(--color-outline)]">
                        {spec.label}
                      </span>
                      <span className="text-[11px] text-[var(--color-on-background)] opacity-80 text-right ml-4">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laptop & Phone */}
              {machines.map((item) => (
                <div
                  key={item.name}
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

          {/* Peripherals */}
          <div>
            <h3 className="text-[12px] font-semibold mb-3 text-[var(--color-outline)] uppercase tracking-wider">
              Peripherals
            </h3>
            <div className="flex flex-col gap-2">
              {peripherals.map((item) => (
                <div
                  key={item.name}
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

          {/* Audio */}
          <div>
            <h3 className="text-[12px] font-semibold mb-3 text-[var(--color-outline)] uppercase tracking-wider">
              Audio
            </h3>
            <div className="flex flex-col gap-2">
              {audio.map((item) => (
                <div
                  key={item.name}
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
        </div>
      </div>
    </PageShell>
  );
}
