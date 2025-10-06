import React from "react";

export default function RecomendacionesPage() {
  return (
    <main className="min-h-screen bg-secondary text-textLight px-6 py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">
          Explorar Playlists
        </h1>
      </header>

      <section aria-labelledby="recommend-section" role="region">
        <h2 id="recommend-section" className="text-xl font-semibold mb-4">
          Tus playlists recomendadas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <article
              key={i}
              className="bg-accent/30 rounded-xl overflow-hidden shadow hover:scale-105 hover:shadow-lg transition-transform duration-200"
              role="article"
              aria-label={`Tarjeta de playlist número ${i}`}
            >
              <img
                src={`/images/playlist${i}.png`}
                alt={`Imagen de la playlist número ${i}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Playlist {i}</h3>
                <p className="text-sm text-textMuted">
                  Descubre mezclas únicas y recomendaciones personalizadas.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}