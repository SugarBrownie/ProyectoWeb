import type { Album } from "@/store/useAlbumStore";

export const ALBUM_BANK: Album[] = [
  {
    title: "÷ (Deluxe)",
    artist: "Ed Sheeran",
    n_songs: 16,
    year: 2017,
    genres: ["Pop", "Soft Rock"],
    avgRating: 4.8,
    cover: "/images/ed-divide.jpg",
    duration: "59:33",
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    n_songs: 14,
    year: 2020,
    genres: ["Synth-pop"],
    avgRating: 4.7,
    cover: "/images/after-hours.jpg",
    duration: "56:17",
  },
  // agrega más...
];

// Utilidad opcional si eliges navegar por nombre
export function pickAlbumByTitleArtist(title: string, artist: string) {
  const t = title.trim().toLowerCase();
  const a = artist.trim().toLowerCase();
  return ALBUM_BANK.find(
    (x) => x.title.trim().toLowerCase() === t && x.artist.trim().toLowerCase() === a
  ) ?? null;
}
