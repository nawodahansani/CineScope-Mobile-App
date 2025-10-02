// app/(dashboard)/home.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Dimensions, ScrollView } from "react-native";
import {
  fetchPopularMovies,
  fetchLatestMovies,
  fetchMoviesByLanguage,
  fetchMoviesByGenre,
  fetchTrendingMovies,
} from "@/services/movieservice";
import {
  fetchPopularTVShows,
  fetchLatestTVShows,
  fetchTVByLanguage,
  fetchTVByGenre,
} from "@/services/tvshowservice";
import CategoryCarousel from "@/components/CategoryCarousel";
import { normalizeMedia, MediaItem } from "@/helpers/normalizeMedia";

const { width, height } = Dimensions.get("window");

const home = () => {
  const [heroMovie, setHeroMovie] = useState<MediaItem | null>(null);
  const [latest, setLatest] = useState<MediaItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
  const [popularTV, setPopularTV] = useState<MediaItem[]>([]);
  const [english, setEnglish] = useState<MediaItem[]>([]);
  const [korean, setKorean] = useState<MediaItem[]>([]);
  const [chinese, setChinese] = useState<MediaItem[]>([]);
  const [animation, setAnimation] = useState<MediaItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const trending = await fetchTrendingMovies();
      setHeroMovie(normalizeMedia(trending[0], trending[0]?.media_type || "movie"));

      const latestMovies = await fetchLatestMovies();
      const latestTV = await fetchLatestTVShows();
      setLatest(
        [...latestMovies, ...latestTV].map((i) =>
          normalizeMedia(i, i.media_type || (i.title ? "movie" : "tv"))
        )
      );

      setPopularMovies(
        (await fetchPopularMovies()).map((i: any) => normalizeMedia(i, "movie"))
      );
      setPopularTV(
        (await fetchPopularTVShows()).map((i: any) => normalizeMedia(i, "tv"))
      );

      setEnglish(
        [
          ...(await fetchMoviesByLanguage("en")),
          ...(await fetchTVByLanguage("en")),
        ].map((i) => normalizeMedia(i, i.media_type || (i.title ? "movie" : "tv")))
      );

      setKorean(
        [
          ...(await fetchMoviesByLanguage("ko")),
          ...(await fetchTVByLanguage("ko")),
        ].map((i) => normalizeMedia(i, i.media_type || (i.title ? "movie" : "tv")))
      );

      setChinese(
        [
          ...(await fetchMoviesByLanguage("zh")),
          ...(await fetchTVByLanguage("zh")),
        ].map((i) => normalizeMedia(i, i.media_type || (i.title ? "movie" : "tv")))
      );

      setAnimation(
        [
          ...(await fetchMoviesByGenre(16)),
          ...(await fetchTVByGenre(16)),
        ].map((i) => normalizeMedia(i, i.media_type || (i.title ? "movie" : "tv")))
      );
    };

    loadData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-[#1A1A2E]">
      {heroMovie && (
        <ImageBackground
          source={{
            uri: heroMovie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
              : "https://via.placeholder.com/800x400?text=No+Image",
          }}
          style={{ width, height: 250, justifyContent: "center" }}
          blurRadius={1.5}
        >
          <View className="bg-black/50 h-full justify-center items-center px-4">
            <Text className="text-white text-2xl font-bold text-center">
              Welcome to CineScope!
            </Text>
            <Text className="text-gray-300 mt-2 text-center">
              Dive into movie world with us...
            </Text>
          </View>
        </ImageBackground>
      )}

      <View className="px-2 mt-6">
        <CategoryCarousel title="Latest Updates" data={latest} seeAllRoute="/list/latest" type="mixed" />
        <CategoryCarousel title="Popular Movies" data={popularMovies} seeAllRoute="/list/popular-movies" type="movie" />
        <CategoryCarousel title="Popular TV Shows" data={popularTV} seeAllRoute="/list/popular-tv" type="tv" />
        <CategoryCarousel title="English" data={english} seeAllRoute="/list/english" type="mixed" />
        <CategoryCarousel title="Korean" data={korean} seeAllRoute="/list/korean" type="mixed" />
        <CategoryCarousel title="Chinese" data={chinese} seeAllRoute="/list/chinese" type="mixed" />
        <CategoryCarousel title="Animation" data={animation} seeAllRoute="/list/animation" type="mixed" />
      </View>
    </ScrollView>
  );
};

export default home;
