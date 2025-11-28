import type { Song } from "@/store/useSongStore";
import { getSongs } from "@/lib/api";

// Fetch songs from the API. Returns an array of Song-like objects.
export async function fetchSongs(): Promise<Song[]> {
  try {
    const res = await getSongs();
    return Array.isArray(res) ? (res as Song[]) : [];
  } catch (err) {
    console.error("fetchSongs error", err);
    return [];
  }
}

// Helper: find a song by title+artist from the API (fast lookup)
export async function pickSongByTitleArtist(title: string, artist: string): Promise<Song | null> {
  const list = await fetchSongs();
  const t = title.trim().toLowerCase();
  const a = artist.trim().toLowerCase();
  return list.find((s) => (s.title || "").trim().toLowerCase() === t && ((s.artist || "").trim().toLowerCase() === a)) ?? null;
}
