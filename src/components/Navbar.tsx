"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import { useEffect } from "react";

const NAV = [
  { name: "Inicio", href: "/" },
  { name: "Album", href: "/album" },
  { name: "Artista", href: "/artista" },
  { name: "Géneros", href: "/generos" },
  { name: "Mapa", href: "/mapa" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { mobileOpen, toggleMobile, closeMobile } = useUIStore();

  // Cierra el menú al navegar
  useEffect(() => {
    closeMobile();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 text-white backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-3 w-3 rounded-full bg-neon" />
          <span className="font-semibold tracking-wide">MUSICBOX</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "relative transition-colors",
                    active ? "text-neon" : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-neon rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Botón ingresar (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/ingresar"
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg
             font-semibold uppercase tracking-wide
             bg-[#B6FF52] text-black ring-1 ring-black/10
             shadow-[0_0_14px_rgba(184,255,60,.25)]
             hover:shadow-[0_0_28px_rgba(184,255,60,.55)]
             transition-all duration-200"
          >
            INGRESAR
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          onClick={toggleMobile}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <div
        className={[
          "md:hidden overflow-hidden transition-[max-height] duration-300",
          mobileOpen ? "max-h-96" : "max-h-0",
        ].join(" ")}
      >
        <ul className="space-y-2 border-t border-white/10 px-4 py-3">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "block rounded-md px-3 py-2",
                    active
                      ? "bg-white/10 text-neon"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li className="pt-1">
            <Link
              href="/ingresar"
              className="inline-flex items-center justify-center px-6 py-2 rounded-lg
             font-semibold uppercase tracking-wide
             bg-[#B6FF52] text-black ring-1 ring-black/10
             shadow-[0_0_14px_rgba(184,255,60,.25)]
             hover:shadow-[0_0_28px_rgba(184,255,60,.55)]
             transition-all duration-200"
            >
              INGRESAR
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
