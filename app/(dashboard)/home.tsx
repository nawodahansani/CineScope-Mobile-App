// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
// import { fetchPopularMovies } from "@/services/movieservice";
// import { useRouter } from "expo-router";

// const home = () => {
//   const [movies, setMovies] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const loadMovies = async () => {
//       const data = await fetchPopularMovies();
//       setMovies(data);
//     };
//     loadMovies();
//   }, []);

//   return (
//     <View className="flex-1 bg-[#1A1A2E] p-4">
//       <Text className="text-white text-2xl font-bold mb-4">Popular Movies</Text>
      
//       <FlatList
//         data={movies}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => router.push(`/movie/${item.id}`)}>
//             <View className="mb-4">
//               <Image
//                 source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
//                 style={{ width: 120, height: 180, borderRadius: 10 }}
//               />
//               <Text className="text-white mt-2 w-28">{item.title}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default home;

import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Dimensions, ScrollView } from "react-native";
import {
  fetchPopularMovies,
  fetchLatestMovies,
  fetchMoviesByLanguage,
  fetchMoviesByGenre,
  fetchTrendingMovies
} from "@/services/movieservice";
import {
  fetchPopularTVShows,
  fetchLatestTVShows,
  fetchTVByLanguage,
  fetchTVByGenre
} from "@/services/tvshowservice";
import CategoryCarousel from "@/components/CategoryCarousel";

const { width, height } = Dimensions.get("window");

const home = () => {
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [latest, setLatest] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [popularTV, setPopularTV] = useState<any[]>([]);
  const [english, setEnglish] = useState<any[]>([]);
  const [korean, setKorean] = useState<any[]>([]);
  const [chinese, setChinese] = useState<any[]>([]);
  const [animation, setAnimation] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const trending = await fetchTrendingMovies();
      setHeroMovie(trending[0]); // use first trending movie for hero

      const latestMovies = await fetchLatestMovies();
      const latestTV = await fetchLatestTVShows();
      setLatest([...latestMovies.slice(0,6), ...latestTV.slice(0, 6)]); // mix

      setPopularMovies(await fetchPopularMovies());
      setPopularTV(await fetchPopularTVShows());

      const englishMovies = await fetchMoviesByLanguage("en");
      const englishTV = await fetchTVByLanguage("en");
      setEnglish([...englishMovies, ...englishTV]);

      const koreanMovies = await fetchMoviesByLanguage("ko");
      const koreanTV = await fetchTVByLanguage("ko");
      setKorean([...koreanMovies, ...koreanTV]);

      const chineseMovies = await fetchMoviesByLanguage("zh");
      const chineseTV = await fetchTVByLanguage("zh");
      setChinese([...chineseMovies, ...chineseTV]);

      const animationMovies = await fetchMoviesByGenre(16); // genreId 16 = Animation
      const animationTV = await fetchTVByGenre(16);
      setAnimation([...animationMovies, ...animationTV]);
    };

    loadData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-black">
      {/* Hero Section */}
      {heroMovie && (
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`,
          }}
          style={{ width, height: 250, justifyContent: "center" }}
          blurRadius={6}
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

      {/* Carousels */}
      <View className="px-2 mt-6">
        <CategoryCarousel
          title="Latest Updates"
          data={latest}
          seeAllRoute="/list/latest"
          type="mixed"
        />
        <CategoryCarousel
          title="Popular Movies"
          data={popularMovies}
          seeAllRoute="/list/popular-movies"
          type="movie"
        />
        <CategoryCarousel
          title="Popular TV Shows"
          data={popularTV}
          seeAllRoute="/list/popular-tv"
          type="tv"
        />
        <CategoryCarousel
          title="English Entertainment"
          data={english}
          seeAllRoute="/list/english"
          type="mixed"
        />
        <CategoryCarousel
          title="Korean Entertainment"
          data={korean}
          seeAllRoute="/list/korean"
          type="mixed"
        />
        <CategoryCarousel
          title="Chinese Entertainment"
          data={chinese}
          seeAllRoute="/list/chinese"
          type="mixed"
        />
        <CategoryCarousel
          title="Animation"
          data={animation}
          seeAllRoute="/list/animation"
          type="mixed"
        />
      </View>
    </ScrollView>
  );
};

export default home;

