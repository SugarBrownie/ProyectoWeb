import type { Album } from "@/store/useAlbumStore";

export const ALBUM_BANK: Album[] = [
  {
    id: "ed-divide",
    title: "÷ (Deluxe)",
    artist: "Ed Sheeran",
    year: 2017,
    total_tracks: 16,
    averageRating: 4.8,
    images: [{ url: "/images/ed-divide.png", height: 640, width: 640 }],
    release_date: "2017-03-03",
    cover: "/images/ed-divide.png",
  },
  {
    id: "after-hours",
    title: "After Hours",
    artist: "The Weeknd",
    year: 2020,
    total_tracks: 14,
    averageRating: 4.7,
    images: [{ url: "/images/after-hours.jpg", height: 640, width: 640 }],
    release_date: "2020-03-20",
    cover: "/images/after-hours.jpg",
  },
  // agrega más...
];

// Utilidad opcional si eliges navegar por nombre
export function pickAlbumByTitleArtist(title: string, artist: string) {
  const t = title.trim().toLowerCase();
  const a = artist.trim().toLowerCase();
  return ALBUM_BANK.find(
    (x) => x.title.trim().toLowerCase() === t && (x.artist ?? "").trim().toLowerCase() === a
  ) ?? null;
}
