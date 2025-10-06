"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Cambia el idioma en i18next
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={() => changeLanguage("es")}>Español</button>
      <button onClick={() => changeLanguage("en")}>English</button>
    </div>
  );
}
