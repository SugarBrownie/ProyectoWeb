"use client";
import { createContext, useContext, useState } from "react";

type UserInfo = {
  Email: string;
  Psswd: string;
  Username: string;
  Bio: string;
  Image: string;
  FavArts: string[];
  FavAlbums: string[];
};

type AuthContextType = {
  User: UserInfo;

  Email: string;
  Psswd: string;
  Username: string;
  Bio: string;
  Image: string;
  FavArts: string[];
  FavAlbums: string[];

  SetEmail: React.Dispatch<React.SetStateAction<string>>;
  SetPsswd: React.Dispatch<React.SetStateAction<string>>;
  SetUsername: React.Dispatch<React.SetStateAction<string>>;
  SetBio: React.Dispatch<React.SetStateAction<string>>;
  SetImage: React.Dispatch<React.SetStateAction<string>>;
  SetFavArts: React.Dispatch<React.SetStateAction<string[]>>;
  SetFavAlbums: React.Dispatch<React.SetStateAction<string[]>>;
};

const Context = createContext<AuthContextType | null>(null);

export function AuthContextProv({ children }: { children: React.ReactNode }) {
  const [Email, SetEmail] = useState("");
  const [Psswd, SetPsswd] = useState("");
  const [Username, SetUsername] = useState("");
  const [Bio, SetBio] = useState("");
  const [Image, SetImage] = useState("");
  const [FavArts, SetFavArts] = useState<string[]>([]);
  const [FavAlbums, SetFavAlbums] = useState<string[]>([]);

  const User: UserInfo = { Email, Psswd, Username, Bio, Image, FavArts, FavAlbums };

  return (
    <Context.Provider
      value={{
        User,
        Email,
        Psswd,
        Username,
        Bio,
        Image,
        FavArts,
        FavAlbums,
        SetEmail,
        SetPsswd,
        SetUsername,
        SetBio,
        SetImage,
        SetFavArts,
        SetFavAlbums,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useUser() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useUser debe usarse dentro de un provider");
  return ctx;
}
