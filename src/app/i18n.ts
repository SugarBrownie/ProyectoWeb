import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    es: {
        translation: {
            signup: {
                title: "Regístrate",
                subtitle: "Disfruta de la mejor colección de música de tu elección, inicia sesión ahora",
                emailLabel: "Correo Electrónico",
                emailPlaceholder: "willie.jennings@ejemplo.com",
                passwordLabel: "Contraseña",
                passwordPlaceholder: "Mínimo 8 caracteres requeridos",
                confirmPasswordLabel: "Confirmar Contraseña",
                acceptText: "Acepto los",
                termsOfUse: "Términos de uso",
                and: "y la",
                subscription: "Suscripción",
                signUpButton: "Registrarse",
                orLoginWith: "O, inicia sesión con tu correo",
                alreadyHaveAccount: "¿Ya tienes una cuenta?",
                logIn: "Iniciar Sesión",
                passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
                passwordMismatch: "Las contraseñas no coinciden",
                acceptTermsRequired: "Por favor acepta los términos y condiciones",
                accountCreated: "¡Cuenta creada exitosamente!"
            },
            favSongs: {
                title: "Conozcámonos",
                subtitle: "Elige tus artistas, canciones y álbumes favoritos para que podamos empezar a trabajar para ti",
                searchPrompt: "¿Buscas otro álbum?",
                searchPlaceholder: "Buscar",
                albumLabel: "Álbum",
                addButton: "Agregar",
                removeButton: "Eliminar",
                selectedCount: "{{count}} álbum(es) seleccionado(s)",
                continueButton: "Artistas",
                albumsSelected: "Albums Seleccionados"
            },
            favArtists: {
                title: "Tus Artistas Favoritos",
                subtitle: "Selecciona los artistas que más te gustan para personalizar tu experiencia",
                searchPrompt: "¿Buscas otro artista?",
                searchPlaceholder: "Buscar artista...",
                addButton: "Agregar",
                removeButton: "Quitar",
                artistsSelected: "artistas seleccionados",
                continueButton: "Continuar"
            }
        }
    },
    en: {
        translation: {
            signup: {
                title: "Sign Up",
                subtitle: "Enjoy the best music collection of your choice, login now",
                emailLabel: "Email Address",
                emailPlaceholder: "willie.jennings@example.com",
                passwordLabel: "Password",
                passwordPlaceholder: "8+ characters required",
                confirmPasswordLabel: "Confirm Password",
                acceptText: "I accept the",
                termsOfUse: "Terms of use",
                and: "and",
                subscription: "Subscription",
                signUpButton: "Sign Up",
                orLoginWith: "Or, login with your email",
                alreadyHaveAccount: "Already have an account?",
                logIn: "Log In",
                passwordMinLength: "Password must be at least 8 characters",
                passwordMismatch: "Passwords don't match!",
                acceptTermsRequired: "Please accept the terms and conditions",
                accountCreated: "Account created successfully!"
            },
            favSongs: {
                title: "Let us meet you",
                subtitle: "Choose your favorite artists, songs and albums so we can start working for you",
                searchPrompt: "Searching for another album?",
                searchPlaceholder: "Search",
                albumLabel: "Album",
                addButton: "Add",
                removeButton: "Remove",
                selectedCount: "{{count}} album(s) selected",
                continueButton: "Artists",
                albumsSelected: "Albums Selected"
            },
            favArtists: {
                title: "Your Favorite Artists",
                subtitle: "Select the artists you love the most to personalize your experience",
                searchPrompt: "Looking for another artist?",
                searchPlaceholder: "Search artist...",
                addButton: "Add",
                removeButton: "Remove",
                artistsSelected: "artists selected",
                continueButton: "Continue"
            }
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
            supportedLngs: ["es", "en"],
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