import React from 'react';
import { Squircle } from '@/components/squircle';
import { ThemedText } from '@/components/ThemedText';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={50} color="black" />
            <View>
              <Text style={styles.headerTitle}>John Doe</Text>
              <Text style={styles.headerSubtitle}>Doctor of Psychology</Text>
            </View>
          </View>

          <View style={styles.squircleContainer}>
            <TouchableOpacity
                style={styles.squircleItem}
                onPress={() => router.push("/(tabs)/(stack)/accuracy")}
            >
              <Squircle imageUri="https://via.placeholder.com/200" text="Memory Check" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.squircleItem}>
              <Squircle imageUri="https://via.placeholder.com/200" text="Stroop Naming" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.squircleItem}>
              <Squircle imageUri="https://via.placeholder.com/200" text="Typing Challenge" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.squircleItem}
                onPress={() => router.push("/(tabs)/(stack)/accuracy")}
            >
              <Squircle imageUri="https://via.placeholder.com/200" text="Walk and Turn" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.squircleItem}
                onPress={() => router.push("/(tabs)/(stack)/accuracy")}
            >
              <Squircle imageUri="https://via.placeholder.com/200" text="Choice Reaction" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.squircleItem}
                onPress={() => router.push("/(tabs)/(stack)/accuracy")}
            >
              <Squircle imageUri="https://via.placeholder.com/200" text="Tongue Twisters" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.squircleItem}
                onPress={() => router.push("/(tabs)/(stack)/accuracy")}
            >
              <Squircle imageUri="https://via.placeholder.com/200" text="Single Leg Balance" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.squircleItem}
                onPress={() => router.push("/(tabs)/(stack)/accuracy")}
            >
              <Squircle imageUri="https://via.placeholder.com/200" text="Visual Pursuit" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  darkText: {
    color: '#000',
  },
  squircleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  squircleItem: {
    margin: 10,
  },
});
