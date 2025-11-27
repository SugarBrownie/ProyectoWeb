'use client';

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { CountryHit } from '@/data/top-music'; // solo el tipo
import { pickSongByTitleArtist, SONG_BANK } from '@/data/song';
import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/useSongStore';

/* ========= tipos auxiliares ========= */

type Props = {
  initialCenter?: [number, number];
  initialZoom?: number;
};

type WorldFeature = GeoJSON.FeatureCollection<
  GeoJSON.MultiPolygon | GeoJSON.Polygon
>;

/* ================================
   Idiomas ES / EN
==================================*/
type Lang = 'es' | 'en';

const LABELS: Record<
  Lang,
  { mostArtist: string; mostSong: string; close: string; seeDetail: string }
> = {
  es: {
    mostArtist: 'Artista más escuchado:',
    mostSong: 'Canción más escuchada:',
    close: 'Cerrar tarjeta',
    seeDetail: 'Ver detalle',
  },
  en: {
    mostArtist: 'Most listened Artist:',
    mostSong: 'Most listened song:',
    close: 'Close card',
    seeDetail: 'See detail',
  },
};

// Traducción de países por código ISO-2
const COUNTRY_NAMES: Record<Lang, Record<string, string>> = {
  es: {
    ES: 'España',
    FR: 'Francia',
    JP: 'Japón',
    RU: 'Rusia',
    US: 'Estados Unidos',
  },
  en: {
    ES: 'Spain',
    FR: 'France',
    JP: 'Japan',
    RU: 'Russia',
    US: 'United States',
  },
};

// URL base del backend
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

/* ================================== */

export default function MusicMap({
  initialCenter = [0, 20],
  initialZoom = 1,
}: Props) {
  const [world, setWorld] = useState<WorldFeature | null>(null);

  // 🔴 AQUÍ guardamos SOLO lo que venga del backend
  const [countries, setCountries] = useState<CountryHit[]>([]);

  const [selected, setSelected] = useState<CountryHit | null>(null);
  const [lang, setLang] = useState<Lang>('es');
  const labels = LABELS[lang];

  const router = useRouter();
  const setCurrentSong = useSongStore((s) => s.setCurrentSong);

  // Cargar mapa del mundo (topojson)
  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
      );
      const topo = (await res.json()) as Topology;
      const fc = feature(topo, topo.objects.countries) as WorldFeature;
      setWorld(fc);
    })();
  }, []);

  // Cargar países desde el backend
 // Cargar países desde el backend
