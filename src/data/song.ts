import type { Song } from "@/store/useSongStore";

export const SONG_BANK: Song[] = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "÷ (Deluxe)",
    duration: "4:23",
    genres: ["Pop", "Soft Rock"],
    year: 2017,
    avgRating: 4.9,
    cover: "/images/ed-divide.png", 
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    genres: ["Synth-pop"],
    year: 2019,
    avgRating: 4.8,
    cover: "/images/after-hours.jpg",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Deluxe)",
    duration: "3:53",
    genres: ["Pop"],
    year: 2017,
    avgRating: 4.7,
    cover: "/images/ed-divide.png",
  },
];

export function pickSongByTitleArtist(title: string, artist: string) {
  return (
    SONG_BANK.find(
      s =>
        s.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        s.artist.trim().toLowerCase() === artist.trim().toLowerCase()
    ) ?? null
  );
}
