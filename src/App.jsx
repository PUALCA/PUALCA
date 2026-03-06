import { useEffect, useState } from "react";
import { getPopular, searchMovies, discover, getMovie } from "./services/tmdb";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";
import Modal from "./components/Modal";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showHero, setShowHero] = useState(true);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [filters, setFilters] = useState({ genre: "", year: "" });

  useEffect(() => {
    getPopular().then(data => setMovies(data.results));
  }, []);

  useEffect(() => {
    if (!filters.genre && !filters.year) return;
    setShowHero(false);
    discover(filters.genre, filters.year).then(data => setMovies(data.results));
  }, [filters]);

  function handleSearch(query) {
    if (!query.trim()) return;
    setShowHero(false);
    searchMovies(query).then(data => setMovies(data.results));
  }

  function handleFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function handleHome() {
    setShowHero(true);
    setFilters({ genre: "", year: "" });
    getPopular().then(data => setMovies(data.results));
  }

  async function handleFavorites() {
    setShowHero(false);
    if (favorites.length === 0) { setMovies([]); return; }
    const results = await Promise.all(favorites.map(id => getMovie(id)));
    setMovies(results);
  }

  function toggleFavorite(id) {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div style={{ background: "#111", minHeight: "100vh", width: "100%" }}>
      <Header
        onSearch={handleSearch}
        onFilter={handleFilter}
        onHome={handleHome}
        onFavorites={handleFavorites}
      />

      {showHero && movies.length > 0 && (
        <Hero movie={movies[0]} onPlay={setSelectedId} />
      )}

      {movies.length === 0 && !showHero && (
        <p style={{ color: "#888", padding: "40px", textAlign: "center", fontSize: "18px" }}>
          No tienes películas en tu lista aún.
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "16px",
        padding: "30px 40px",
        width: "100%",
        boxSizing: "border-box",
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={setSelectedId} />
        ))}
      </div>

      <Modal
        movieId={selectedId}
        onClose={() => setSelectedId(null)}
        isFavorite={favorites.includes(selectedId)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;