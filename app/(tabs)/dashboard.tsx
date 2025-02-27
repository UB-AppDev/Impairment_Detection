import React from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Squircle } from '@/components/squircle';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section: Displays the user icon and profile details */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={50} color="black" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>John Doe</Text>
            <Text style={styles.headerSubtitle}>Doctor of Psychology</Text>
          </View>
        </View>

        {/* Game Options Section: Each game is rendered as a Squircle container with a relevant icon */}
        <View style={styles.squircleContainer}>
          {/* Short Term Memory Game */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")}
          >
            <Squircle>
              <Ionicons name="brain-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Short Term Memory Game</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Choice Reaction Gamee */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/stroopGame")}
          >
            <Squircle>
              <Ionicons name="map" size={32} color="black" />
              <Text style={styles.squircleText}>Choice Reaction Game</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Stroop Game */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/stroopGame")}
          >
            <Squircle>
              <Ionicons name="color-palette-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Stroop Game</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Tongue Twister Game */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/tongueTwister")}
          >
            <Squircle>
              <Ionicons name="megaphone-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Tongue Twister Game</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Typing Game */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/typingGame")}
          >
            <Squircle>
              <Ionicons name="keyboard-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Typing Game</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Single Leg Balance */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/singleLegBalance")}
          >
            <Squircle>
              <Ionicons name="walk-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Single Leg Balance</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Walk and Turn Game */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/walkAndTurn")}
          >
            <Squircle>
              <Ionicons name="compass-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Walk and Turn Game</Text>
            </Squircle>
          </TouchableOpacity>

          {/* Eye Tracking Game */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/eyeTracking")}
          >
            <Squircle>
              <Ionicons name="eye-outline" size={32} color="black" />
              <Text style={styles.squircleText}>Eye Tracking Game</Text>
            </Squircle>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Overall screen container styling
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Styling for the scrollable content container
  scrollContent: {
    padding: 20,
  },
  // Header section styling (profile image and text)
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  // Container for all Squircle game options
  squircleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  // Each Squircle item styling (margin between items)
  squircleItem: {
    margin: 10,
  },
  // Text styling within each Squircle container
  squircleText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
