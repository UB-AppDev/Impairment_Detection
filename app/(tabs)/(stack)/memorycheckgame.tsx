import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import GameHeader from "@/components/GameHeader";
import { randomizeIcons } from "@/logic/Randomizer";
import ProgressTracker from "@/components/ProgressTracker";

export default function MemoryCheckGame() {
    const { correctIcons } = useLocalSearchParams();
    const [selectedItems, setSelectedItems] = useState([]);
    const [iconsGrid, setIconsGrid] = useState(randomizeIcons());
    const [currentStep, setCurrentStep] = useState(0);
    const [correctSelections, setCorrectSelections] = useState([]);

    const toggleSelection = (icon, index) => {
        setSelectedItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );

        if (correctIcons.includes(icon) && !correctSelections.includes(icon)) {
            setCorrectSelections((prev) => [...prev, icon]);
        }
    };

    const handleSubmit = () => {
        setIconsGrid(randomizeIcons());
        setSelectedItems([]);
        setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
    };

    return (
        <View style={styles.screenContainer}>
            <GameHeader />

            <View style={styles.carouselBox}>
                <Text style={styles.carouselText}>Identify the items correctly!</Text>
                <View style={styles.iconGrid}>
                    {iconsGrid.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((icon, colIndex) => {
                                const index = rowIndex * 3 + colIndex;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => toggleSelection(icon, index)}
                                        style={[
                                            styles.iconWrapper,
                                            correctSelections.includes(icon) && styles.correctSelection,
                                        ]}
                                    >
                                        <FontAwesome5
                                            name={icon}
                                            size={50}
                                            color={selectedItems.includes(index) ? "white" : "black"}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <ProgressTracker currentStep={currentStep} />
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
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    iconWrapper: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    correctSelection: {
        backgroundColor: "#25D366",
        borderRadius: 10,
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
});