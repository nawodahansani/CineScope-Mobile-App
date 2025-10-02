

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = "10e88da95091b20b90f5bb59cfa99376";


// Fetch popular TV shows
export const fetchPopularTVShows = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
};

// Fetch TV show details by ID
export const fetchTVShowDetails = async (tvId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    return null;
  }
};

// Search TV shows
export const searchTVShows = async (query: string, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return [];
  }
};

// Latest TV Shows
export const fetchLatestTVShows = async (page = 1) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=first_air_date.desc&first_air_date.lte=${today}&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching latest TV shows:", error);
    return [];
  }
};

// Get TV shows by genre - animation
export const fetchTVByGenre = async (genreId: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows by genre:", error);
    return [];
  }
};

// Get TV shows by original language - korean and chinese
export const fetchTVByLanguage = async (langCode: string) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=${langCode}&sort_by=release_date.desc&first_air_date.lte=${today}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows by language:", error);
    return [];
  }
};
