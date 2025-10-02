// components/CategoryCarousel.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { MediaItem } from "@/helpers/normalizeMedia";

const { width } = Dimensions.get("window");

interface CategoryCarouselProps {
  title: string;
  data: MediaItem[];
  seeAllRoute: string;
  type: "movie" | "tv" | "mixed";
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  title,
  data,
  seeAllRoute,
  type,
}) => {
  const router = useRouter();

  const handlePress = (item: MediaItem) => {
    if (!item?.id) return;

    if (type === "mixed") {
      router.push(item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`);
    } else {
      router.push(`/${type}/${item.id}`);
    }
  };

  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3 px-2">
        <Text className="text-white text-xl font-bold">{title}</Text>
        <TouchableOpacity onPress={() => router.push(seeAllRoute)}>
          <View className="flex-row items-center">
            <Text className="text-[#E94560] font-semibold mr-1">See All</Text>
            <ChevronRight size={18} color="#E94560" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Flat horizontal list */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
          >
            <View className="rounded-xl overflow-hidden bg-[#0F3460] mx-2" style={{ width: width * 0.45 }}>
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image",
                }}
                style={{ width: "100%", height: 200 }}
                resizeMode="cover"
              />
              <Text className="text-white text-sm px-2 py-2" numberOfLines={2}>
                {item.title || item.name || "Unknown Title"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryCarousel;
