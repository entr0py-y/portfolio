import Image from "next/image";
import PageShell from "@/components/PageShell";

interface PcSpec {
  label: string;
  value: string;
}

interface GearItem {
  name: string;
  detail: string;
  image: string;
  url: string;
}

interface GearCategory {
  title: string;
  jp: string;
  items: GearItem[];
}

const pcSpecs: PcSpec[] = [
  { label: "CPU", value: "Ryzen 7 9700X" },
  { label: "GPU", value: "Gigabyte RTX 5070 OC 12GB" },
  { label: "RAM", value: "32GB DDR5 7000MT/s Patriot Viper Venom" },
  { label: "Storage", value: "ADATA XPG Gammix S60 1TB Gen4" },
  { label: "Motherboard", value: "MSI B850 Gaming Pro WiFi 6E" },
  { label: "PSU", value: "MSI 850W 80+ Gold" },
];

const gearCategories: GearCategory[] = [
  {
    title: "Desk & Peripherals",
    jp: "周辺機器",
    items: [
      {
        name: "Redragon K617 Fizz",
        detail: "60% mechanical keyboard",
        image: "/gear/redragon-k617-fizz.png",
        url: "https://www.amazon.in/s?k=Redragon+K617+Fizz",
      },
      {
        name: "Redragon Predator Pro",
        detail: "Wireless gaming mouse",
        image: "/gear/redragon-predator-pro.png",
        url: "https://www.amazon.in/s?k=Redragon+Predator+Pro",
      },
      {
        name: "8BitDo Ultimate 2",
        detail: "Wireless controller · White with dock",
        image: "/gear/8bitdo-ultimate-2.jpg",
        url: "https://www.amazon.in/s?k=8BitDo+Ultimate+controller",
      },
    ],
  },
  {
    title: "Audio & Sound",
    jp: "音響",
    items: [
      {
        name: "Tangzu Wan'er SG2",
        detail: "IEMs · Red Lion Edition",
        image: "/gear/tangzu-waner.jpg",
        url: "https://www.amazon.in/s?k=Tangzu+Wan%27er+SG2",
      },
      {
        name: "Audiocular D07",
        detail: "Portable DAC",
        image: "/gear/audiocular-d07.png",
        url: "https://www.amazon.in/s?k=Audiocular+D07+DAC",
      },
      {
        name: "HyperX Cloud Stinger 2",
        detail: "Headphones",
        image: "/gear/hyperx-stinger2.jpg",
        url: "https://www.amazon.in/s?k=HyperX+Cloud+Stinger+2",
      },
      {
        name: "OnePlus Buds 4",
        detail: "Wireless earbuds",
        image: "/gear/oneplus-buds4.png",
        url: "https://www.oneplus.in/buds-4",
      },
    ],
  },
  {
    title: "Daily Tech & Mobile",
    jp: "日常機器",
    items: [
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
    ],
  },
  {
    title: "Analog & Tools",
    jp: "道具",
    items: [
      {
        name: "Pentel GraphGear 1000",
        detail: "Drafting mechanical pencil",
        image: "/gear/pentel-graphgear-1000.jpg",
        url: "https://www.amazon.in/s?k=Pentel+GraphGear+1000",
      },
    ],
  },
];

export default function GearPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>

        {/* Main Workstation */}
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[14px] font-bold text-[var(--color-on-background)] m-0">
              Main Workstation <span className="text-[var(--color-highlight)] font-normal text-[12px]">/ ワークステーション</span>
            </h2>
            <span className="text-[11px] font-mono text-[var(--color-outline)]">
              custom rig
            </span>
          </div>

          {/* Setup Photo */}
          <div className="relative w-full aspect-[16/9.5] rounded-xl overflow-hidden border-[1.5px] border-[var(--color-on-background)] mb-3.5 shadow-md bg-[#0a0a0a]">
            <Image
              src="/gear/setup.jpg"
              alt="Pushkar's PC Setup and Battlestation"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 650px"
            />
          </div>

          {/* PC Specs */}
          <div className="rounded-xl p-3.5 bg-[var(--color-surface)] border border-[var(--color-outline-variant)]">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-[560px]:grid-cols-1">
              {pcSpecs.map((spec) => (
                <div key={spec.label} className="flex items-baseline justify-between py-1 border-b border-[var(--color-outline-variant)]/40 last:border-b-0">
                  <span className="text-[11.5px] font-medium text-[var(--color-outline)] shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-[11.5px] font-semibold text-[var(--color-on-background)] opacity-90 text-right ml-3 truncate">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Segregated Gear Sections */}
        <div className="flex flex-col gap-9 mb-4">
          {gearCategories.map((category) => (
            <section key={category.title}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-[12px] font-bold text-[var(--color-on-background)] uppercase tracking-wider m-0">
                  {category.title} <span className="text-[var(--color-highlight)] font-normal text-[11px] capitalize">/ {category.jp}</span>
                </h3>
                <span className="text-[11px] text-[var(--color-outline)] font-mono">
                  {category.items.length} {category.items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 max-[560px]:grid-cols-2 max-[380px]:grid-cols-1">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] overflow-hidden smooth-card no-underline group"
                  >
                    {/* Product Image */}
                    <div className="w-full aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center p-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="eager"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {/* Info */}
                    <div className="p-2.5 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11.5px] font-semibold text-[var(--color-on-background)] truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[var(--color-outline)] opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-highlight)] transition-colors">
                          ↗
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--color-outline)] truncate">
                        {item.detail}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </PageShell>
  );
}
