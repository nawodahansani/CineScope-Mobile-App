import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Search, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInUp, Layout } from "react-native-reanimated";

import { searchMovies } from "@/services/movieservice";
import { searchTVShows } from "@/services/tvshowservice";

const { width } = Dimensions.get("window");

const TAGS = [
  "Action", "Comedy", "Drama", "Horror", "Romance",
  "Animation", "Korean", "Chinese", "English",
];

const search = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const search = async (searchQuery: string, pageNumber = 1) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const movies = await searchMovies(searchQuery, pageNumber);
      const tvShows = await searchTVShows(searchQuery, pageNumber);

      const combinedResults =
        pageNumber === 1
          ? [...movies, ...tvShows]
          : [...results, ...movies, ...tvShows];

      setResults(combinedResults);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setPage(1);
    search(query, 1);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setQuery(tag);
    setPage(1);
    search(tag, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    search(query, nextPage);
  };

  const renderTag = (tag: string, index: number) => (
    <Animated.View
      entering={FadeIn.delay(index * 50)}
      key={tag}
    >
      <TouchableOpacity
        className={`px-4 py-2 rounded-full border ${selectedTag === tag ? "bg-[#E94560]" : "bg-[#0F3460]"} mr-2 mb-2`}
        onPress={() => handleTagSelect(tag)}
      >
        <Text className="text-white">{tag}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderItem = ({ item, index }: any) => (
    <Animated.View
      layout={Layout.springify()}
      entering={FadeInUp.delay(index * 50)}
    >
      <TouchableOpacity
        className="m-2"
        activeOpacity={0.8}
        onPress={() =>
          item.title
            ? router.push(`/movie/${item.id}`)
            : router.push(`/tv/${item.id}`)
        }
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`,
          }}
          style={{
            width: width * 0.45,
            height: 230,
            borderRadius: 10,
          }}
        />
        <Text className="text-white mt-2 w-36 font-semibold">
          {item.title || item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-black p-4">
      {/* Search Bar */}
      <View className="flex-row items-center bg-[#0F3460] rounded-full px-4 py-2 mb-4">
        <Search color="#D1D1D1" size={20} />
        <TextInput
          className="flex-1 text-white ml-2"
          placeholder="Search movies & TV shows"
          placeholderTextColor="#D1D1D1"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        {query ? (
          <TouchableOpacity
            onPress={() => {
              setQuery("");
              setResults([]);
            }}
          >
            <X color="#D1D1D1" size={20} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Animated Tags */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        <View className="flex-row flex-wrap">
          {TAGS.map(renderTag)}
        </View>
      </ScrollView>

      {/* Results */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#E94560" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#E94560" /> : null
          }
        />
      )}
    </View>
  );
};

export default search;
