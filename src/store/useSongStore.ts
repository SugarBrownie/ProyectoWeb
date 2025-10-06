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

export type Review = {
  id: string;
  songKey: string;       // normalmente el título de la canción
  text: string;          // solo comentario 
  createdAt: number;
  author?: string;       // opcional (para la UI de tarjetas)
  role?: string;         // opcional
  avatarUrl?: string;    // opcional
};

type SongState = {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;

  rating: number;
  setRating: (rating: number) => void;

  comment: string;
  setComment: (comment: string) => void;
  resetFeedback: () => void;

  // Reseñas
  reviewsBySong: Record<string, Review[]>;
  addReview: (songKey: string, text: string, extras?: Partial<Review>) => void;
};

export const useSongStore = create<SongState>((set, get) => ({
  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),

  rating: 0,
  setRating: (rating) => set({ rating }),

  comment: "",
  setComment: (comment) => set({ comment }),

  resetFeedback: () => set({ rating: 0, comment: "" }),

  // Reseñas en memoria
  reviewsBySong: {},

  addReview: (songKey, text, extras) => {
    const id = crypto.randomUUID?.() ?? String(Math.random());
    const review: Review = {
      id,
      songKey,
      text,
      createdAt: Date.now(),
      author: extras?.author ?? "Anónimo",
      role: extras?.role ?? "Usuario",
      avatarUrl: extras?.avatarUrl ?? "/images/avatar-default.png",
    };

    const current = get().reviewsBySong[songKey] ?? [];
    set({
      reviewsBySong: {
        ...get().reviewsBySong,
        [songKey]: [review, ...current],
      },
    });
  },
}));
