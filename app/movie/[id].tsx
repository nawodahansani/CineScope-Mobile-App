import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchMovieDetails } from "@/services/movieservice";
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  WatchlistItem,
} from "@/helpers/watchlist";

const MovieDetail = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(Number(id));
        setMovie(data);

        if (data?.credits) {
          setCast(data.credits.cast || []);
          setCrew(data.credits.crew || []);
        }

        const exists = await isInWatchlist(Number(id), "movie");
        setWatchlist(exists);
      } catch (error) {
        console.error("Error loading movie details:", error);
      }
    };
    loadMovie();
  }, [id]);

  const toggleWatchlist = async () => {
    if (!movie) return;
    const item: WatchlistItem = {
      id: movie.id,
      media_type: "movie",
      title: movie.title || "Untitled",
      poster_path: movie.poster_path || null,
      backdrop_path: movie.backdrop_path || null,
    };

    if (watchlist) {
      await removeFromWatchlist(movie.id, "movie");
    } else {
      await addToWatchlist(item);
    }
    setWatchlist(!watchlist);
  };

  if (!movie) {
    return <Text className="text-white text-center mt-10">Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-[#1A1A2E]" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Poster */}
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",
        }}
        style={{ width: "100%", height: 600 }}
        resizeMode="contain"
      />

      {/* Title & Info */}
      <View className="p-4">
        <Text className="text-white text-3xl font-bold">
          {movie.title || "Untitled Movie"}
        </Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-400 font-bold">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </Text>
          <Text className="text-gray-400 ml-4">
            {movie.release_date || "Unknown"}
          </Text>
          <Text className="text-gray-400 ml-4">
            {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </Text>
        </View>

        {/* Genres */}
        <View className="flex-row flex-wrap mt-2">
          {movie.genres?.length > 0 ? (
            movie.genres.map((genre: any) => (
              <Text
                key={`genre-${genre.id}`}
                className="text-gray-400 mr-3 bg-[#0F3460] px-2 py-1 rounded"
              >
                {genre.name}
              </Text>
            ))
          ) : (
            <Text className="text-gray-400">No genres available</Text>
          )}
        </View>

        {/* Language */}
        <Text className="text-gray-400 mt-2">
          Original Language:{" "}
          {movie.original_language
            ? movie.original_language.toUpperCase()
            : "Unknown"}
        </Text>

        {/* Watchlist Button */}
        <TouchableOpacity
          onPress={toggleWatchlist}
          className="bg-[#E94560] rounded-xl py-3 px-4 mt-4 w-40 items-center"
        >
          <Text className="text-white font-bold">
            {watchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Text>
        </TouchableOpacity>

        {/* Overview */}
        <Text className="text-white text-lg font-semibold mt-6">Overview</Text>
        <Text className="text-gray-300 mt-2">
          {movie.overview || "No overview available."}
        </Text>

        {/* Crew */}
        {crew.length > 0 && (
          <>
            <Text className="text-white text-lg font-semibold mt-6">Staff</Text>
            <FlatList
              data={crew.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) =>
                `${item.id || index}-${item.job || "crew"}`
              }
              renderItem={({ item }) => (
                <View className="mr-4 mt-2 items-center">
                  {item.profile_path ? (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w200${item.profile_path}`,
                      }}
                      style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                  ) : (
                    <View className="bg-gray-600 w-20 h-20 rounded-full flex items-center justify-center">
                      <Text className="text-white text-xs">N/A</Text>
                    </View>
                  )}
                  <Text className="text-white text-sm mt-2 text-center">
                    {item.name || "Unknown"}
                  </Text>
                  <Text className="text-gray-400 text-xs text-center">
                    {item.job || ""}
                  </Text>
                </View>
              )}
            />
          </>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <>
            <Text className="text-white text-lg font-semibold mt-6">
              Top Billed Cast
            </Text>
            <FlatList
              data={cast.slice(0, 10)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) =>
                `${item.cast_id || item.credit_id || index}-cast`
              }
              renderItem={({ item }) => (
                <View className="mr-4 mt-2 items-center">
                  {item.profile_path ? (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w200${item.profile_path}`,
                      }}
                      style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                  ) : (
                    <View className="bg-gray-600 w-20 h-20 rounded-full flex items-center justify-center">
                      <Text className="text-white text-xs">N/A</Text>
                    </View>
                  )}
                  <Text className="text-white text-sm mt-2 text-center">
                    {item.name || "Unknown"}
                  </Text>
                  <Text className="text-gray-400 text-xs text-center">
                    {item.character || ""}
                  </Text>
                </View>
              )}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetail;
