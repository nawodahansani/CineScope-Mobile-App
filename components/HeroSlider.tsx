import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";

const { width } = Dimensions.get("window");

interface Slide {
  text: string;
  image: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];

  return (
    <ImageBackground
      source={{ uri: currentSlide.image }}
      style={styles.imageBackground}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>{currentSlide.text}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HeroSlider;
