import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import GameHeader from "@/components/GameHeader";
import { randomizeIcons, selectCorrectIcons } from "@/logic/Randomizer";
import ProgressTracker from "@/components/ProgressTracker";

export default function MemoryCheckGame() {
    const { correctIcons: passedCorrectIcons } = useLocalSearchParams();
    const [selectedItems, setSelectedItems] = useState([]);
    const [iconsGrid, setIconsGrid] = useState(randomizeIcons());
    const [correctIcons, setCorrectIcons] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [incorrectSelections, setIncorrectSelections] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [buttonText, setButtonText] = useState("Submit");

    useEffect(() => {
        setCorrectIcons(selectCorrectIcons(iconsGrid));
    }, [iconsGrid]);

    const toggleSelection = (icon, index) => {
        if (!showFeedback) {
            setSelectedItems((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        }
    };

    const resetGame = () => {
        setIconsGrid(randomizeIcons());
        setSelectedItems([]);
        setIncorrectSelections([]);
        setShowFeedback(false);
        setButtonText("Submit");
        setCorrectIcons(selectCorrectIcons(iconsGrid));
    };

    const handleSubmit = () => {
        if (buttonText === "Proceed") {
            setProgressStatus((prev) =>
                prev.map((status, index) => (index === currentStep ? "failed" : status))
            );
            resetGame();
            return;
        }

        const selectedIcons = selectedItems.map((index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            return iconsGrid[row][col];
        });

        const allCorrect =
            correctIcons.length &&
            selectedIcons.length === correctIcons.length &&
            correctIcons.every((icon) => selectedIcons.includes(icon));

        if (allCorrect) {
            setProgressStatus((prev) =>
                prev.map((status, index) => (index === currentStep ? "completed" : status))
            );
            setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
            resetGame();
        } else {
            setProgressStatus((prev) =>
                prev.map((status, index) => (index === currentStep ? "failed" : status))
            );
            setIncorrectSelections(selectedIcons.filter((icon) => !correctIcons.includes(icon)));
            setShowFeedback(true);
            setButtonText("Proceed");
        }
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
                                            showFeedback && correctIcons.includes(icon) && styles.correctSelection,
                                            showFeedback && incorrectSelections.includes(icon) && styles.incorrectSelection,
                                        ]}
                                    >
                                        <FontAwesome5
                                            name={icon}
                                            size={50}
                                            color={
                                                showFeedback && incorrectSelections.includes(icon)
                                                    ? "white"
                                                    : selectedItems.includes(index)
                                                        ? "white"
                                                        : "black"
                                            }
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>

            <ProgressTracker progressStatus={progressStatus} />
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
    incorrectSelection: {
        backgroundColor: "#E74C3C",
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