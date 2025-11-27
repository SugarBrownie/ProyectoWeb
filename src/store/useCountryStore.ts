import { create } from "zustand";

interface Country {
  _id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  imageUrl: string;
  topArtist: string;
  topSong: string;
}

interface CountryStore {
  countries: Country[];
  fetchCountries: () => Promise<void>;
}

export const useCountryStore = create<CountryStore>((set) => ({
  countries: [],

  fetchCountries: async () => {
    const res = await fetch("http://localhost:3000/countries");
    const data = await res.json();
    set({ countries: data });
  },
}));
