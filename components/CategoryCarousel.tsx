import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native"; // optional nice arrow

const { width } = Dimensions.get("window");

interface CategoryCarouselProps {
  title: string;
  data: any[];
  seeAllRoute: string;
  type: "movie" | "tv" | "mixed";
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ title, data, seeAllRoute, type }) => {
  const router = useRouter();

  return (
    <View className="mb-8">
      {/* Section Title */}
      <View className="flex-row justify-between items-center px-2 mb-3">
        <Text className="text-white text-xl font-bold">{title}</Text>
        <TouchableOpacity onPress={() => router.push(seeAllRoute)} className="flex-row items-center">
          <Text className="text-blue-400">See All</Text>
          <ChevronRight size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <Carousel
        loop
        width={width * 0.6}
        height={250}
        autoPlay={false}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/${type}/${item.id}`)}
            className="mx-2"
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{
                width: width * 0.55,
                height: 250,
                borderRadius: 12,
              }}
            />
            <Text
              className="text-white mt-2"
              numberOfLines={1}
              style={{ width: width * 0.55 }}
            >
              {item.title || item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryCarousel;
