'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {geoEqualEarth, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import type {Topology} from 'topojson-specification';
import {HITS, type CountryHit} from '@/data/top-music';
import { pickSongByTitleArtist, SONG_BANK } from '@/data/song';
import { useRouter } from 'next/navigation';
import { useSongStore } from '@/store/useSongStore';

type Props = {
  data?: CountryHit[];
  initialCenter?: [number, number];
  initialZoom?: number;
};

type WorldFeature = GeoJSON.FeatureCollection<GeoJSON.MultiPolygon | GeoJSON.Polygon>;

export default function MusicMap({
  data = HITS,
  initialCenter = [0, 20],
  initialZoom = 1
}: Props) {
  const [world, setWorld] = useState<WorldFeature | null>(null);
  const [selected, setSelected] = useState<CountryHit | null>(null);

  const router = useRouter();
  const setCurrentSong = useSongStore(s => s.setCurrentSong);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      const topo = (await res.json()) as Topology;
      const fc = feature(topo, topo.objects.countries) as WorldFeature;
      setWorld(fc);
    })();
  }, []);

  const {projection, path} = useMemo(() => {
    const proj = geoEqualEarth().translate([480, 260]).scale(160 * (initialZoom ?? 1));
    return {projection: proj, path: geoPath(proj)};
  }, [initialCenter, initialZoom]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const goToDetailFromHit = (hit: CountryHit) => {
  const song = pickSongByTitleArtist(hit.song, hit.artist) ?? SONG_BANK[0]; // fallback
  setCurrentSong(song);
  router.push("/songs"); // asegura tener src/app/song/page.tsx que renderiza <SongDetail />
  };

  return (
    <div
      // 🔁 ESTILOS SIN TAILWIND
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(158, 193, 255, 0.4)'
      }}
      aria-label="Contenedor del mapa"
    >
      <SelectedCard
        hit={selected}
        onClose={() => setSelected(null)}
        onGo={() => selected && goToDetailFromHit(selected)}   // ← NUEVO
      />

      <svg
        ref={svgRef}
        viewBox="0 0 960 520"
        role="img"
        aria-label="Mapa mundial con los artistas y canciones más escuchados por país"
        // 🔁 ESTILOS SIN TAILWIND
        style={{width: '100%', height: '100%', display: 'block'}}
      >
        <g>
          {world && world.features.map((feat, i) => (
            <path
              key={i}
              d={path(feat)!}
              fill="#E6F0FF"
              stroke="#96B3E6"
              strokeWidth={0.5}
            />
          ))}

          {data.map(hit => {
            const [x, y] = projection([hit.lon, hit.lat]) as [number, number];
            return (
              <g
                key={hit.code}
                transform={`translate(${x},${y})`}
                role="button"
                tabIndex={0}
                aria-label={`Abrir info de ${hit.country}: artista ${hit.artist}, canción ${hit.song}`}
                onClick={() => setSelected(hit)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(hit)}
                style={{cursor:'pointer'}}
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

function SelectedCard({hit, onClose, onGo}:{hit:CountryHit|null; onClose:()=>void; onGo:()=>void}) {
  const outer: React.CSSProperties = {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: 16
  };
  const cardWrap: React.CSSProperties = { pointerEvents: 'auto', width: '100%', maxWidth: 960 };
  const cardBase: React.CSSProperties = {
  borderRadius: 16,
  boxShadow: '0 6px 20px rgba(0,0,0,.15)',
  border: '1px solid #d1d5db',
  background: '#ffffff',       // blanco puro
  color: '#111111',            // texto oscuro
  overflow: 'hidden',
  transition: 'all .2s ease'
};

  const hidden: React.CSSProperties = { opacity: 0, transform: 'translateY(16px)', pointerEvents: 'none' };
  const shown: React.CSSProperties = { opacity: 1, transform: 'translateY(0)' };

  return (
    <div style={outer} aria-live="polite">
      <div style={cardWrap}>
        <div style={{...cardBase, ...(hit ? shown : hidden)}}>
          {hit && (
            <div style={{display:'grid', gridTemplateColumns:'1fr 2fr'}}>
              <img
                src={hit.image}
                alt={`Imagen de ${hit.country}`}
                style={{width:'100%', height:192, objectFit:'cover'}}
                loading="lazy"
              />
              <div style={{padding:16}}>
                <div style={{display:'flex', justifyContent:'space-between', gap:8}}>
                  <h2 style={{fontSize:20, fontWeight:600, margin:0}}>{hit.country}</h2>
                  <button
                    onClick={onClose}
                    aria-label="Cerrar tarjeta"
                    style={{border:'1px solid #e5e7eb', borderRadius:8, padding:'4px 8px', background:'white'}}
                  >
                    ✕
                  </button>
                </div>
                <dl style={{marginTop:8, fontSize:14}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 2fr'}}>
                    <dt style={{fontWeight:500}}>Most listened Artist:</dt>
                    <dd>{hit.artist}</dd>
                  </div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 2fr'}}>
                    <dt style={{fontWeight:500}}>Most listened song:</dt>
                    <dd>{hit.song}</dd>
                  </div>
                </dl>
              <div style={{marginTop:12, display:'flex', gap:8}}>
                  <button
                    onClick={onGo}
                    aria-label="Ir al detalle de la canción"
                    style={{
                      border:'1px solid #e5e7eb',
                      borderRadius:8,
                      padding:'8px 12px',
                      background:'#111827',
                      color:'#fff',
                      fontWeight:600
                    }}
                  >
                    Ver detalle
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
