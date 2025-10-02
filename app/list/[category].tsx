// app/list/[category].tsx
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
import { normalizeMedia, MediaItem } from "@/helpers/normalizeMedia";
import { useRouter } from "expo-router";

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
    ...(await fetchMoviesByGenre(16)),
    ...(await fetchTVByGenre(16)),
  ],
};

const ListPage = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [items, setItems] = useState<MediaItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const fetcher = categoryFetchers[category || ""];
      if (fetcher) {
        const rawItems = await fetcher();
        setItems(
          rawItems.map((item) =>
            normalizeMedia(item, item.media_type || (item.title ? "movie" : "tv"))
          )
        );
      }
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
  keyExtractor={(item, index) => `${item.type}-${item.id}` || index.toString()}
  numColumns={3}
  columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/${item.type}/${item.id}`)}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <Image
          source={{
            uri: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/150x225?text=No+Image",
          }}
          style={{ width: 110, height: 160, borderRadius: 8 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 12,
            marginTop: 4,
            textAlign: "center",
            width: 110,
          }}
          numberOfLines={2}
        >
          {item.title || item.name || "Unknown Title"}
        </Text>
      </View>
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

export default ListPage;
