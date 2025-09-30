import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import {
  fetchPopularMovies,
  fetchLatestMovies,
  fetchMoviesByLanguage,
  fetchMoviesByGenre,
} from "@/services/movieservice";
import {
  fetchPopularTVShows,
  fetchLatestTVShows,
  fetchTVByLanguage,
  fetchTVByGenre,
} from "@/services/tvshowservice";

const categoryFetchers: Record<string, () => Promise<any[]>> = {
  latest: async () => [
    ...(await fetchLatestMovies()),
    ...(await fetchLatestTVShows()),
  ],
  "popular-movies": fetchPopularMovies,
  "popular-tv": fetchPopularTVShows,
  english: async () => [
    ...(await fetchMoviesByLanguage("en")),
    ...(await fetchTVByLanguage("en")),
  ],
  korean: async () => [
    ...(await fetchMoviesByLanguage("ko")),
    ...(await fetchTVByLanguage("ko")),
  ],
  chinese: async () => [
    ...(await fetchMoviesByLanguage("zh")),
    ...(await fetchTVByLanguage("zh")),
  ],
  animation: async () => [
    ...(await fetchMoviesByGenre(16)), // genreId 16 = Animation
    ...(await fetchTVByGenre(16)),
  ],
};

const ListPage = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const fetcher = categoryFetchers[category || ""];
      if (fetcher) setItems(await fetcher());
    };
    load();
  }, [category]);

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4 capitalize">
        {category?.replace("-", " ")}
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{ width: 110, height: 160, borderRadius: 8 }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ListPage;
