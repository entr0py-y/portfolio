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

function SkeletonCard({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`skeleton ${wide ? "h-[120px]" : "h-[80px]"} w-full rounded-xl`} />
  );
}

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <PageShell>
      <div className="fade-in fade-in-delay-2" style={{ fontFamily: "var(--font-body)" }}>
        {/* Stats Pills */}
        {loading ? (
          <div className="flex gap-3 mb-6">
            <div className="skeleton w-[120px] h-[32px] rounded-full" />
            <div className="skeleton w-[160px] h-[32px] rounded-full" />
          </div>
        ) : error ? (
          <div className="text-[13px] text-[var(--color-outline)] mb-6 px-4 py-3 rounded-xl border border-[var(--color-outline-variant)]">
            ⚠️ Could not load Steam data. Make sure <code className="text-[12px]">STEAM_API_KEY</code> and <code className="text-[12px]">STEAM_ID</code> are set in your environment variables.
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-on-background)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <line x1="6" x2="10" y1="12" y2="12"/>
                <line x1="8" x2="8" y1="10" y2="14"/>
                <line x1="15" x2="15.01" y1="13" y2="13"/>
                <line x1="18" x2="18.01" y1="11" y2="11"/>
                <rect width="20" height="12" x="2" y="6" rx="2"/>
              </svg>
              {data!.totalGames} games
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-on-background)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {data!.totalPlaytimeHours} hrs on Steam
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-[13px] leading-[1.6] font-medium text-[var(--color-on-background)] mb-8">
          Big fan of story-driven games and JRPGs.
        </p>

        {/* Recently Played */}
        <div className="mb-10">
          <h3 className="text-[14px] font-semibold mb-4 text-[var(--color-outline)]">Recently Played</h3>
          <div className="flex flex-col gap-3">
            {loading ? (
              <>
                <SkeletonCard wide />
                <SkeletonCard wide />
                <SkeletonCard wide />
              </>
            ) : error ? null : data!.recentlyPlayed.length === 0 ? (
              <p className="text-[12px] text-[var(--color-outline)]">No recent games.</p>
            ) : (
              data!.recentlyPlayed.map((game) => (
                <div
                  key={game.appid}
                  className="flex gap-4 items-center py-2 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01]"
                >
                  <div className="relative w-[160px] h-[75px] rounded-lg overflow-hidden shrink-0 max-[768px]:w-[120px] max-[768px]:h-[56px] shadow-md border-[1.5px] border-[var(--color-on-background)]">
                    <GameImage
                      game={game}
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-semibold text-[var(--color-on-background)] truncate">{game.name}</span>
                    <span className="text-[11px] text-[var(--color-outline)] mt-1">
                      {game.playtimeThisWeek} hrs this week
                    </span>
                    <span className="text-[11px] text-[var(--color-outline)]">
                      {game.playtimeTotal} hrs total
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Steam Library */}
        <div>
          <h3 className="text-[14px] font-semibold mb-4 text-[var(--color-outline)]">Steam Library</h3>
          <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
            {loading ? (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </>
            ) : error ? null : (
              data!.library.map((game) => (
                <div
                  key={game.appid}
                  className="flex gap-3 items-center py-2 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-semibold text-[var(--color-on-background)] truncate">{game.name}</span>
                    <span className="text-[10px] text-[var(--color-outline)]">{game.playtimeTotal} hrs</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
