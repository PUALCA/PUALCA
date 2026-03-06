# 🎬 CINEMAX — Aplicación de Películas

Proyecto web desarrollado con **React + Vite** para buscar, explorar y gestionar una lista personal de películas favoritas, consumiendo la API pública de TMDB.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes](#componentes)
- [Servicios](#servicios)
- [Funcionalidades](#funcionalidades)
- [Diseño UI](#diseño-ui)

---

## 🌐 Descripción General

CINEMAX es una SPA (Single Page Application) orientada al entretenimiento que permite a los usuarios explorar el catálogo de películas populares, buscar títulos por nombre, filtrar por género y año, ver trailers y fichas detalladas, y guardar una lista personal de favoritos en el almacenamiento local del navegador.

> ⚠️ **Nota:** Los favoritos se almacenan en `localStorage`. Al limpiar el navegador, la lista se pierde.

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|---|---|---|
| React | ^19.2.0 | Librería principal de UI |
| Vite | ^7.3.1 | Bundler y servidor de desarrollo |
| TMDB API | v3 | Fuente de datos de películas |
| Google Fonts | — | Tipografías Playfair Display y DM Sans |
| CSS-in-JS | — | Estilos por componente con `<style>` tags |

---

## 🚀 Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd movieapp

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

Abrir el navegador en: **http://localhost:5173**

## ▶️ Cómo correr el proyecto desde la terminal

### 1. Abrir la terminal (PowerShell o CMD)

### 2. Navegar a la carpeta del proyecto

```powershell
cd C:\Users\SOFIA\Desktop\pulca\PUALCA
```

### 3. Ejecutar el servidor de desarrollo

```powershell
npx vite --port 5173 --host
```

### 4. Abrir en el navegador

Una vez que aparezca esto en la terminal:

```
VITE v7.3.1  ready in 289 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.10.14.251:5173/
```

Abrir el navegador y entrar a: **http://localhost:5173/**

> 💡 Para detener el servidor, presionar `Ctrl + C` en la terminal.

## 📁 Estructura del Proyecto

```
movieapp/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── App.jsx                  # Componente raíz y lógica principal
    ├── services/
    │   └── tmdb.js              # Funciones de consumo de la API de TMDB
    └── components/
        ├── Header.jsx           # Barra de navegación sticky
        ├── Hero.jsx             # Banner principal con película destacada
        ├── MovieCard.jsx        # Tarjeta individual de película
        └── Modal.jsx            # Ventana de detalle con tráiler
```

---

## 🧩 Componentes

| Componente | Descripción |
|---|---|
| `Header` | Barra sticky con logo, búsqueda animada, filtros de género/año y acceso a Mi Lista |
| `Hero` | Banner a pantalla completa con la película más popular, animación de zoom y botones de acción |
| `MovieCard` | Tarjeta con póster, badge de rating dorado, shimmer al hover y info deslizable |
| `Modal` | Ventana emergente con backdrop, tabs de descripción/tráiler, etiquetas de género y botón de favoritos |

---

## ⚙️ Servicios — `tmdb.js`

Módulo encargado de toda la comunicación con la API de TMDB (`https://api.themoviedb.org/3`).

| Función | Descripción |
|---|---|
| `getPopular()` | Obtiene las películas más populares del momento |
| `getTopRated()` | Obtiene las películas mejor valoradas |
| `getUpcoming()` | Obtiene los próximos estrenos |
| `getMovie(id)` | Obtiene el detalle de una película + videos (tráilers) |
| `searchMovies(query)` | Busca películas por nombre |
| `discover(genre, year)` | Filtra películas por género y/o año |

**Constantes exportadas:**

| Constante | URL base |
|---|---|
| `IMG` | `https://image.tmdb.org/t/p/w500` |
| `BACKDROP` | `https://image.tmdb.org/t/p/original` |

---

## ✨ Funcionalidades

### 1. Explorar Películas Populares
Al cargar la app se muestra la película #1 en el Hero y el grid completo con las más populares del momento.

### 2. Búsqueda por Nombre
La barra de búsqueda del Header se expande con animación al hacer clic. Presionar `Enter` lanza la búsqueda contra la API y actualiza el grid.

### 3. Filtros por Género y Año
Selectores en el Header que disparan una consulta `discover` a la API, ocultando el Hero y mostrando los resultados filtrados.

### 4. Tarjeta de Película
Al pasar el cursor aparecen: badge de rating con color según puntuación (dorado ≥ 7.5), línea dorada decorativa, título y año. Clic abre el Modal.

### 5. Modal de Detalle
Muestra banner, póster, título, puntuación, año, duración y descripción. Tab de **Tráiler** embebe el video de YouTube. Botón para agregar/quitar de Mi Lista.

### 6. Mi Lista (Favoritos)
Los IDs se guardan en `localStorage`. Al acceder a "Mi Lista" desde el Header se cargan los detalles completos de cada favorito guardado.

---

## 🎨 Diseño UI

El diseño sigue una estética **Netflix dark con toques dorados**:

- **Fondo:** `#080808` con el contenido sobre negro profundo
- **Tipografía:** `Playfair Display` (títulos con personalidad) + `DM Sans` (cuerpo legible)
- **Color acento:** gradiente dorado `#C9A84C → #F0D060` usado en logo, badges, bordes activos y botones principales
- **Header:** transparente en el tope, se vuelve sólido con `backdrop-filter: blur` al hacer scroll; borde inferior dorado sutil
- **Hero:** imagen a pantalla completa con zoom animado al cargar, degradado lateral, badge "En tendencia" con borde dorado
- **Cards:** efecto hover con elevación (`translateY`) y borde dorado, shimmer de luz al pasar el cursor
- **Modal:** entrada con animación `scale + translateY`, tabs con indicador dorado, spinner de carga dorado
- **Animaciones:** staggered reveal en el grid de tarjetas, zoom de 12s en el Hero, transiciones suaves en todos los estados