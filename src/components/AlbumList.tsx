"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAlbumStore } from "@/store/useAlbumStore";
import { useEffect, useState } from "react";
import type { Album } from "@/store/useAlbumStore";
import { getAlbums } from "@/lib/api";

// No usare datos fake: obtiene los álbumes desde la API y deriva las secciones.

export default function AlbumList() {
  const router = useRouter();
  const pathname = usePathname();
  const setCurrentAlbum = useAlbumStore((s) => s.setCurrentAlbum);

  // i18n: conserva prefijo /es o /en si tu URL lo trae
  const loc = pathname.split("/")[1];
  const hasLocale = ["es", "en"].includes(loc);
  const prefix = hasLocale ? `/${loc}` : "";

  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    let mounted = true;
    getAlbums()
      .then((res) => {
        if (!mounted) return;
        setAlbums(Array.isArray(res) ? res : []);
      })
      .catch((e) => console.error(e));
    return () => {
      mounted = false;
    };
  }, []);

  // Derivar secciones desde la lista de álbumes recibida del backend
  const newReleases = albums.slice(0, 4);
  const mostRecommended = [...albums]
    .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
    .slice(0, 4);
  const mostListened = [...albums]
    .sort((a, b) => (b.total_tracks ?? 0) - (a.total_tracks ?? 0))
    .slice(0, 4);

  const goDetail = (album?: Album) => {
    if (album) setCurrentAlbum(album);
    else if (albums[0]) setCurrentAlbum(albums[0]);
    router.push(`${prefix}/album`);
  };

  return (
    <section className="w-full px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-6xl">
        {/* NEW RELEASES */}
        <div className="text-center">
          <p className="text-white/70 text-sm tracking-[0.2em]">NEW RELEASES</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">NEW RELEASE FOR YOU</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {newReleases.map((a: any, i) => (
            <button
              key={i}
              onClick={() => goDetail(a)}
              className="group rounded-2xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10 transition"
            >
              <div className="relative h-52 w-full overflow-hidden rounded-xl">
                <Image src={a.cover ?? "/images/playlist1.png"} alt={a.title} fill className="object-cover group-hover:scale-[1.03] transition" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{a.title}</div>
                <div className="text-xs text-white/70">{a.artist ?? "—"}</div>
              </div>
            </button>
          ))}
        </div>

        {/* 2 columnas */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* MOST RECOMMENDED */}
          <ListBlock title="MOST RECOMMENDED" items={mostRecommended} onItemClick={goDetail} />

          {/* MOST LISTENED */}
          <ListBlock title="MOST LISTENED" items={mostListened} onItemClick={goDetail} />
        </div>
      </div>
    </section>
  );
}

function ListBlock({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: any[];
  onItemClick: (item?: any) => void;
}) {
  return (
    <div>
      <h3 className="text-xl tracking-[0.2em] text-white/80">{title}</h3>
      <ul className="mt-5 space-y-5">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-4">
            <div className="min-w-10 text-white/60 text-sm">{String(idx + 1).padStart(2, "0")}</div>

            <button
              onClick={() => onItemClick(it)}
              className="flex flex-1 items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10 transition"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image src={it.cover ?? "/images/playlist1.png"} alt={it.title} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{it.title}</div>
                <div className="truncate text-sm text-white/70">{it.artist ?? "—"}</div>
                <div className="text-xs text-white/60 mt-1">{it.year ?? (it.release_date ? new Date(it.release_date).getFullYear() : "—")}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
