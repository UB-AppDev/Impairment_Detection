import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const activeColor = Colors[colorScheme ?? "light"].tint;
    const inactiveColor = "#FFFFFFB3";

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: activeColor,
                tabBarInactiveTintColor: inactiveColor,
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.label,
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name="home-outline" size={24} color={focused ? activeColor : color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="statistics"
                options={{
                    title: "Statistics",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name="stats-chart-outline" size={24} color={focused ? activeColor : color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name="person-outline" size={24} color={focused ? activeColor : color} />
                    ),
                }}
            />
            {/* Hiding navigation to Memory Change Games */}
            <Tabs.Screen
                name="(stack)/MemoryCheck/TermsOfConditons"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/MemoryCheck/Game"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/MemoryCheck/GameInfo"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/MemoryCheck/memorycheckgame"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />

             {/* Hiding navigation to Sroop Name */}
             <Tabs.Screen
                name="(stack)/StroopNaming/TermsOfConditons"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/StroopNaming/Game"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/StroopNaming/GameInfo"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/StroopNaming/memorycheckgame"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />

            {/* Hiding navigation to Walk and Turn */}
            <Tabs.Screen
                name="(stack)/WalkandTurn/TermsOfConditons"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/WalkandTurn/Game"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/WalkandTurn/GameInfo"                
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/WalkandTurn/memorycheckgame"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />

            {/* Hiding navigation to Typing Challange */}
            <Tabs.Screen
                name="(stack)/TypingChallenge/TermsOfConditons"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/TypingChallenge/Game"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/TypingChallenge/GameInfo"                
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            <Tabs.Screen
                name="(stack)/TypingChallenge/memorycheckgame"
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
            


        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#25D366",
        height: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: Platform.OS === "ios" ? 30 : 10,
        borderTopWidth: 0,
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 2,
    },
});
