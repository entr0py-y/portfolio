import { NextResponse } from "next/server";

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID_1 = process.env.STEAM_ID_1;
const STEAM_ID_2 = process.env.STEAM_ID_2;

interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  img_icon_url: string;
}

export async function GET() {
  if (!STEAM_API_KEY || (!STEAM_ID_1 && !STEAM_ID_2)) {
    return NextResponse.json(
      { error: "Steam API key or Steam IDs not configured." },
      { status: 500 }
    );
  }

  try {
    const fetchPromises = [];
    
    if (STEAM_ID_1) {
      fetchPromises.push(
        fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID_1}&include_appinfo=1&include_played_free_games=1&format=json`, { next: { revalidate: 900 } }),
        fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID_1}&count=5&format=json`, { next: { revalidate: 900 } })
      );
    }
    
    if (STEAM_ID_2) {
      fetchPromises.push(
        fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID_2}&include_appinfo=1&include_played_free_games=1&format=json`, { next: { revalidate: 900 } }),
        fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID_2}&count=5&format=json`, { next: { revalidate: 900 } })
      );
    }

    const responses = await Promise.all(fetchPromises);
    
    const hasError = responses.some(res => !res.ok);
    if (hasError) {
      console.error("Steam API error: One or more requests failed", responses.map(r => r.status));
      return NextResponse.json(
        { error: "Failed to fetch from Steam API." },
        { status: 502 }
      );
    }

    const data = await Promise.all(responses.map(res => res.json()));
    
    const filterGames = (games: any[]) => games.filter((g: SteamGame) => g.appid !== 431960 && g.name !== "Wallpaper Engine");

    let allGamesList: SteamGame[] = [];
    let recentGamesList: SteamGame[] = [];

    if (STEAM_ID_1) {
      allGamesList = allGamesList.concat(filterGames(data[0].response?.games || []));
      recentGamesList = recentGamesList.concat(filterGames(data[1].response?.games || []));
    }
    
    if (STEAM_ID_2) {
      const offset = STEAM_ID_1 ? 2 : 0;
      allGamesList = allGamesList.concat(filterGames(data[offset].response?.games || []));
      recentGamesList = recentGamesList.concat(filterGames(data[offset + 1].response?.games || []));
    }

    // Merge helper
    const mergeGames = (list: SteamGame[]) => {
      const mergedMap = new Map<number, SteamGame>();
      list.forEach((g) => {
        if (mergedMap.has(g.appid)) {
          const existing = mergedMap.get(g.appid)!;
          mergedMap.set(g.appid, {
            ...existing,
            playtime_forever: existing.playtime_forever + g.playtime_forever,
            playtime_2weeks: (existing.playtime_2weeks || 0) + (g.playtime_2weeks || 0),
          });
        } else {
          mergedMap.set(g.appid, { ...g });
        }
      });
      return Array.from(mergedMap.values());
    };

    const allGames = mergeGames(allGamesList);
    const recentGames = mergeGames(recentGamesList);

    // Total stats
    const totalGames = allGames.length;
    const totalPlaytimeMinutes = allGames.reduce(
      (sum: number, g: SteamGame) => sum + g.playtime_forever,
      0
    );
    const totalPlaytimeHours = Math.round(totalPlaytimeMinutes / 60 * 10) / 10;

    // Recently played (formatted & limited)
    const recentlyPlayed = recentGames
      .sort((a, b) => (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0))
      .slice(0, 5)
      .map((g: SteamGame) => ({
        appid: g.appid,
        name: g.name,
        imageUrl: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appid}/capsule_616x353.jpg`,
        iconUrl: `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`,
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
        imageUrl: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appid}/capsule_616x353.jpg`,
        iconUrl: `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`,
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
