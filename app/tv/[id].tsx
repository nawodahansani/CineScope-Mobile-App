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
import { fetchTVShowDetails } from "@/services/tvshowservice";
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  WatchlistItem,
} from "@/helpers/watchlist";

const TVDetail = () => {
  const { id } = useLocalSearchParams();
  const [tv, setTv] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  useEffect(() => {
    const loadTv = async () => {
      try {
        const data = await fetchTVShowDetails(Number(id));
        setTv(data);

        if (data?.credits) {
          setCast(data.credits.cast || []);
          setCrew(data.credits.crew || []);
        }

        const exists = await isInWatchlist(Number(id), "tv");
        setWatchlist(exists);
      } catch (error) {
        console.error("Error loading TV details:", error);
      }
    };
    loadTv();
  }, [id]);

  const toggleWatchlist = async () => {
    if (!tv) return;
    const item: WatchlistItem = {
      id: tv.id,
      media_type: "tv",
      title: tv.name || "Untitled",
      poster_path: tv.poster_path || null,
      backdrop_path: tv.backdrop_path || null,
    };

    if (watchlist) {
      await removeFromWatchlist(tv.id, "tv");
    } else {
      await addToWatchlist(item);
    }
    setWatchlist(!watchlist);
  };

  if (!tv) {
    return <Text className="text-white text-center mt-10">Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-[#1A1A2E]" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Poster */}
      <Image
        source={{
          uri: tv.poster_path
            ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",
        }}
        style={{ width: "100%", height: 600 }}
        resizeMode="contain"
      />

      {/* Title & Info */}
      <View className="p-4">
        <Text className="text-white text-3xl font-bold">
          {tv.name || "Untitled TV Show"}
        </Text>

        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-400 font-bold">
            ⭐ {tv.vote_average ? tv.vote_average.toFixed(1) : "N/A"}
          </Text>
          <Text className="text-gray-400 ml-4">
            {tv.first_air_date || "Unknown"}
          </Text>
          <Text className="text-gray-400 ml-4">
            {tv.number_of_seasons
              ? `${tv.number_of_seasons} Seasons`
              : "N/A"}
          </Text>
        </View>

        {/* Genres */}
        <View className="flex-row flex-wrap mt-2">
          {tv.genres?.length > 0 ? (
            tv.genres.map((genre: any) => (
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
          {tv.original_language
            ? tv.original_language.toUpperCase()
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
          {tv.overview || "No overview available."}
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

export default TVDetail;
