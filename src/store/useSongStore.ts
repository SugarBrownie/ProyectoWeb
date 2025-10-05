import { create } from "zustand";

export type Song = {
  title: string;
  artist: string;
  album: string;
  duration: string;
  genres: string[];
  year: number;
  avgRating: number;
  cover: string;
};

type SongState = {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;

  rating: number;
  setRating: (rating: number) => void;

  comment: string;
  setComment: (comment: string) => void;

  resetFeedback: () => void;
};

export const useSongStore = create<SongState>((set) => ({
  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),

  rating: 0,
  setRating: (rating) => set({ rating }),

  comment: "",
  setComment: (comment) => set({ comment }),

  resetFeedback: () => set({ rating: 0, comment: "" }),
}));
