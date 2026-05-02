import PageShell from "@/components/PageShell";

const pcSpecs = [
  { label: "CPU", value: "Ryzen 7 9700X" },
  { label: "GPU", value: "Gigabyte RTX 5070 OC 12GB" },
  { label: "RAM", value: "32GB DDR5 7000MT/s Patriot Viper Venom" },
  { label: "Storage", value: "ADATA XPG Gammix S60 1TB Gen4" },
  { label: "Motherboard", value: "MSI B850 Gaming Pro WiFi 6E" },
  { label: "PSU", value: "MSI 850W 80+ Gold" },
];

const gearItems = [
  {
    name: "MacBook Air M1",
    detail: "Portable setup",
    image: "/gear/macbook-air-m1.jpg",
    url: "https://www.amazon.in/s?k=MacBook+Air+M1",
  },
  {
    name: "OnePlus Nord 5",
    detail: "Daily driver · 12/256",
    image: "/gear/oneplus-nord5.png",
    url: "https://www.oneplus.in/nord-5",
  },
  {
    name: "HyperX Cloud Stinger 2",
    detail: "Headphones",
    image: "/gear/hyperx-stinger2.jpg",
    url: "https://www.amazon.in/s?k=HyperX+Cloud+Stinger+2",
  },
  {
    name: "Tangzu Wan'er SG2",
    detail: "IEMs · Red Lion Edition",
    image: "/gear/tangzu-waner.jpg",
    url: "https://www.amazon.in/s?k=Tangzu+Wan%27er+SG2",
  },
  {
    name: "OnePlus Buds 4",
    detail: "Wireless earbuds",
    image: "/gear/oneplus-buds4.png",
    url: "https://www.oneplus.in/buds-4",
  },
  {
    name: "Audiocular D07",
    detail: "Portable DAC",
    image: "/gear/audiocular-d07.png",
    url: "https://www.amazon.in/s?k=Audiocular+D07+DAC",
  },
];

export default function GearPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>

        {/* Main Workstation */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-bold text-[var(--color-on-background)]">
              Main Workstation
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {pcSpecs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between">
                <span className="text-[12px] font-medium text-[var(--color-outline)]">
                  {spec.label}
                </span>
                <span className="text-[12px] text-[var(--color-on-background)] opacity-80 text-right ml-4">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gear Grid */}
        <div className="mb-8">
          <h3 className="text-[12px] font-semibold mb-3 text-[var(--color-outline)] uppercase tracking-wider">
            Gear
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {gearItems.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] no-underline"
              >
                {/* Product Image */}
                <div className="w-full aspect-square bg-[#1a1a1a] flex items-center justify-center p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <div className="p-3 flex flex-col gap-0.5">
                  <span className="text-[12px] font-semibold text-[var(--color-on-background)] truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[var(--color-outline)]">
                    {item.detail}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </PageShell>
  );
}
