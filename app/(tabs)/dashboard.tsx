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
        {/* Header Section */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={50} color="black" />
          <View>
            <Text style={styles.headerTitle}>John Doe</Text>
            <Text style={styles.headerSubtitle}>Doctor of Psychology</Text>
          </View>
        </View>

        {/* Container that contains the buttons to navigate towards all out tests */}
        <View style={styles.squircleContainer}>

          {/* Item Accuracy Test */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")} // Redirects to Accuracy
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Item Accuracy" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.squircleItem}
            // onPress={() => navigation.navigate('TestDetail', { testId: 2 })}
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Color Recognition" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.squircleItem}
            // onPress={() => navigation.navigate('TestDetail', { testId: 3 })}
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Spelling Bee" />
          </TouchableOpacity>

          {/* Item Accuracy Test */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")} // Redirects to Accuracy
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Item Accuracy" />
          </TouchableOpacity>

          {/* Item Accuracy Test */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")} // Redirects to Accuracy
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Item Accuracy" />
          </TouchableOpacity>

          {/* Item Accuracy Test */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")} // Redirects to Accuracy
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Item Accuracy" />
          </TouchableOpacity>

          {/* Item Accuracy Test */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")} // Redirects to Accuracy
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Item Accuracy" />
          </TouchableOpacity>

          {/* Item Accuracy Test */}
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => router.push("/(tabs)/(stack)/accuracy")} // Redirects to Accuracy
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Item Accuracy" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Header Section **/
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
