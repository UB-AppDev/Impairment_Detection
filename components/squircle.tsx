import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SquircleProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function Squircle({ children, style }: SquircleProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 120,
    height: 120,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
