import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GameHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.headerTitle}>Jane Doe</Text>
                <Text style={styles.headerSubtitle}>Client</Text>
            </View>
            <Ionicons name="person-circle-outline" size={40} color="black" style={styles.icon} />
        </View>
    );
};

export default GameHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
    },
    textContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    headerTitle: {
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: "bold",
        color: "black",
    },
    headerSubtitle: {
        fontSize: 10,
        fontFamily: "Poppins",
        color: "gray",
    },
    icon: {
        marginLeft: 10,
    },
});
