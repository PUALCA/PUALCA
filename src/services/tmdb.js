const BASE = "https://api.themoviedb.org/3";
const KEY = "f89c0f97d60283d588ac5228f4db0090";

export const IMG = "https://image.tmdb.org/t/p/w500";
export const BACKDROP = "https://image.tmdb.org/t/p/original";

async function get(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("language", "es-ES");
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
  const res = await fetch(url);
  return res.json();
}

export const getPopular  = () => get("/movie/popular");
export const getTopRated = () => get("/movie/top_rated");
export const getUpcoming = () => get("/movie/upcoming");
export const getMovie    = (id) => get(`/movie/${id}`, { append_to_response: "videos" });
export const searchMovies = (query) => get("/search/movie", { query });
export const discover    = (genre, year) => get("/discover/movie", {
  with_genres: genre,
  primary_release_year: year,
  sort_by: "popularity.desc"
});