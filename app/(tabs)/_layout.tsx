import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveColor = '#FFFFFFB3'; // Slightly transparent white for inactive icons

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={24} name="house.fill" color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Temp (Wallet) Tab */}
      <Tabs.Screen
        name="temp"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={24} name="wallet" color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Statistics Tab */}
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={24} name="clock" color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={24} name="person" color={focused ? activeColor : inactiveColor} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#28C76F', // Green background
    height: 70,
    borderTopLeftRadius: 20, // Rounded corners for top of navbar
    borderTopRightRadius: 20,
    position: 'absolute', // Keep navbar floating
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10, // Adjust padding for iOS
    borderTopWidth: 0,
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: 'white', // Active tab background (rounded white)
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
