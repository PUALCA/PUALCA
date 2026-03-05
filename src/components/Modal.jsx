import { useEffect, useState } from "react";
import { getMovie, IMG } from "../services/tmdb";

function Modal({ movieId, onClose, isFavorite, onToggleFavorite }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    setMovie(null);
    getMovie(movieId).then(data => setMovie(data));
  }, [movieId]);

  if (!movieId) return null;

  const trailer = movie?.videos?.results?.find(v => v.type === "Trailer");

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
      <div style={{
        background: "#1a1a2e",
        borderRadius: "12px",
        width: "90%", maxWidth: "850px",
        maxHeight: "90vh", overflowY: "auto",
        padding: "30px", position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "15px", right: "15px",
            background: "#333", border: "none", color: "white",
            borderRadius: "50%", width: "35px", height: "35px",
            fontSize: "16px", cursor: "pointer",
          }}>✖</button>

        {!movie ? (
          <p style={{ color: "white" }}>Cargando...</p>
        ) : (
          <>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              {movie.poster_path && (
                <img
                  src={IMG + movie.poster_path}
                  alt={movie.title}
                  style={{ width: "150px", borderRadius: "8px", flexShrink: 0 }}
                />
              )}
              <div>
                <h2 style={{ color: "white", marginBottom: "10px" }}>{movie.title}</h2>

                {/* BOTÓN FAVORITOS */}
                <button
                  onClick={() => onToggleFavorite(movie.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "10px",
                    background: isFavorite ? "#f5c518" : "#333",
                    color: isFavorite ? "#111" : "white",
                    fontWeight: "bold",
                  }}>
                  {isFavorite ? "⭐ En Mi Lista" : "☆ Agregar a Mi Lista"}
                </button>

                <p style={{ color: "#aaa", marginBottom: "10px", fontSize: "14px" }}>
                  ⭐ {movie.vote_average?.toFixed(1)} · {movie.release_date?.slice(0, 4)} · {movie.runtime} min
                </p>
                <p style={{ color: "#ccc", lineHeight: 1.6 }}>{movie.overview}</p>
              </div>
            </div>

            {trailer ? (
              <iframe
                width="100%" height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
                style={{ borderRadius: "8px", border: "none" }}
              />
            ) : (
              <p style={{ color: "#888" }}>No hay trailer disponible.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;