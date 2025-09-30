import { TMDB_API_KEY } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularTVShowsFetch = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
};

export const fetchTVShowDetailsFetch = async (tvId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    return null;
  }
};

export const searchTVShowsFetch = async (query: string, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching TV shows:", error);
    return [];
  }
};
