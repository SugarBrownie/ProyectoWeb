"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAlbumStore } from "@/store/useAlbumStore";
import { ALBUM_BANK } from "@/data/albumBank";

// datos fake para la grilla y los listados (solo UI)
const NEW_RELEASES = [
  { title: "PINK VENOM", artist: "Blackpink", cover: "/images/placeholder1.jpg" },
  { title: "REPUTATION", artist: "Taylor Swift", cover: "/images/placeholder2.jpg" },
  { title: "HARRY'S HOUSE", artist: "Harry Styles", cover: "/images/placeholder3.jpg" },
  { title: "NEXT LEVEL", artist: "Aespa", cover: "/images/placeholder4.jpg" },
];

const MOST_RECOMMENDED = [
  { title: "Dawn FM", artist: "The Weeknd", year: 2022, cover: "/images/after-hours.jpg" },
  { title: "Manusia", artist: "Tulus", year: 2022, cover: "/images/placeholder2.jpg" },
  { title: "Ants From Up There", artist: "Black Country", year: 2022, cover: "/images/placeholder3.jpg" },
  { title: "I Never Liked You", artist: "Future", year: 2022, cover: "/images/placeholder4.jpg" },
];

const MOST_LISTENED = [
  { title: "÷ (Deluxe)", artist: "Ed Sheeran", year: 2017, cover: "/images/ed-divide.jpg" },
  { title: "Beerbongs & Bentleys", artist: "Post Malone", year: 2018, cover: "/images/placeholder1.jpg" },
  { title: "Dua Lipa", artist: "Dua Lipa", year: 2017, cover: "/images/placeholder2.jpg" },
  { title: "Hollywood's Bleeding", artist: "Post Malone", year: 2019, cover: "/images/placeholder3.jpg" },
];

export default function AlbumList() {
  const router = useRouter();
  const pathname = usePathname();
  const setCurrentAlbum = useAlbumStore((s) => s.setCurrentAlbum);

  // i18n: conserva prefijo /es o /en si tu URL lo trae
  const loc = pathname.split("/")[1];
  const hasLocale = ["es", "en"].includes(loc);
  const prefix = hasLocale ? `/${loc}` : "";

  // handler común: “quema” el álbum que ya hiciste (primero del banco)
  const goDetail = () => {
    setCurrentAlbum(ALBUM_BANK[0]);        // ← usa tu álbum ya armado
    router.push(`${prefix}/album`);       // ← tu página de detalle (AlbumDetail)
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
          {NEW_RELEASES.map((a, i) => (
            <button
              key={i}
              onClick={goDetail}
              className="group rounded-2xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10 transition"
            >
              <div className="relative h-52 w-full overflow-hidden rounded-xl">
                <Image src={a.cover} alt={a.title} fill className="object-cover group-hover:scale-[1.03] transition" />
              </div>
              <div className="mt-3">
                <div className="font-semibold">{a.title}</div>
                <div className="text-xs text-white/70">{a.artist}</div>
              </div>
            </button>
          ))}
        </div>

        {/* 2 columnas */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* MOST RECOMMENDED */}
          <ListBlock title="MOST RECOMMENDED" items={MOST_RECOMMENDED} onItemClick={goDetail} />

          {/* MOST LISTENED */}
          <ListBlock title="MOST LISTENED" items={MOST_LISTENED} onItemClick={goDetail} />
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
  items: { title: string; artist: string; year: number; cover: string }[];
  onItemClick: () => void;
}) {
  return (
    <div>
      <h3 className="text-xl tracking-[0.2em] text-white/80">{title}</h3>
      <ul className="mt-5 space-y-5">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-4">
            <div className="min-w-10 text-white/60 text-sm">{String(idx + 1).padStart(2, "0")}</div>

            <button
              onClick={onItemClick}
              className="flex flex-1 items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 text-left hover:bg-white/10 transition"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image src={it.cover} alt={it.title} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-medium">{it.title}</div>
                <div className="truncate text-sm text-white/70">{it.artist}</div>
                <div className="text-xs text-white/60 mt-1">{it.year}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