useEffect(() => {
  const controller = new AbortController();

  const loadCountries = async () => {
    try {
      const res = await fetch("/api/countries", {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}`);
      }

      const json = await res.json();

      const mapped: CountryHit[] = json.map((c: any) => ({
        code: c.code,
        country: c.name,
        lat: c.lat,
        lon: c.lng,
        image: c.imageUrl,
        artist: c.topArtist,
        song: c.topSong,
      }));

      setCountries(mapped);
    } catch (err: any) {
      if (err.name === "AbortError") return;
      console.error("Error cargando países desde el backend:", err);
    }
  };

  loadCountries();

  return () => controller.abort();
}, []);


  // Proyección del mapa
  const { projection, path } = useMemo(() => {
    const proj = geoEqualEarth()
      .translate([480, 260])
      .scale(160 * (initialZoom ?? 1));
    return { projection: proj, path: geoPath(proj) };
  }, [initialCenter, initialZoom]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const goToDetailFromHit = (hit: CountryHit) => {
    const song =
      pickSongByTitleArtist(hit.song, hit.artist) ?? SONG_BANK[0]; // fallback
    setCurrentSong(song);
    router.push('/es/songs');
  };

  const getCountryName = (hit: CountryHit) => {
    const iso = hit.code?.toUpperCase();
    if (iso && COUNTRY_NAMES[lang][iso]) return COUNTRY_NAMES[lang][iso];

    const match = Object.entries(COUNTRY_NAMES.en).find(
      ([, enName]) => enName === hit.country
    );
    if (match) {
      const iso2 = match[0];
      return COUNTRY_NAMES[lang][iso2] ?? hit.country;
    }
    return hit.country;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(158, 193, 255, 0.4)',
      }}
      aria-label="Contenedor del mapa"
    >
      {/* Botón idioma */}
      <button
        onClick={() => setLang((prev) => (prev === 'es' ? 'en' : 'es'))}
        aria-label={`Cambiar idioma a ${
          lang === 'es' ? 'English' : 'Español'
        }`}
        style={{
          position: 'absolute',
          right: 12,
          top: 12,
          zIndex: 10,
          background: 'rgba(255,255,255,.9)',
          color: '#111',
          fontWeight: 700,
          padding: '6px 10px',
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 10px rgba(0,0,0,.1)',
        }}
      >
        {lang === 'es' ? 'EN' : 'ES'}
      </button>

      {/* Tarjeta seleccionada */}
      <SelectedCard
        hit={selected}
        onClose={() => setSelected(null)}
        onGo={() => selected && goToDetailFromHit(selected)}
        countryDisplayName={selected ? getCountryName(selected) : ''}
        labels={labels}
        lang={lang}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 960 520"
        role="img"
        aria-label="Mapa mundial con los artistas y canciones más escuchados por país"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <g>
          {/* Polígonos del mundo */}
          {world &&
            world.features.map((feat, i) => (
              <path
                key={i}
                d={path(feat)!}
                fill="#E6F0FF"
                stroke="#96B3E6"
                strokeWidth={0.5}
              />
            ))}

          {/* Puntos de países: SOLO los de la base de datos */}
          {countries.map((hit) => {
            const [x, y] = projection([hit.lon, hit.lat]) as [number, number];
            return (
              <g
                key={hit.code}
                transform={`translate(${x},${y})`}
                role="button"
                tabIndex={0}
                aria-label={`Abrir info de ${hit.country}: artista ${hit.artist}, canción ${hit.song}`}
                onClick={() => setSelected(hit)}
                onKeyDown={(e) =>
                  (e.key === 'Enter' || e.key === ' ') && setSelected(hit)
                }
                style={{ cursor: 'pointer' }}
              >
                <circle r={9} fill="#f59e0b" opacity={0.7}></circle>
                <circle r={4} fill="#22c55e"></circle>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/* ==================================
   Componente SelectedCard
==================================*/

type SelectedCardProps = {
  hit: CountryHit | null;
  onClose: () => void;
  onGo: () => void;
  countryDisplayName: string;
  labels: {
    mostArtist: string;
    mostSong: string;
    close: string;
    seeDetail: string;
  };
  lang: 'es' | 'en';
};

function SelectedCard({
  hit,
  onClose,
  onGo,
  countryDisplayName,
  labels,
  lang,
}: SelectedCardProps) {
  const outer: CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
  };
  const cardWrap: CSSProperties = {
    pointerEvents: 'auto',
    width: '100%',
    maxWidth: 960,
  };
  const cardBase: CSSProperties = {
    borderRadius: 16,
    boxShadow: '0 6px 20px rgba(0,0,0,.15)',
    border: '1px solid #d1d5db',
    background: '#ffffff',
    color: '#111111',
    overflow: 'hidden',
    transition: 'all .2s ease',
  };

  const hidden: CSSProperties = {
    opacity: 0,
    transform: 'translateY(16px)',
    pointerEvents: 'none',
  };
  const shown: CSSProperties = { opacity: 1, transform: 'translateY(0)' };

  return (
    <div style={outer} aria-live="polite">
      <div style={cardWrap}>
        <div style={{ ...cardBase, ...(hit ? shown : hidden) }}>
          {hit && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
              }}
            >
              <img
                src={hit.image}
                alt={`Imagen de ${countryDisplayName || hit.country}`}
                style={{ width: '100%', height: 192, objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {countryDisplayName || hit.country}
                  </h2>
                  <button
                    onClick={onClose}
                    aria-label={labels.close}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '4px 8px',
                      background: 'white',
                    }}
                  >
                    ✕
                  </button>
                </div>
                <dl style={{ marginTop: 8, fontSize: 14 }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr',
                    }}
                  >
                    <dt style={{ fontWeight: 500 }}>{labels.mostArtist}</dt>
                    <dd>{hit.artist}</dd>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr',
                    }}
                  >
                    <dt style={{ fontWeight: 500 }}>{labels.mostSong}</dt>
                    <dd>{hit.song}</dd>
                  </div>
                </dl>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button
                    onClick={onGo}
                    aria-label={
                      lang === 'es'
                        ? 'Ir al detalle de la canción'
                        : 'Go to detail'
                    }
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '8px 12px',
                      background: '#111827',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  >
                    {labels.seeDetail}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
