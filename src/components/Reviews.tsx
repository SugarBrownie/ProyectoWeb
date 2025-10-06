"use client";

import { useMemo, useRef } from "react";
import { useSongStore } from "@/store/useSongStore";

type Props = {
  songKey: string; // normalmente el título de la canción
  title?: string;
};

export default function Reviews({ songKey, title = "RESEÑAS" }: Props) {
  const { reviewsBySong } = useSongStore();
  const list = useMemo(() => reviewsBySong[songKey] ?? [], [reviewsBySong, songKey]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir === "left" ? -cardWidth * 1.2 : cardWidth * 1.2, behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-wide text-white">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollByCards("left")}
              className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/15"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => scrollByCards("right")}
              className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/15"
              aria-label="Siguiente"
            >
              →
            </button>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="text-white/60">Aún no hay reseñas para esta canción. ¡Sé la primera persona en comentar!</p>
        ) : (
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {list.map((r) => (
              <ReviewCard key={r.id} author={r.author} role={r.role} avatarUrl={r.avatarUrl} text={r.text} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({
  author = "Anónimo",
  role = "Usuario",
  avatarUrl = "/images/avatar-default.png",
  text,
}: {
  author?: string;
  role?: string;
  avatarUrl?: string;
  text: string;
}) {
  return (
    <article
      className="min-w-[320px] max-w-[360px] snap-start rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg"
      role="listitem"
    >
      <header className="mb-4 flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={`Avatar de ${author}`}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"
        />
        <div>
          <div className="font-semibold leading-tight">{author}</div>
          <div className="text-xs text-white/70">{role}</div>
        </div>
      </header>
      <p className="text-[15px] leading-6 text-white/90">{text}</p>
    </article>
  );
}
