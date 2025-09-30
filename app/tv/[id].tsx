import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchTVShowDetails } from "@/services/tvshowservice";

const { width } = Dimensions.get("window");

const TVDetail = () => {
  const { id } = useLocalSearchParams();
  const [tvShow, setTVShow] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  useEffect(() => {
    const loadTVShow = async () => {
      const data = await fetchTVShowDetails(Number(id));
      setTVShow(data);

      if (data && data.credits) {
        setCast(data.credits.cast || []);
        setCrew(data.credits.crew || []);
      }
    };
    loadTVShow();
  }, [id]);

  const toggleWatchlist = () => {
    setWatchlist(!watchlist);
    // Store watchlist in AsyncStorage or backend later
  };

  if (!tvShow) {
    return <Text className="text-white text-center mt-10">Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-[#1A1A2E]" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Poster */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }}
        style={{ width: "100%", height: 400 }}
      />

      {/* Title & Info */}
      <View className="p-4">
        <Text className="text-white text-3xl font-bold">{tvShow.name}</Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-400 font-bold">⭐ {tvShow.vote_average}</Text>
          <Text className="text-gray-400 ml-4">{tvShow.first_air_date}</Text>
          <Text className="text-gray-400 ml-4">
            {tvShow.episode_run_time?.[0] || "-"} min
          </Text>
        </View>

        {/* Tags / Genres */}
        <View className="flex-row flex-wrap mt-2">
          {tvShow.genres?.map((genre: any) => (
            <Text key={genre.id} className="text-gray-400 mr-3 bg-[#0F3460] px-2 py-1 rounded">
              {genre.name}
            </Text>
          ))}
        </View>

        {/* Original Language */}
        <Text className="text-gray-400 mt-2">
          Original Language: {tvShow.original_language.toUpperCase()}
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
        <Text className="text-gray-300 mt-2">{tvShow.overview}</Text>

        {/* Staff / Crew */}
        {crew.length > 0 && (
          <>
            <Text className="text-white text-lg font-semibold mt-6">Staff</Text>
            <FlatList
              data={crew.slice(0, 5)}
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
              data={cast.slice(0, 10)}
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

export default TVDetail;
