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

import { searchMovies } from "@/services/movieservice";
import { searchTVShows } from "@/services/tvshowservice";

const { width } = Dimensions.get("window");

const TAGS = [
  "Action", "Adventure", "Comedy", "Drama", "Horror", "Romance",
  "Animation", "Korean", "Chinese", "English", "Crime", "Fantasy",
  "Mystery", "Sci-Fi", "Thriller", "Western", "Documentary"
];

const SearchPage = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [defaultContent, setDefaultContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const loadDefaultContent = async () => {
      setLoading(true);
      try {
        const movies = await searchMovies("popular", 1);
        const tvShows = await searchTVShows("popular", 1);
        setDefaultContent([...movies, ...tvShows]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    loadDefaultContent();
  }, []);

  const search = async (searchQuery: string, pageNumber = 1, sortNewest = false) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const movies = await searchMovies(searchQuery, pageNumber);
      const tvShows = await searchTVShows(searchQuery, pageNumber);

      const combinedResults =
        pageNumber === 1
          ? [...movies, ...tvShows]
          : [...results, ...movies, ...tvShows];

      if (sortNewest) {
        combinedResults.sort((a, b) => {
          const dateA = new Date(a.release_date || a.first_air_date || 0).getTime();
          const dateB = new Date(b.release_date || b.first_air_date || 0).getTime();
          return dateB - dateA;
        });
      }

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
    search(tag, 1, true);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    search(query, nextPage, !!selectedTag);
  };

  const renderTag = (tag: string) => (
    <TouchableOpacity
      key={tag}
      className={`px-4 py-2 rounded-full ${
        selectedTag === tag ? "bg-[#E94560]" : "bg-[#0F3460]"
      } mr-2 mb-2`}
      onPress={() => handleTagSelect(tag)}
    >
      <Text className="text-white">{tag}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: any) => (
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
  );

  return (
    <View className="flex-1 bg-[#1A1A2E] p-4">
      <FlatList
        data={results.length > 0 ? results : defaultContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
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
                    setSelectedTag(null);
                  }}
                >
                  <X color="#D1D1D1" size={20} />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* Tags */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="flex-row flex-wrap px-2">
                {TAGS.map(renderTag)}
              </View>
            </ScrollView>
          </>
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#E94560" /> : null
        }
      />
    </View>
  );
};

export default SearchPage;
