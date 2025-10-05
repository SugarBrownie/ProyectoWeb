"use client";
import { createContext, useContext, useEffect, useState } from "react";

type UserInfo = {
    Email: string;
    Psswd: string;
    Username: string;
    Bio: string;
    Image: string;
    FavArts: String[];
    FavAlbums: String[];
  };

const Context = createContext <{

    User: UserInfo;

    Email: string;
    Psswd: string;
    Username: string;
    Bio: string;
    Image: string;
    FavArts: String[];
    FavAlbums: String[];

} | null>(null)

export function AuthContextProv({children}: {children: React.ReactNode}) {
    const [User, SetUser] = useState({Email:"", Psswd:"", Username:"", Bio:"", Image:"", FavArts: [], FavAlbums: []});

    const [Email, SetEmail] = useState("");
    const [Psswd, SetPsswd] = useState("");
    const [Username, SetUsername] = useState("");
    const [Bio, SetBio] = useState("");
    const [Image, SetImage] = useState("");
    const [FavArts, SetFavArts] = useState([])
    const [FavAlbums, SetFavAlbums] = useState([])

    

    return(
        <Context.Provider value={{User, Email, Psswd, Username, Bio, Image, FavArts, FavAlbums}}>
        {children}
        </Context.Provider>   
    )


}

export function useUser() {
    const ctx = useContext(Context);
    if (!ctx) throw new Error ("UseUser debe usarse dentro de un provider")
    return ctx
}