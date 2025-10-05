export type CountryHit = {
  code: string;
  country: string;
  lat: number;
  lon: number;
  artist: string;
  song: string;
  image: string;
};

export const HITS: CountryHit[] = [
  { code:'RU', country:'Russia',  lat:61.5240, lon:105.3188, artist:'Feid',         song:'Normal',              image:'/countries/ru.jpg' },
  { code:'FR', country:'France',  lat:46.2276, lon:  2.2137, artist:'Billie Eilish', song:'Lovely',             image:'/countries/fr.jpg' },
  { code:'JP', country:'Japan',   lat:36.2048, lon:138.2529, artist:'BLACKPINK',    song:'Shut Down',          image:'/countries/jp.jpg' },
  { code:'ES', country:'España',  lat:40.4637, lon: -3.7492, artist:'C. Tangana',   song:'Demasiadas Mujeres', image:'/countries/es.jpg' }
];
