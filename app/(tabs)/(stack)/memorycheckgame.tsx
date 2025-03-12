import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GameHeader from "@/components/GameHeader";

export default function MemoryCheckGame() {
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelection = (item) => {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    return (
        <View style={styles.screenContainer}>
            <GameHeader />

            <View style={styles.carouselBox}>
                <Text style={styles.carouselText}>Identify the items correctly!</Text>
                <View style={styles.iconGrid}>
                    {["horse", "bug", "horse", "horse", "horse", "boat", "horse", "horse", "horse"].map(
                        (icon, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => toggleSelection(index)}
                            >
                                <Ionicons
                                    name={`${icon}-outline`}
                                    size={50}
                                    color={selectedItems.includes(index) ? "white" : "black"}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        )
                    )}
                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
                {["1", "2", "3", "4"].map((num) => (
                    <View key={num} style={styles.progressItem}>
                        <Text style={styles.progressText}>{num}</Text>
                        <Text style={styles.progressLabel}>Question {num}</Text>
                        <View style={styles.progressStatus}>
                            <Text style={styles.statusText}>In Progress</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
    },
    carouselBox: {
        backgroundColor: "#28C76F",
        width: "100%",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    carouselText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    iconGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
    },
    icon: {
        margin: 5,
    },
    submitButton: {
        backgroundColor: "#fff",
        width: "80%",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#28C76F",
        fontSize: 16,
        fontWeight: "bold",
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    progressItem: {
        alignItems: "center",
    },
    progressText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    progressLabel: {
        fontSize: 12,
        color: "gray",
    },
    progressStatus: {
        backgroundColor: "#2C6BED",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5,
    },
    statusText: {
        color: "white",
        fontSize: 12,
    },
});

