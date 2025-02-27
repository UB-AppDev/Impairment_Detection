import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface SquircleProps {
  imageUri: string;
  text: string;
}

export function Squircle({ imageUri, text }: SquircleProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20, // Adjust to achieve the "squircle" look
    width: 120,
    height: 120,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Android shadow
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30, // Make the image circular
    marginBottom: 8,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
