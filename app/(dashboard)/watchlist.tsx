import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { getWatchlist, WatchlistItem } from "@/helpers/watchlist";

const { width } = Dimensions.get("window");

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const router = useRouter();

  const loadWatchlist = async () => {
    const list = await getWatchlist();
    setWatchlist(list);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const goToDetail = (item: WatchlistItem) => {
    if (item.media_type === "movie") {
      router.push(`/movie/${item.id}`);
    } else {
      router.push(`/tv/${item.id}`);
    }
  };

  const renderItem = ({ item }: { item: WatchlistItem }) => (
    <TouchableOpacity
      onPress={() => goToDetail(item)}
      style={{
        width: (width - 48) / 3, // 3 items per row with spacing
        backgroundColor: "#0F3460",  
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={{ width: "100%", height: 160, borderRadius: 8 }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 12,
          marginTop: 5,
          textAlign: "center",
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.title || item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#1A1A2E]">
      <Text className="text-white text-2xl font-bold p-4">My Watchlist</Text>
      {watchlist.length === 0 ? (
        <Text className="text-[#E94560] text-center mt-10">
          Your watchlist is empty.
        </Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => `${item.media_type}-${item.id}`}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Watchlist;
