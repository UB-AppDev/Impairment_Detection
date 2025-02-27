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
});
