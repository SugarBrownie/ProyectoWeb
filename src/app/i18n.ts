
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {

    es :{
        translation: {

        }
    },
    en :{
        translation: {
           
        }
    }
};

if (!i18n.isInitialized) {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            lng: "es",
            fallbackLng: "es",
            supportedLngs : ["es", "en"],
            nonExplicitSupportedLngs: true,
            detection: {
                order: ["querystring", "navigator", "cookie", "localStorage"],
                caches: []
            },
            interpolation: {
                escapeValue: false
            },
            debug: false
        });
}

export default i18n;

