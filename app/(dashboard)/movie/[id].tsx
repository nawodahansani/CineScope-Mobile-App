import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchMovieDetails } from "@/services/movieservice";

const MovieDetail = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(Number(id));
      setMovie(data);
    };
    loadMovie();
  }, [id]);

  if (!movie) {
    return <Text className="text-white">Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-[#1A1A2E] p-4">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ width: "100%", height: 400, borderRadius: 10 }}
      />
      <Text className="text-white text-3xl font-bold mt-4">{movie.title}</Text>
      <Text className="text-gray-300 mt-2">{movie.overview}</Text>
      <Text className="text-[#E94560] mt-4">⭐ {movie.vote_average}</Text>
      <Text className="text-gray-400 mt-2">Release Date: {movie.release_date}</Text>
    </ScrollView>
  );
};

export default MovieDetail;
