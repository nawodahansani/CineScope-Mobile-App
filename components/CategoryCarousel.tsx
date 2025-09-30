// import React from "react";
// import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import { useRouter } from "expo-router";
// import { ChevronRight } from "lucide-react-native";

// const { width } = Dimensions.get("window");

// interface CategoryCarouselProps {
//   title: string;
//   data: any[];
//   seeAllRoute: string; // route for "See All"
//   isMovie?: boolean;   // true = movie, false = tv
// }

// const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
//   title,
//   data,
//   seeAllRoute,
//   isMovie = true,
// }) => {
//   const router = useRouter();

//   return (
//     <View className="mb-8">
//       {/* Header */}
//       <View className="flex-row justify-between items-center mb-3 px-2">
//         <Text className="text-white text-xl font-bold">{title}</Text>
//         <TouchableOpacity onPress={() => router.push(seeAllRoute)}>
//           <View className="flex-row items-center">
//             <Text className="text-[#E94560] font-semibold mr-1">See All</Text>
//             <ChevronRight size={18} color="#E94560" />
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* Carousel */}
//       <Carousel
//         loop={false}
//         width={width * 0.45}
//         height={250}
//         data={data}
//         scrollAnimationDuration={600}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() =>
//               router.push(isMovie ? `/movie/${item.id}` : `/tv/${item.id}`)
//             }
//           >
//             <View className="rounded-xl overflow-hidden bg-[#0F3460] mx-2">
//               <Image
//                 source={{
//                   uri: `https://image.tmdb.org/t/p/w500${
//                     item.poster_path || item.backdrop_path
//                   }`,
//                 }}
//                 style={{ width: "100%", height: 200 }}
//                 resizeMode="cover"
//               />
//               <Text
//                 className="text-white text-sm px-2 py-2"
//                 numberOfLines={2}
//               >
//                 {item.title || item.name}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default CategoryCarousel;

import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

interface CategoryCarouselProps {
  title: string;
  data: any[];
  seeAllRoute: string; // route for "See All"
  type: "movie" | "tv" | "mixed";
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  title,
  data,
  seeAllRoute,
  type,
}) => {
  const router = useRouter();

  const handlePress = (item: any) => {
    if (type === "mixed") {
      // If mixed, TMDB returns media_type property
      if (item.media_type === "tv") {
        router.push(`/tv/${item.id}`);
      } else {
        router.push(`/movie/${item.id}`);
      }
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

      {/* Carousel */}
      <Carousel
        loop={false}
        width={width * 0.45}
        height={250}
        data={data}
        scrollAnimationDuration={600}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
          >
            <View className="rounded-xl overflow-hidden bg-[#0F3460] mx-2">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${
                    item.poster_path || item.backdrop_path
                  }`,
                }}
                style={{ width: "100%", height: 200 }}
                resizeMode="cover"
              />
              <Text
                className="text-white text-sm px-2 py-2"
                numberOfLines={2}
              >
                {item.title || item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryCarousel;

