import { IMG } from "../services/tmdb";

function MovieCard({ movie, onClick }) {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        .movie-card {
          position: relative;
          min-width: 150px;
          cursor: pointer;
          border-radius: 6px;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease;
        }

        .movie-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07);
        }

        .movie-card__poster {
          width: 100%;
          display: block;
          aspect-ratio: 2/3;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .movie-card:hover .movie-card__poster {
          transform: scale(1.06);
        }

        .movie-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.95) 0%,
            rgba(0,0,0,0.4) 45%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .movie-card:hover .movie-card__overlay {
          opacity: 1;
        }

        .movie-card__info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 12px 12px;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }

        .movie-card:hover .movie-card__info {
          transform: translateY(0);
          opacity: 1;
        }

        .movie-card__title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 6px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .movie-card__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
        }

        .movie-card__rating {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #e8c97a;
          font-weight: 500;
        }

        .movie-card__rating svg {
          width: 10px;
          height: 10px;
          fill: #e8c97a;
        }

        .movie-card__dot {
          width: 2px;
          height: 2px;
          background: rgba(255,255,255,0.35);
          border-radius: 50%;
        }

        .movie-card__shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.05) 50%,
            transparent 60%
          );
          transition: left 0.6s ease;
          pointer-events: none;
        }

        .movie-card:hover .movie-card__shimmer {
          left: 160%;
        }

        .movie-card__placeholder {
          width: 100%;
          aspect-ratio: 2/3;
          background: linear-gradient(135deg, #1a1a1a 0%, #111 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .movie-card__placeholder svg {
          width: 32px;
          height: 32px;
          opacity: 0.2;
          fill: #fff;
        }
      `}</style>

      <div className="movie-card" onClick={() => onClick(movie.id)}>
        {movie.poster_path ? (
          <img
            className="movie-card__poster"
            src={IMG + movie.poster_path}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="movie-card__placeholder">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4h-4z"/>
            </svg>
          </div>
        )}

        <div className="movie-card__shimmer" />
        <div className="movie-card__overlay" />

        <div className="movie-card__info">
          <p className="movie-card__title">{movie.title}</p>
          <div className="movie-card__meta">
            {rating && (
              <span className="movie-card__rating">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {rating}
              </span>
            )}
            {rating && year && <span className="movie-card__dot" />}
            {year && <span>{year}</span>}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;