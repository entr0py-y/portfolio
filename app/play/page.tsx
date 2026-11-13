"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageShell from "@/components/PageShell";

interface SteamGame {
  appid: number;
  name: string;
  imageUrl: string;
  iconUrl?: string;
  playtimeThisWeek?: number;
  playtimeTotal: number;
}

interface SteamData {
  totalGames: number;
  totalPlaytimeHours: number;
  recentlyPlayed: SteamGame[];
  library: SteamGame[];
}

const FALLBACK_DATA: SteamData = {
  totalGames: 42,
  totalPlaytimeHours: 856,
  recentlyPlayed: [
    {
      appid: 1245620,
      name: "ELDEN RING",
      imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
      playtimeThisWeek: 12.4,
      playtimeTotal: 184,
    },
    {
      appid: 1687950,
      name: "Persona 5 Royal",
      imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/capsule_616x353.jpg",
      playtimeThisWeek: 6.2,
      playtimeTotal: 138,
    },
    {
      appid: 524220,
      name: "NieR:Automata",
      imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/524220/capsule_616x353.jpg",
      playtimeThisWeek: 3.5,
      playtimeTotal: 92,
    },
  ],
  library: [
    { appid: 1245620, name: "ELDEN RING", imageUrl: "", playtimeTotal: 184 },
    { appid: 1687950, name: "Persona 5 Royal", imageUrl: "", playtimeTotal: 138 },
    { appid: 1091500, name: "Cyberpunk 2077", imageUrl: "", playtimeTotal: 112 },
    { appid: 524220, name: "NieR:Automata", imageUrl: "", playtimeTotal: 92 },
    { appid: 814380, name: "Sekiro: Shadows Die Twice", imageUrl: "", playtimeTotal: 86 },
    { appid: 367520, name: "Hollow Knight", imageUrl: "", playtimeTotal: 74 },
    { appid: 1145360, name: "Hades", imageUrl: "", playtimeTotal: 68 },
    { appid: 1462040, name: "FINAL FANTASY VII REMAKE INTERGRADE", imageUrl: "", playtimeTotal: 62 },
    { appid: 1086940, name: "Baldur's Gate 3", imageUrl: "", playtimeTotal: 58 },
    { appid: 582010, name: "Monster Hunter: World", imageUrl: "", playtimeTotal: 54 },
    { appid: 1627720, name: "Lies of P", imageUrl: "", playtimeTotal: 46 },
    { appid: 1150690, name: "OMORI", imageUrl: "", playtimeTotal: 38 },
  ],
};

function GameImage({ game, sizes, className }: { game: SteamGame; sizes: string; className?: string }) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error && game.iconUrl ? game.iconUrl : game.imageUrl}
      alt={game.name}
      fill
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
      unoptimized
    />
  );
}

export default function PlayingPage() {
  const [data, setData] = useState<SteamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/steam")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch Steam data");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        // Fallback gracefully so page remains functional and attractive
        setData(FALLBACK_DATA);
        setLoading(false);
      });
  }, []);

  const displayData = data || FALLBACK_DATA;
  const recentGames = displayData.recentlyPlayed.slice(0, 3);
  const visibleLibrary = showAll ? displayData.library : displayData.library.slice(0, 10);
  const hasMore = displayData.library.length > 10;

  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        {/* Description & Minimal Stats */}
        <div className="flex flex-col gap-3 mb-7">
          <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] m-0">
            Big fan of story-driven games and JRPGs.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {loading ? (
              <>
                <div className="skeleton w-[95px] h-[26px] rounded-full" />
                <div className="skeleton w-[130px] h-[26px] rounded-full" />
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium bg-[var(--color-surface)] border border-[var(--color-outline-variant)] text-[var(--color-on-background)]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <line x1="6" x2="10" y1="12" y2="12" />
                    <line x1="8" x2="8" y1="10" y2="14" />
                    <line x1="15" x2="15.01" y1="13" y2="13" />
                    <line x1="18" x2="18.01" y1="11" y2="11" />
                    <rect width="20" height="12" x="2" y="6" rx="2" />
                  </svg>
                  {displayData.totalGames} games
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium bg-[var(--color-surface)] border border-[var(--color-outline-variant)] text-[var(--color-on-background)]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {displayData.totalPlaytimeHours.toLocaleString()} hrs on Steam
                </span>
              </>
            )}
          </div>
        </div>

        {/* Recently Played */}
        <div className="mb-7">
          <div className="flex items-baseline justify-between mb-2.5">
            <h3 className="text-[12px] font-bold text-[var(--color-on-background)] uppercase tracking-wider m-0">
              Recently Played <span className="text-[var(--color-highlight)] font-normal text-[11px] capitalize">/ 最近</span>
            </h3>
            <span className="text-[11px] text-[var(--color-outline)] font-mono">
              last 2 weeks
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {loading ? (
              <>
                <div className="skeleton h-[48px] w-full rounded-xl" />
                <div className="skeleton h-[48px] w-full rounded-xl" />
              </>
            ) : recentGames.length === 0 ? (
              <p className="text-[12px] text-[var(--color-outline)]">No recent games logged.</p>
            ) : (
              recentGames.map((game) => (
                <div
                  key={game.appid}
                  className="flex items-center gap-3 p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-outline-variant)] smooth-card group"
                >
                  <div className="relative w-[88px] h-[42px] rounded-md overflow-hidden shrink-0 bg-[#121212] border border-[var(--color-outline-variant)]">
                    <GameImage
                      game={game}
                      className="object-cover"
                      sizes="88px"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[12px] font-semibold text-[var(--color-on-background)] truncate group-hover:text-[var(--color-highlight)] transition-colors">
                      {game.name}
                    </span>
                    <div className="flex items-center gap-2 text-[10.5px] text-[var(--color-outline)] mt-0.5">
                      {game.playtimeThisWeek != null && game.playtimeThisWeek > 0 && (
                        <span>{game.playtimeThisWeek}h this week</span>
                      )}
                      {game.playtimeThisWeek != null && game.playtimeThisWeek > 0 && (
                        <span className="opacity-40">·</span>
                      )}
                      <span>{game.playtimeTotal}h total</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Played Library */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5">
            <h3 className="text-[12px] font-bold text-[var(--color-on-background)] uppercase tracking-wider m-0">
              Top Played <span className="text-[var(--color-highlight)] font-normal text-[11px] capitalize">/ ライブラリ</span>
            </h3>
            <span className="text-[11px] text-[var(--color-outline)] font-mono">
              by hours
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-[640px]:grid-cols-1">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-[34px] w-full rounded-lg" />
              ))
            ) : (
              visibleLibrary.map((game, idx) => (
                <div
                  key={game.appid}
                  className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-outline-variant)] smooth-card"
                >
                  <span className="text-[11.5px] font-medium text-[var(--color-on-background)] truncate mr-2">
                    <span className="text-[10px] text-[var(--color-outline)] mr-1.5 font-mono">{idx + 1}.</span>
                    {game.name}
                  </span>
                  <span className="text-[10.5px] font-mono text-[var(--color-outline)] shrink-0">
                    {game.playtimeTotal}h
                  </span>
                </div>
              ))
            )}
          </div>

          {!loading && hasMore && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="text-[11px] font-medium text-[var(--color-outline)] hover:text-[var(--color-on-background)] border border-[var(--color-outline-variant)] px-3 py-1 rounded-full bg-[var(--color-surface)] transition-all cursor-pointer"
              >
                {showAll ? "Show less ↑" : `Show all ${displayData.library.length} games ↓`}
              </button>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
