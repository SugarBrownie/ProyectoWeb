import MusicMap from '@/components/MusicMap'; // sin next/dynamic

export const metadata = { title: 'Music Map' };

export default function MapPage() {
  return (
    <section aria-labelledby="map-title" className="h-full">
      <h1 id="map-title" className="sr-only">Music Map</h1>
      <MusicMap />
    </section>
  );
}
