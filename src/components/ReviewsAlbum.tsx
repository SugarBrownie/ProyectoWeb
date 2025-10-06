"use client";
import { useMemo, useRef } from "react";
import { useAlbumStore } from "@/store/useAlbumStore";

export default function ReviewsAlbum({ albumKey, title = "RESEÑAS" }:{
  albumKey: string; title?: string;
}) {
  const { reviewsByAlbum } = useAlbumStore();
  const list = useMemo(() => reviewsByAlbum[albumKey] ?? [], [reviewsByAlbum, albumKey]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardW = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir === "left" ? -cardW * 1.2 : cardW * 1.2, behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-wide text-white">{title}</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")}  className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/15">←</button>
            <button onClick={() => scroll("right")} className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/15">→</button>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="text-white/60">Aún no hay reseñas para este álbum. ¡Escribe la primera!</p>
        ) : (
          <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2" style={{scrollBehavior:"smooth"}}>
            {list.map(r => (
              <article key={r.id} className="min-w-[320px] max-w-[360px] snap-start rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg">
                <header className="mb-4 flex items-center gap-3">
                  <img src={r.avatarUrl} alt={`Avatar de ${r.author}`} width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20"/>
                  <div>
                    <div className="font-semibold leading-tight">{r.author}</div>
                    <div className="text-xs text-white/70">{r.role}</div>
                  </div>
                </header>
                <p className="text-[15px] leading-6 text-white/90">{r.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
