// import React, { useEffect, useState } from "react";
// import { View, Text, Image, ScrollView } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { fetchMovieDetails } from "@/services/movieservice";

// const MovieDetail = () => {
//   const { id } = useLocalSearchParams();
//   const [movie, setMovie] = useState<any>(null);

//   useEffect(() => {
//     const loadMovie = async () => {
//       const data = await fetchMovieDetails(Number(id));
//       setMovie(data);
//     };
//     loadMovie();
//   }, [id]);

//   if (!movie) {
//     return <Text className="text-white">Loading...</Text>;
//   }

//   return (
//     <ScrollView className="flex-1 bg-[#1A1A2E] p-4">
//       <Image
//         source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
//         style={{ width: "100%", height: 400, borderRadius: 10 }}
//       />
//       <Text className="text-white text-3xl font-bold mt-4">{movie.title}</Text>
//       <Text className="text-gray-300 mt-2">{movie.overview}</Text>
//       <Text className="text-[#E94560] mt-4">⭐ {movie.vote_average}</Text>
//       <Text className="text-gray-400 mt-2">Release Date: {movie.release_date}</Text>
//     </ScrollView>
//   );
// };

// export default MovieDetail;

import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchMovieDetails } from "@/services/movieservice";

const { width } = Dimensions.get("window");

const MovieDetail = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(Number(id));
      setMovie(data);

      // Cast & Crew
      if (data && data.credits) {
        setCast(data.credits.cast || []);
        setCrew(data.credits.crew || []);
      }
    };
    loadMovie();
  }, [id]);

  const toggleWatchlist = () => {
    setWatchlist(!watchlist);
    // Here you can also store watchlist in AsyncStorage or API
  };

  if (!movie) {
    return <Text className="text-white text-center mt-10">Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-[#1A1A2E]" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Poster */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ width: "100%", height: 400 }}
      />

      {/* Title & Info */}
      <View className="p-4">
        <Text className="text-white text-3xl font-bold">{movie.title}</Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-400 font-bold">⭐ {movie.vote_average}</Text>
          <Text className="text-gray-400 ml-4">{movie.release_date}</Text>
          <Text className="text-gray-400 ml-4">{movie.runtime} min</Text>
        </View>

        {/* Tags / Genres */}
        <View className="flex-row flex-wrap mt-2">
          {movie.genres?.map((genre: any) => (
            <Text key={genre.id} className="text-gray-400 mr-3 bg-[#0F3460] px-2 py-1 rounded">
              {genre.name}
            </Text>
          ))}
        </View>

        {/* Original Language */}
        <Text className="text-gray-400 mt-2">
          Original Language: {movie.original_language.toUpperCase()}
        </Text>

        {/* Add to Watchlist */}
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
        <Text className="text-gray-300 mt-2">{movie.overview}</Text>

        {/* Staff / Crew */}
        {crew.length > 0 && (
          <>
            <Text className="text-white text-lg font-semibold mt-6">Staff</Text>
            <FlatList
              data={crew.slice(0, 5)} // Top crew members
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="mr-4 mt-2 items-center">
                  {item.profile_path ? (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
                      style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                  ) : (
                    <View className="bg-gray-600 w-20 h-20 rounded-full flex items-center justify-center">
                      <Text className="text-white">N/A</Text>
                    </View>
                  )}
                  <Text className="text-white text-sm mt-2 text-center">{item.name}</Text>
                  <Text className="text-gray-400 text-xs text-center">{item.job}</Text>
                </View>
              )}
            />
          </>
        )}

        {/* Top Billed Cast */}
        {cast.length > 0 && (
          <>
            <Text className="text-white text-lg font-semibold mt-6">Top Billed Cast</Text>
            <FlatList
              data={cast.slice(0, 10)} // Top 10 cast
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.cast_id.toString()}
              renderItem={({ item }) => (
                <View className="mr-4 mt-2 items-center">
                  {item.profile_path ? (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
                      style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                  ) : (
                    <View className="bg-gray-600 w-20 h-20 rounded-full flex items-center justify-center">
                      <Text className="text-white">N/A</Text>
                    </View>
                  )}
                  <Text className="text-white text-sm mt-2 text-center">{item.name}</Text>
                  <Text className="text-gray-400 text-xs text-center">{item.character}</Text>
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

