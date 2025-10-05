export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genres: string[];
  year: number;
  avgRating: number;
  cover: string; // /public/covers/...
};