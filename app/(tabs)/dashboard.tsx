import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from "expo-router";
import DashboardHeader from '@/components/DashboardHeader';

export default function ProfileScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <DashboardHeader />
          <View style={styles.squircleContainer}>
            {testItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.squircleItem}
                    onPress={() => router.push(item.route)}
                >
                  <View style={styles.squircleBox}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
            ))}
          </View>
      </View>
  );
}

const testItems = [
  { text: "Memory Check", image: require("@/assets/images/memorycheck.png"), route: "/(tabs)/(stack)/MemoryCheck/GameInfo" },
  { text: "Stroop Naming", image: require("@/assets/images/stropnaming.png"), route: "/(tabs)/(stack)/StroopNaming/GameInfo" },
  { text: "Typing Challenge", image: require("@/assets/images/typingchallenge.png"), route: "/(tabs)/(stack)/TypingChallenge/GameInfo" },
  { text: "Walk and Turn", image: require("@/assets/images/memorycheck.png"), route: "/(tabs)/(stack)/WalkandTurn/GameInfo" },
  { text: "Choice Reaction", image: require("@/assets/images/memorycheck.png"), route: "/(tabs)/(stack)/accuracy" },
  { text: "Tongue Twisters", image: require("@/assets/images/memorycheck.png"), route: "/(tabs)/(stack)/accuracy" },
  { text: "Single Leg Balance", image: require("@/assets/images/memorycheck.png"), route: "/(tabs)/(stack)/accuracy" },
  { text: "Visual Pursuit", image: require("@/assets/images/memorycheck.png"), route: "/(tabs)/(stack)/accuracy" }
];

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  squircleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  // Each Squircle item styling (margin between items)
  squircleItem: {
    margin: 10,
    alignItems: 'center',
  },
  squircleBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 130,
    height: 150,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '300',
    color: '#25D366',
    marginTop: 5,
    textAlign: 'center',
  },
});

