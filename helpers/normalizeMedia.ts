// helpers/normalizeMedia.ts
export type MediaItem = {
  id: number;
  type: "movie" | "tv";
  poster_path?: string;
  backdrop_path?: string;
  title?: string;
  name?: string;
  media_type?: string;
};

export const normalizeMedia = (item: any, type?: "movie" | "tv"): MediaItem => ({
  id: item.id ?? Math.floor(Math.random() * 1000000),
  type: type ?? (item.title ? "movie" : "tv"),
  poster_path: item.poster_path ?? null,
  backdrop_path: item.backdrop_path ?? null,
  title: item.title ?? null,
  name: item.name ?? null,
  media_type: item.media_type ?? type ?? (item.title ? "movie" : "tv"),
});
