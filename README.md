This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

Antes de compilar nuestra aplicación, es necesario instalar las siguientes dependencias para que funcione correctamente:

npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest jest-environment-jsdom

npm install --save-dev cypress

npm install zustand

npm install -D tailwindcss postcss autoprefixer 

npm i lucide-react

Una vez tengamos las dependencias, podremos ejecutar nuestro front con:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Y abrir a pagina web en el navegador en:
[http://localhost:3000](http://localhost:3000) 

## Pruebas

Para ejecutar nuestras pruebas unitarias, ejecutaremos el comando

npm test

y esperamos el resultado en consola.


En cuando a las pruebas E2E, ejecutamos el comando 

npx cypress run

y esperamos el resultado en consola.

## Docker

Primero construimos la imagen de nuestro Docker con el comando:

docker build -t music-box .

Una vez creada la imagen, corremos el contenedor con el comando:

docker run -p 3000:3000 music-box

## Internacionalización

Para nuestro frontend, manejamos dos idiomas principales: **inglés** y **español**, implementando la funcionalidad de cambio dinámico mediante la librería i18next junto con react-i18next.

El cambio de idioma se realiza a través de un botón que ejecuta `toggle.language()`, el cual utiliza la instancia de `i18n` para actualizar automáticamente todos los textos visibles en la interfaz sin necesidad de recargar la página.

Los textos traducidos se almacenan en dos diccionarios(uno por cada idioma) definidos como constantes dentro del archivo `src/i18n.ts`, dentro del objeto `resources`.  
De esta forma, cada elemento de la interfaz puede acceder de forma interactiva al idioma activo, permitiendo ofrecer una experiencia más inclusiva y adaptable a los usuarios.

## Coherencia con Figma

El desarrollo del proyecto mantiene una coherencia visual y estructural sólida con los mockups diseñados en Figma, replicando la jerarquía visual, el uso de tipografías, los gradientes de fondo, las tarjetas interactivas y la disposición general de los componentes en pantalla.

Durante el proceso de implementación, se realizaron algunos ajustes menores y se omitieron ciertos elementos visuales debido a limitaciones de tiempo y priorización de la funcionalidad principal.
Las secciones no implementadas correspondían a elementos puramente decorativos o complementarios que no afectaban el flujo funcional ni la experiencia del usuario dentro de la aplicación.

A pesar de estos cambios, se preservaron los aspectos más relevantes del diseño original:

* Distribución de secciones (Navbar, Detalle, Listados, Reseñas).
* Paleta de colores y gradientes coherentes con el estilo propuesto.
* Tipografía y espaciados similares a los definidos en Figma.
* Componentes reutilizables con estructura modular que permiten mantener consistencia visual entre vistas.

En conclusión, el código refleja fielmente las decisiones de diseño más importantes del mockup, asegurando coherencia estética y funcional, aun cuando algunos detalles secundarios fueron simplificados para optimizar el tiempo de desarrollo y la entrega final.

## Uso de React: estado, contexto y hooks
El proyecto implementa una gestión de estado y comunicación de componentes moderna y eficiente, haciendo uso extensivo de hooks de React (useState, useEffect, useMemo, useRef) y de una arquitectura de estado global basada en Zustand, una librería ligera que sustituye la complejidad del Context tradicional cuando la aplicación crece en tamaño.

### Estado local

Los componentes mantienen estados internos para la interacción inmediata del usuario (por ejemplo, el control de rating, hover de estrellas, y los inputs de comentarios).
Se utilizan useState y useEffect para:

* Controlar inputs y formularios en tiempo real.
* Administrar animaciones o efectos de interfaz reactivos.
* Manejar eventos como clics y desplazamientos.

### Estado global y contexto

El proyecto incorpora un estado global unificado mediante Zustand, que actúa como una capa de contexto para compartir datos entre componentes sin prop drilling.
Esto se aplica, por ejemplo, a:

* La canción o álbum actualmente seleccionados (currentSong, currentAlbum).
* Las reseñas asociadas a cada entidad, almacenadas dinámicamente sin necesidad de persistencia externa.

El store permite que cualquier componente pueda leer o modificar el estado global mediante hooks personalizados (useSongStore, useAlbumStore), promoviendo la modularidad y la reutilización.

### Hooks personalizados y componentes reutilizables

Se definieron stores y componentes basados en hooks reutilizables:
* useSongStore y useAlbumStore centralizan la lógica del estado y exponen acciones simples como addReview, setCurrentSong o resetFeedback.
* Componentes como Reviews y ReviewsAlbum son totalmente desacoplados y reutilizables, ya que se alimentan únicamente del store y de props.
* Se aplican useMemo y useRef en componentes de scroll horizontal para optimizar el rendimiento y evitar renders innecesarios.

### Justificación técnica

El uso combinado de estado local, estado global y hooks reutilizables permite cumplir con los principios de React en cuanto a:

* Encapsulamiento: cada componente gestiona solo la parte del estado que le corresponde.
* Reactividad: las vistas se actualizan automáticamente al cambiar los datos globales.
* Escalabilidad: el uso de Zustand evita la sobrecarga del Context API y simplifica la extensión futura (por ejemplo, persistencia o integración con backend).

Gracias a esta arquitectura, el manejo del estado es coherente, mantenible y completamente alineado con las mejores prácticas de React, asegurando una aplicación modular, escalable y fácil de depurar.


## Accesibilidad

Accesibilidad en código

El desarrollo de la aplicación se realizó siguiendo buenas prácticas de accesibilidad web (WCAG 2.1 AA), asegurando que la interfaz sea comprensible y navegable para todo tipo de usuarios.
Se incorporaron medidas específicas relacionadas con el uso de idioma, estructura semántica, formularios accesibles, navegación por roles y mensajes claros de interacción.

### Idioma y semántica

* El atributo de idioma (lang="es") se define a nivel del documento para facilitar la lectura por tecnologías asistivas.
* Se emplearon etiquetas semánticas como header, section, form, ul, button y label para mantener una estructura clara del contenido.
* Los títulos y encabezados (h1, h2, etc.) siguen una jerarquía lógica que mejora la comprensión por lectores de pantalla.

### Formularios y componentes accesibles

* Los campos de texto incluyen etiquetas descriptivas (label for="comment") y placeholder informativos para orientar al usuario sobre la acción esperada.
* Los botones cuentan con texto legible y roles explícitos (type="submit", aria-label) para garantizar su reconocimiento por herramientas de asistencia.
* En los componentes interactivos como las estrellas de calificación, se utilizan atributos aria-label y eventos de teclado (onKeyDown) que permiten la interacción sin necesidad del ratón.

### Navegación por roles y mensajes claros

* Los componentes principales (Navbar, Detalle, Map, Reseñas) están organizados por secciones con roles semánticos (role="navigation", role="button", role="listitem") para mejorar la navegación por tabulador y lectores de pantalla.
* Los mensajes de retroalimentación (como los formularios de reseña) presentan texto claro y conciso, evitando ambigüedades.
* Los elementos visuales relevantes (imágenes, íconos y portadas) incluyen atributos alt descriptivos para facilitar su interpretación.

### Justificación técnica

El enfoque de accesibilidad se aplicó sin comprometer la estética del diseño original de Figma.
Los elementos visuales se enriquecieron con información semántica y atributos ARIA cuando fue necesario, manteniendo una experiencia inclusiva tanto para usuarios con dispositivos de asistencia como para quienes navegan únicamente con el teclado.

De esta manera, la aplicación cumple con los principios de accesibilidad de React y HTML5:

Perceptible: todo elemento tiene una descripción o texto alternativo.

Operable: todos los controles pueden usarse con teclado.

Comprensible: los textos, labels y mensajes son claros.

Robusto: la semántica del DOM permite compatibilidad con lectores de pantalla.


