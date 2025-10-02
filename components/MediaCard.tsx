import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { MediaItem } from "@/helpers/normalizeMedia";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

interface MediaCardProps {
  item: MediaItem;
  type: "movie" | "tv" | "mixed";
}

const MediaCard: React.FC<MediaCardProps> = ({ item, type }) => {
  const router = useRouter();

  const handlePress = () => {
    if (!item?.id) return;
    if (type === "mixed") {
      router.push(item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`);
    } else {
      router.push(`/${type}/${item.id}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} className="m-2">
      <View className="rounded-xl overflow-hidden bg-[#0F3460]" style={{ width: width * 0.4 }}>
        <Image
          source={{
            uri: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image",
          }}
          style={{ width: "100%", height: 250 }}
          resizeMode="cover"
        />
        <Text className="text-white text-sm px-2 py-2" numberOfLines={2}>
          {item.title || item.name || "Unknown Title"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MediaCard;
