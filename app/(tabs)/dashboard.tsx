import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from "expo-router";
import DashboardHeader from '@/components/DashboardHeader';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <DashboardHeader />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.squircleContainer}>
            {testItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.squircleItem}
                    onPress={() => router.push(item.route)}
                >
                  <View style={styles.squircleBox}>
                    <FontAwesome5 name={item.icon} size={50} color="#25D366" />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
  );
}

const testItems = [
  { text: "Memory Check", icon: "brain", route: "/(tabs)/(stack)/MemoryCheck/GameInfo" },
  { text: "Stroop Naming", icon: "font", route: "/(tabs)/(stack)/StroopNaming/GameInfo" },
  { text: "Typing Challenge", icon: "keyboard", route: "/(tabs)/(stack)/TypingChallenge/GameInfo" },
  { text: "Walk and Turn", icon: "walking", route: "/(tabs)/(stack)/WalkandTurn/GameInfo" },
  { text: "Choice Reaction", icon: "hand-paper", route: "/(tabs)/(stack)/accuracy" },
  { text: "Tongue Twisters", icon: "comment-dots", route: "/(tabs)/(stack)/accuracy" },
  { text: "Single Leg Balance", icon: "balance-scale", route: "/(tabs)/(stack)/accuracy" },
  { text: "Visual Pursuit", icon: "eye", route: "/(tabs)/(stack)/accuracy" }
];

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
    marginTop: 10,
  },
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
  text: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '300',
    color: '#25D366',
    marginTop: 5,
    textAlign: 'center',
  },
});