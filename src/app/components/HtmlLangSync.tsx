"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function HtmlLangSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Cada vez que cambia el idioma en i18n, actualizamos el <html lang="">
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null; // No muestra nada en la interfaz
}
