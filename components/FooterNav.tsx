import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";

const tabs = [
  { label: "Home", path: "/home", icon: "home-outline" },
  { label: "Search", path: "/search", icon: "search-outline" },
  { label: "Watchlist", path: "/watchlist", icon: "heart-outline" },
  { label: "Settings", path: "/setting", icon: "settings-outline" },
];

const FooterNav = () => {
  const router = useRouter();
  const segment = useSegments();

  const activeRouter = "/" + (segment[0] || "");

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.path === activeRouter;

        return (
          <Pressable
            key={tab.path}
            style={[styles.tabButton, isActive && styles.activeTab]}
            onPress={() => router.push(tab.path)}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? "#E94560" : "#ccc"}
            />
            <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default FooterNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#1A1A2E",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: "#E94560",
  },
  tabLabel: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 2,
  },
  activeLabel: {
    color: "#E94560",
    fontWeight: "bold",
  },
});
