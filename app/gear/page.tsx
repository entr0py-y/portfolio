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
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=400&hei=400&fmt=jpeg",
    url: "https://www.amazon.in/s?k=MacBook+Air+M1",
  },
  {
    name: "OnePlus Nord 5",
    detail: "Daily driver · 12/256",
    image: "https://image01.oneplus.net/ebp/202504/28/1-m00-71-75-ckvxbl0wfniaa3x5aafabamz5ee406.png",
    url: "https://www.amazon.in/s?k=OnePlus+Nord+5",
  },
  {
    name: "Redragon K617 Fizz",
    detail: "Keyboard",
    image: "https://redragonshop.com/cdn/shop/files/K617-RGB_01.jpg?v=1695289038&width=400",
    url: "https://www.amazon.in/s?k=Redragon+K617+Fizz",
  },
  {
    name: "Redragon Predator Pro",
    detail: "Mouse",
    image: "https://redragonshop.com/cdn/shop/files/M612-Predator-Pro_03.jpg?v=1721633753&width=400",
    url: "https://www.amazon.in/s?k=Redragon+Predator+Pro",
  },
  {
    name: "HyperX Cloud Stinger 2",
    detail: "Headphones",
    image: "https://hyperx.com/cdn/shop/files/hyperx_cloud_stinger_2_1_main.jpg?v=1694551462&width=400",
    url: "https://www.amazon.in/s?k=HyperX+Cloud+Stinger+2",
  },
  {
    name: "Tangzu Wan'er SG2",
    detail: "IEMs · Red Lion Edition",
    image: "https://m.media-amazon.com/images/I/61YwGm9PXCL._SL1500_.jpg",
    url: "https://www.amazon.in/s?k=Tangzu+Wan%27er+SG2+Red+Lion",
  },
  {
    name: "OnePlus Buds 4",
    detail: "Wireless earbuds",
    image: "https://image01.oneplus.net/ebp/202502/20/1-m00-58-e9-ckvxbl0e_dqaet0faai0-ahfkam860.png",
    url: "https://www.amazon.in/s?k=OnePlus+Buds+4",
  },
  {
    name: "Audiocular D07",
    detail: "Portable DAC",
    image: "https://m.media-amazon.com/images/I/51gXKqVfURL._SL1500_.jpg",
    url: "https://www.amazon.in/s?k=Audiocular+D07+DAC",
  },
];

export default function GearPage() {
  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>

        {/* Custom PC Build */}
        <div className="mb-8">
          <h3 className="text-[12px] font-semibold mb-3 text-[var(--color-outline)] uppercase tracking-wider">
            Workstation
          </h3>
          <div className="p-4 rounded-xl bg-[var(--color-surface)] border-[1.5px] border-[var(--color-on-background)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01]">
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
