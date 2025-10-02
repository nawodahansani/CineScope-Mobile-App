import AsyncStorage from "@react-native-async-storage/async-storage";

const WATCHLIST_KEY = "WATCHLIST";

export type WatchlistItem = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
};

export const getWatchlist = async (): Promise<WatchlistItem[]> => {
  const json = await AsyncStorage.getItem(WATCHLIST_KEY);
  return json ? JSON.parse(json) : [];
};

export const addToWatchlist = async (item: WatchlistItem) => {
  const list = await getWatchlist();
  list.push(item);
  await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const removeFromWatchlist = async (id: number, media_type: "movie" | "tv") => {
  const list = await getWatchlist();
  const newList = list.filter(
    (item) => !(item.id === id && item.media_type === media_type)
  );
  await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
};

export const isInWatchlist = async (id: number, media_type: "movie" | "tv") => {
  const list = await getWatchlist();
  return list.some((item) => item.id === id && item.media_type === media_type);
};

export const getWatchlistCount = async () => {
    const list = await getWatchlist();
    return list.length;
};
