"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useUser } from '@/app/components/Context';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { SONG_BANK } from '@/data/song';

export default function FavSongsPage() {
  const { t } = useTranslation();
  const { FavAlbums, SetFavAlbums } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const uniqueAlbums = SONG_BANK.reduce((acc, song) => {
    if (!acc.find(item => item.album === song.album)) {
      acc.push(song);
    }
    return acc;
  }, [] as typeof SONG_BANK);

  const filteredAlbums = searchTerm
    ? uniqueAlbums.filter(song => 
        song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : uniqueAlbums;

  useEffect(() => {
    if (currentIndex >= filteredAlbums.length) {
      setCurrentIndex(0);
    }
  }, [filteredAlbums.length, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredAlbums.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredAlbums.length - 1 ? 0 : prev + 1));
  };

  const toggleAlbum = (albumName: string) => {
    if (FavAlbums.includes(albumName)) {
      SetFavAlbums(FavAlbums.filter(a => a !== albumName));
    } else {
      SetFavAlbums([...FavAlbums, albumName]);
    }
  };

  const isAlbumSelected = (albumName: string) => FavAlbums.includes(albumName);

  const getVisibleAlbums = () => {
    if (filteredAlbums.length === 0) return [];
    if (filteredAlbums.length === 1) return [0];
    if (filteredAlbums.length === 2) return [0, 1];
    
    const prev = currentIndex === 0 ? filteredAlbums.length - 1 : currentIndex - 1;
    const next = currentIndex === filteredAlbums.length - 1 ? 0 : currentIndex + 1;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleAlbums();

  if (filteredAlbums.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900">
        <div className="max-w-6xl mx-auto px-8 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-16">
            <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/50">
              <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-purple-900 rotate-90 ml-0.5"></div>
            </div>
            <span className="text-white text-2xl font-bold tracking-wider">MusicBox</span>
          </div>

          <h1 className="text-6xl font-extrabold text-white mb-6 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent">
            {t('favSongs.title')}
          </h1>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            {t('favSongs.subtitle')}
          </p>
          
          <div className="relative max-w-md mx-auto mb-12">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('favSongs.searchPlaceholder')}
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-lime-400/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 focus:shadow-lg focus:shadow-lime-400/25 transition-all"
            />
          </div>
          
          <div className="mt-20 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-md mx-auto">
            <p className="text-gray-300 text-lg">No se encontraron álbumes</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-center gap-2 mb-16">
          <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/50">
            <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-purple-900 rotate-90 ml-0.5"></div>
          </div>
          <span className="text-white text-2xl font-bold tracking-wider">MusicBox</span>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-white mb-6 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent">
            {t('favSongs.title')}
          </h1>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            {t('favSongs.subtitle')}
          </p>

          <div className="flex items-center justify-between max-w-4xl mx-auto gap-8">
            <span className="text-gray-400 text-lg">{t('favSongs.searchPrompt')}</span>
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('favSongs.searchPlaceholder')}
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-lime-400/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 focus:shadow-lg focus:shadow-lime-400/25 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="relative mb-20">
          <div className="flex items-center justify-center gap-12">
            <button
              onClick={handlePrevious}
              className="text-lime-400/60 hover:text-lime-400 hover:scale-110 transition-all p-3 rounded-full hover:bg-white/5 disabled:opacity-30"
              disabled={filteredAlbums.length <= 1}
            >
              <ChevronLeft size={90} strokeWidth={2.5} />
            </button>

            <div className="flex items-center justify-center gap-10 min-h-[450px] relative">
              {visibleIndices.map((index, i) => {
                const song = filteredAlbums[index];
                const isCenter = index === currentIndex;
                const isSelected = isAlbumSelected(song.album);

                return (
                  <div
                    key={`album-${song.album}-${index}-${i}`}
                    className={`transition-all duration-500 ${
                      isCenter 
                        ? 'scale-110 z-20 opacity-100' 
                        : 'scale-90 opacity-40 z-10 blur-[2px]'
                    }`}
                  >
                    <div className="relative group cursor-pointer">
                      <div className={`w-[350px] h-[350px] rounded-3xl overflow-hidden shadow-2xl border-4 transition-all duration-300 ${
                        isSelected 
                          ? 'border-lime-400 shadow-lime-400/50 shadow-2xl' 
                          : 'border-white/10 hover:border-white/30'
                      }`}>
                        <Image
                          src={song.cover}
                          alt={song.album}
                          width={350}
                          height={350}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute top-5 right-5 w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/50 animate-pulse">
                            <Check size={32} className="text-purple-900" strokeWidth={3.5} />
                          </div>
                        )}
                      </div>
                      
                      {isCenter && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-lime-400/20 blur-xl rounded-full"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="text-lime-400/60 hover:text-lime-400 hover:scale-110 transition-all p-3 rounded-full hover:bg-white/5 disabled:opacity-30"
              disabled={filteredAlbums.length <= 1}
            >
              <ChevronRight size={90} strokeWidth={2.5} />
            </button>
          </div>

          <div className="text-center mt-16 space-y-3">
            <h2 className="text-4xl font-bold text-white">
              {filteredAlbums[currentIndex]?.album}
            </h2>
            <p className="text-lime-400 text-xl font-medium">
              {filteredAlbums[currentIndex]?.artist}
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => toggleAlbum(filteredAlbums[currentIndex].album)}
              className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                isAlbumSelected(filteredAlbums[currentIndex].album)
                  ? 'bg-purple-600 text-white border-3 border-lime-400 shadow-lg shadow-lime-400/30 hover:shadow-lime-400/50'
                  : 'bg-lime-400 text-purple-900 hover:bg-lime-300 hover:scale-105 shadow-lg shadow-lime-400/50'
              }`}
            >
              {isAlbumSelected(filteredAlbums[currentIndex].album) 
                ? t('favSongs.removeButton')
                : t('favSongs.addButton')
              }
            </button>
          </div>

          <div className="text-center mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-xs mx-auto">
            <p className="text-gray-300 text-lg">
              <span className="text-lime-400 font-bold text-2xl">{FavAlbums.length}</span> {t('favSongs.albumsSelected')}
            </p>
          </div>

          <div className="flex justify-end mt-12">
            <Link href="/FavArtists">
              <button className="px-14 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-400 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50">
                {t('favSongs.continueButton')} →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}