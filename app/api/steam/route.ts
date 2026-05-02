import { NextResponse } from "next/server";

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  img_icon_url: string;
}

export async function GET() {
  if (!STEAM_API_KEY || !STEAM_ID) {
    return NextResponse.json(
      { error: "Steam API key or Steam ID not configured." },
      { status: 500 }
    );
  }

  try {
    // Fetch owned games and recently played in parallel
    const [ownedRes, recentRes] = await Promise.all([
      fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1&include_played_free_games=1&format=json`,
        { next: { revalidate: 900 } } // Cache for 15 minutes
      ),
      fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=5&format=json`,
        { next: { revalidate: 900 } }
      ),
    ]);

    if (!ownedRes.ok || !recentRes.ok) {
      const ownedText = !ownedRes.ok ? await ownedRes.text() : "ok";
      const recentText = !recentRes.ok ? await recentRes.text() : "ok";
      console.error(
        `Steam API error — owned: ${ownedRes.status} (${ownedText}), recent: ${recentRes.status} (${recentText})`
      );
      return NextResponse.json(
        { error: "Failed to fetch from Steam API.", details: { owned: ownedRes.status, recent: recentRes.status } },
        { status: 502 }
      );
    }

    const ownedData = await ownedRes.json();
    const recentData = await recentRes.json();

    const allGames: SteamGame[] = ownedData.response?.games || [];
    const recentGames: SteamGame[] = recentData.response?.games || [];

    // Total stats
    const totalGames = ownedData.response?.game_count || allGames.length;
    const totalPlaytimeMinutes = allGames.reduce(
      (sum: number, g: SteamGame) => sum + g.playtime_forever,
      0
    );
    const totalPlaytimeHours = Math.round(totalPlaytimeMinutes / 60 * 10) / 10;

    // Recently played (formatted)
    const recentlyPlayed = recentGames.map((g: SteamGame) => ({
      appid: g.appid,
      name: g.name,
      imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
      playtimeThisWeek: Math.round((g.playtime_2weeks || 0) / 60 * 10) / 10,
      playtimeTotal: Math.round(g.playtime_forever / 60 * 10) / 10,
    }));

    // Library — top 30 by playtime
    const library = allGames
      .sort((a: SteamGame, b: SteamGame) => b.playtime_forever - a.playtime_forever)
      .slice(0, 30)
      .map((g: SteamGame) => ({
        appid: g.appid,
        name: g.name,
        imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
        playtimeTotal: Math.round(g.playtime_forever / 60 * 10) / 10,
      }));

    return NextResponse.json(
      {
        totalGames,
        totalPlaytimeHours,
        recentlyPlayed,
        library,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=900, stale-while-revalidate=1800",
        },
      }
    );
  } catch (err) {
    console.error("Steam API error:", err);
    return NextResponse.json(
      { error: "Internal server error fetching Steam data." },
      { status: 500 }
    );
  }
}
