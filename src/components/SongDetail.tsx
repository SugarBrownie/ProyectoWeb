"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";
import { useSongStore } from "@/store/useSongStore";
import Reviews from "./Reviews";

export default function SongDetail() {
  const {
    currentSong: song,
    rating,
    setRating,
    comment,
    setComment,
    resetFeedback,
    addReview, 
  } = useSongStore();

  const [hover, setHover] = useState(0);

  if (!song) {
    return (
      <section className="px-4 py-16 text-white/70">
        Selecciona una canción para ver el detalle.
      </section>
    );
  }

  const stars = [1, 2, 3, 4, 5];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // Guarda la reseña (solo comentario) asociada a esta canción
    addReview(song.title, comment.trim());
    resetFeedback(); // limpia rating y comentario
  };

  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:py-16">
        {/* Imagen */}
        <div className="relative h-[380px] w-[360px] overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl">
          <Image
            src={song.cover}
            alt={`Portada del álbum ${song.album}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Información */}
        <div className="min-w-0">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Canción: <span className="text-white/90">{song.title}</span>
          </h2>

          <ul className="mt-6 space-y-2 text-[15px] leading-7 text-white/90">
            <li><span className="text-white/60">Artista:</span> <b>{song.artist}</b></li>
            <li><span className="text-white/60">Álbum:</span> <b>{song.album}</b></li>
            <li><span className="text-white/60">Duración:</span> <b>{song.duration}</b></li>
            <li><span className="text-white/60">Género:</span> <b>{song.genres.join(", ")}</b></li>
            <li><span className="text-white/60">Año:</span> <b>{song.year}</b></li>
            <li><span className="text-white/60">Calificación Promedio:</span> <b>{song.avgRating.toFixed(1)}</b></li>
          </ul>

          {/* Rating */}
          <div className="mt-6 flex items-center gap-5">
            {stars.map((s) => {
              const active = (hover || rating) >= s;
              return (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(s)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={
                      active
                        ? "fill-yellow-400 text-yellow-400 drop-shadow"
                        : "text-white/50"
                    }
                    size={24}
                  />
                </button>
              );
            })}
          </div>

          {/* Comentario */}
          <form onSubmit={onSubmit} className="mt-6 flex items-center gap-4">
            <label htmlFor="comment" className="sr-only">Comentario</label>
            <input
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deja tu reseña aquí"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="rounded-xl bg-lime-400 px-6 py-3 font-semibold text-black hover:brightness-95"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <hr className="mx-auto mt-10 w-[92%] border-white/10" />
      <Reviews songKey={song.title} />
    </section>
  );
}
