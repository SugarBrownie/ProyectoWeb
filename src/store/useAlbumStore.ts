"use client";
import { create } from "zustand";
import { getAlbums, getAlbum, getAlbumReviews, postReview } from "@/lib/api";

export type Album = {
  id: string;
  title: string;
  artist?: string;
  year?: number;
  averageRating?: number | null;
  total_tracks?: number;
  images?: { url: string; height?: number; width?: number }[];
  release_date?: string;
  cover?: string; // portada principal (primer elemento de images si existe)
};

export type AlbumReview = {
  id: string;
  albumId?: string;
  comentario?: string;
  calificacion?: number;
  userId?: string;
  createdAt?: number;
  author?: string;
  role?: string;
  avatarUrl?: string;
};

type AlbumState = {
  currentAlbum: Album | null;
  setCurrentAlbum: (a: Album) => void;

  // loaders
  loadAlbums: () => Promise<Album[]>;
  loadAlbumById: (id: string) => Promise<void>;

  rating: number;
  setRating: (v: number) => void;

  comment: string;
  setComment: (v: string) => void;
  resetFeedback: () => void;

  reviewsByAlbum: Record<string, AlbumReview[]>;
  fetchReviewsForAlbum: (albumId: string) => Promise<void>;
  addReview: (albumId: string, text: string, extras?: Partial<AlbumReview>) => Promise<void>;
};

export const useAlbumStore = create<AlbumState>((set, get) => ({
  currentAlbum: null,
  setCurrentAlbum: (a) => set({ currentAlbum: a }),

  loadAlbums: async () => {
    try {
      const list = await getAlbums();
      return (list || []) as Album[];
    } catch (err) {
      console.error("loadAlbums", err);
      return [] as Album[];
    }
  },

  loadAlbumById: async (id: string) => {
    try {
      const data = await getAlbum(id);
      set({ currentAlbum: data as Album });
    } catch (err) {
      console.error("loadAlbumById", err);
    }
  },

  rating: 0,
  setRating: (v) => set({ rating: v }),

  comment: "",
  setComment: (v) => set({ comment: v }),
  resetFeedback: () => set({ rating: 0, comment: "" }),

  reviewsByAlbum: {},

  fetchReviewsForAlbum: async (albumId) => {
    try {
      const res = await getAlbumReviews(albumId);
      set({ reviewsByAlbum: { ...get().reviewsByAlbum, [albumId]: Array.isArray(res) ? res : [] } });
    } catch (err) {
      console.error("fetchReviewsForAlbum", err);
    }
  },

  addReview: async (albumId, text, extras) => {
    const id = crypto.randomUUID?.() ?? String(Math.random());
    const payload = {
      comentario: text,
      calificacion: extras?.calificacion ?? 0,
      userId: extras?.userId ?? "anonymous",
      albumId,
    };

    try {
      const created = await postReview(payload).catch(() => null);
      const review: AlbumReview = {
        id: (created && (created as any).id) || id,
        albumId,
        comentario: text,
        calificacion: extras?.calificacion,
        userId: extras?.userId,
        createdAt: Date.now(),
        author: extras?.author ?? "Anónimo",
        role: extras?.role ?? "Usuario",
        avatarUrl: extras?.avatarUrl ?? "/images/avatar-default.png",
      };

      const current = get().reviewsByAlbum[albumId] ?? [];
      set({ reviewsByAlbum: { ...get().reviewsByAlbum, [albumId]: [review, ...current] } });
    } catch (err) {
      console.error("addReview album error", err);
    }
  },
}));
