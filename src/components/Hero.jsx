
import { BACKDROP } from "../services/tmdb";

function Hero({ movie, onPlay }) {
  if (!movie) return null;

  return (
    <div style={{
      height: "75vh",
      backgroundImage: `url(${BACKDROP + movie.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "flex-end",
      padding: "50px",
      position: "relative",
    }}>
      {/* Gradiente oscuro abajo */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, #111 10%, transparent 70%)",
      }} />

      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
        <h2 style={{ fontSize: "2.5rem", color: "white", marginBottom: "10px" }}>
          {movie.title}
        </h2>
        <p style={{ color: "#ccc", marginBottom: "20px", lineHeight: 1.6 }}>
          {movie.overview?.substring(0, 200)}...
        </p>
        <button
          onClick={() => onPlay(movie.id)}
          style={{
            padding: "10px 25px",
            background: "white",
            color: "#111",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}>
          ▶ Ver ahora
        </button>
      </div>
    </div>
  );
}

export default Hero;