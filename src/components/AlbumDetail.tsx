"use client";

import Image from "next/image";
import { useState } from "react";
import { useAlbumStore } from "@/store/useAlbumStore";
import ReviewsAlbum from "@/components/ReviewsAlbum";

function Star({ filled = false, size = 24, className = "" }:{filled?:boolean; size?:number; className?:string}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function AlbumDetail() {
  const {
    currentAlbum: album,
    rating, setRating,
    comment, setComment,
    resetFeedback, addReview,
  } = useAlbumStore();

  const [hover, setHover] = useState(0);
  if (!album) return <section className="px-4 py-16 text-white/70">Selecciona un álbum para ver el detalle.</section>;
  const stars = [1,2,3,4,5];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview(album.title, comment.trim());
    resetFeedback();
  };

  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:py-16">
        {/* Cover */}
        <div className="relative h-[380px] w-[360px] overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl">
          <Image src={album.cover} alt={`Portada del álbum ${album.title}`} fill className="object-cover" />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Álbum: <span className="text-white/90">{album.title}</span>
          </h2>

          <ul className="mt-6 space-y-2 text-[15px] leading-7 text-white/90">
            <li><span className="text-white/60">Artista:</span> <b>{album.artist}</b></li>
            <li><span className="text-white/60">Número de canciones:</span> <b>{album.n_songs ?? "—"}</b></li>
            <li><span className="text-white/60">Duración total:</span> <b>{album.duration ?? "—"}</b></li>
            <li><span className="text-white/60">Género:</span> <b>{album.genres.join(", ")}</b></li>
            <li><span className="text-white/60">Año de Lanzamiento:</span> <b>{album.year}</b></li>
            <li><span className="text-white/60">Calificación Promedio:</span> <b>{album.avgRating.toFixed(1)}</b></li>
          </ul>

          {/* Rating */}
          <div className="mt-6 flex items-center gap-5">
            {stars.map((s) => {
              const active = (hover || rating) >= s;
              return (
                <button key={s} type="button"
                  onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} onClick={() => setRating(s)}
                  className="transition-transform hover:scale-110">
                  <Star className={active ? "fill-yellow-400 text-yellow-400 drop-shadow" : "text-white/50"} />
                </button>
              );
            })}
          </div>

          {/* Comentario */}
          <form onSubmit={onSubmit} className="mt-6 flex items-center gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deja tu reseña aquí"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/20"
            />
            <button type="submit" className="rounded-xl bg-lime-400 px-6 py-3 font-semibold text-black hover:brightness-95">
              Enviar
            </button>
          </form>
        </div>
      </div>

      <hr className="mx-auto mt-10 w-[92%] border-white/10" />
      <ReviewsAlbum albumKey={album.title} />
    </section>
  );
}
