import { TMDB_API_KEY } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results; // array of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Search movies
export const searchMovies = async (query: string, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Latest Movies
export const fetchLatestMovies = async (page = 1) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=release_date.desc&primary_release_date.lte=${today}&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return [];
  }
};

//get movies by genre - animation
export const fetchMoviesByGenre = async (genreId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};

//get movies by original language - korean and chinese
export const fetchMoviesByLanguage = async (langCode: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=${langCode}&sort_by=popularity.desc`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by language:", error);
    return [];
  }
};

// Fetch trending movies (day or week)
export const fetchTrendingMovies = async (timeWindow: "day" | "week" = "day") => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
