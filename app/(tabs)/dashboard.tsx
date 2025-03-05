import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { Squircle } from '@/components/squircle';
import DashboardHeader from '@/components/DashboardHeader';

export default function ProfileScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <DashboardHeader />
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
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
