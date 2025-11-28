import { API_TOKEN } from "@/app/utils/config";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

export async function apiFetch(path: string, opts: RequestInit = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
    Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : undefined,
  } as Record<string, string>;

  console.log("apiFetch → URL:", url, "opts:", opts);
  const res = await fetch(url, { ...opts, headers, credentials: "include" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`API fetch ${res.status} ${res.statusText}: ${text}`);
    // @ts-ignore
    err.status = res.status;
    throw err;
  }

  // Try to parse JSON, if any
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export const getAlbums = () => apiFetch("/albums");
export const getAlbum = (id: string) => apiFetch(`/albums/${id}`);
export const getSongs = () => apiFetch("/songs");
export const getSong = (id: string) => {
  // some APIs might use /song/:id or /songs/:id
  return apiFetch(`/songs/${id}`).catch(() => apiFetch(`/song/${id}`));
};

export const getAlbumReviews = (albumId: string) => apiFetch(`/reviews/album/${albumId}`);
export const getSongReviews = (songId: string) => apiFetch(`/reviews/song/${songId}`).catch(() => []);

export const postReview = (payload: any) => apiFetch(`/reviews`, { method: "POST", body: JSON.stringify(payload) });
