import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;
  const inactiveColor = "#FFFFFFB3"; // Slightly transparent white for inactive icons

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false, // No header in tab screens
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={24} color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Wallet Tab */}
      <Tabs.Screen
        name="temp"
        options={{
          title: "Wallet",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="wallet-outline" size={24} color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Statistics Tab */}
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="stats-chart-outline" size={24} color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-outline" size={24} color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Stack Navigator for Accuracy & TOC */}
      <Tabs.Screen name="(stack)" options={{ headerShown: false }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#28C76F", // Green background
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Platform.OS === "ios" ? 30 : 10,
    borderTopWidth: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
});
