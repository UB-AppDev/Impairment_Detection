import React from 'react';
import { Squircle } from '@/components/squircle';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header or other components can go here */}
        <ThemedText type="title" style={styles.darkText}>
          Dashboard
        </ThemedText>
        <View style={styles.squircleContainer}>
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => navigation.navigate('TestDetail', { testId: 1 })}
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 1" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => navigation.navigate('TestDetail', { testId: 2 })}
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.squircleItem}
            onPress={() => navigation.navigate('TestDetail', { testId: 3 })}
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 3" />
          </TouchableOpacity>
          {/* Add additional Squircle buttons as needed */}
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
