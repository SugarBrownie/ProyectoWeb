"use client";
import { create } from "zustand";

export type Album = {
  title: string;         // nombre del álbum
  artist: string;        // artista/banda
  n_songs: number;  // numero de canciones
  year: number;
  genres: string[];
  avgRating: number;
  cover: string;         // portada
  duration?: string;     // total opcional
};

export type AlbumReview = {
  id: string;
  albumKey: string;      // normalmente el título del álbum
  text: string;
  createdAt: number;
  author?: string;
  role?: string;
  avatarUrl?: string;
};

type AlbumState = {
  currentAlbum: Album | null;
  setCurrentAlbum: (a: Album) => void;

  rating: number;
  setRating: (v: number) => void;

  comment: string;
  setComment: (v: string) => void;
  resetFeedback: () => void;

  reviewsByAlbum: Record<string, AlbumReview[]>;
  addReview: (albumKey: string, text: string, extras?: Partial<AlbumReview>) => void;
};

export const useAlbumStore = create<AlbumState>((set, get) => ({
  currentAlbum: null,
  setCurrentAlbum: (a) => set({ currentAlbum: a }),

  rating: 0,
  setRating: (v) => set({ rating: v }),

  comment: "",
  setComment: (v) => set({ comment: v }),
  resetFeedback: () => set({ rating: 0, comment: "" }),

  reviewsByAlbum: {},

  addReview: (albumKey, text, extras) => {
    const id = crypto.randomUUID?.() ?? String(Math.random());
    const review: AlbumReview = {
      id,
      albumKey,
      text,
      createdAt: Date.now(),
      author: extras?.author ?? "Anónimo",
      role: extras?.role ?? "Usuario",
      avatarUrl: extras?.avatarUrl ?? "/images/avatar-default.png",
    };
    const current = get().reviewsByAlbum[albumKey] ?? [];
    set({
      reviewsByAlbum: {
        ...get().reviewsByAlbum,
        [albumKey]: [review, ...current],
      },
    });
  },
}));
