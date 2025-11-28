import { create } from "zustand";
import { getSong, getSongs, postReview, getSongReviews } from "@/lib/api";

export type Song = {
  id: string;
  title: string;
  artist?: string;
  duration?: number; // seconds
  albumId?: string;
  // extras optional for UI
  cover?: string;
  year?: number;
  genres?: string[];
  avgRating?: number;
};

export type Review = {
  id: string;
  songId?: string;
  albumId?: string;
  comentario?: string;
  calificacion?: number;
  userId?: string;
  createdAt?: number;
  author?: string;
  role?: string;
  avatarUrl?: string;
};

type SongState = {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;

  // loaders
  loadSongById: (id: string) => Promise<void>;
  loadSongs: () => Promise<Song[]>;

  rating: number;
  setRating: (rating: number) => void;

  comment: string;
  setComment: (comment: string) => void;
  resetFeedback: () => void;

  // Reseñas
  reviewsBySong: Record<string, Review[]>;
  fetchReviewsForSong: (songId: string) => Promise<void>;
  addReview: (songId: string, text: string, extras?: Partial<Review>) => Promise<void>;
};

export const useSongStore = create<SongState>((set, get) => ({
  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),

  loadSongById: async (id: string) => {
    try {
      const data = await getSong(id);
      set({ currentSong: data as Song });
    } catch (err) {
      console.error("loadSongById error", err);
    }
  },

  loadSongs: async () => {
    try {
      const list = await getSongs();
      return list as Song[];
    } catch (err) {
      console.error("loadSongs error", err);
      return [] as Song[];
    }
  },

  rating: 0,
  setRating: (rating) => set({ rating }),

  comment: "",
  setComment: (comment) => set({ comment }),

  resetFeedback: () => set({ rating: 0, comment: "" }),

  reviewsBySong: {},

  fetchReviewsForSong: async (songId) => {
    try {
      const res = await getSongReviews(songId);
      set({ reviewsBySong: { ...get().reviewsBySong, [songId]: Array.isArray(res) ? res : [] } });
    } catch (err) {
      console.error("fetchReviewsForSong", err);
    }
  },

  addReview: async (songId, text, extras) => {
    const id = crypto.randomUUID?.() ?? String(Math.random());
    const payload = {
      comentario: text,
      calificacion: extras?.calificacion ?? 0,
      userId: extras?.userId ?? "anonymous",
      songId,
      albumId: extras?.albumId,
    };

    try {
      // try persist to API
      const created = await postReview(payload).catch(() => null);

      const review: Review = {
        id: (created && (created as any).id) || id,
        songId,
        comentario: text,
        calificacion: extras?.calificacion,
        userId: extras?.userId,
        createdAt: Date.now(),
        author: extras?.author ?? "Anónimo",
        role: extras?.role ?? "Usuario",
        avatarUrl: extras?.avatarUrl ?? "/images/avatar-default.png",
      };

      const current = get().reviewsBySong[songId] ?? [];
      set({ reviewsBySong: { ...get().reviewsBySong, [songId]: [review, ...current] } });
    } catch (err) {
      console.error("addReview song error", err);
    }
  },
}));
