import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import GameHeader from "@/components/GameHeader";
import { randomizeIcons, selectCorrectIcons } from "@/logic/Randomizer";
import ProgressTracker from "@/components/ProgressTracker";

export default function MemoryCheckGame() {
    const router = useRouter();
    const { correctIcons: passedCorrectIcons } = useLocalSearchParams();
    const [selectedItems, setSelectedItems] = useState([]);
    const [iconsGrid, setIconsGrid] = useState(randomizeIcons());
    const [correctIcons, setCorrectIcons] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [incorrectSelections, setIncorrectSelections] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [buttonText, setButtonText] = useState("Submit");
    const [gameCompleted, setGameCompleted] = useState(false);

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

    const handleProceed = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
            resetGame();
        } else {
            setGameCompleted(true);
        }
    };

    const handleSubmit = () => {
        if (buttonText === "Proceed") {
            handleProceed();
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
            handleProceed();
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
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    <Text style={styles.carouselText}>Identify the items correctly!</Text>
                    {gameCompleted ? (
                        <View style={styles.completedContainer}>
                            <Text style={styles.completedText}>
                                You have completed the test, please proceed to see your results!
                            </Text>
                            <FontAwesome5 name="chart-bar" size={80} color="black" style={styles.completedIcon} />
                            <TouchableOpacity style={styles.resultsButton} onPress={() => router.push("/(stack)/gameresult")}>
                                <Text style={styles.resultsButtonText}>Proceed to Results</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
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
                        </>
                    )}
                </View>
                <ProgressTracker progressStatus={progressStatus} />
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
    gameWrapper: {
        flex: 0.9,
        width: "100%",
        alignItems: "center",
    },
    gameContainer: {
        backgroundColor: "#28C76F",
        width: "100%",
        flex: 0.85,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    completedContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    completedText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 20,
        width: '80%',
    },
    completedIcon: {
        marginBottom: 20,
    },
    resultsButton: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    resultsButtonText: {
        color: "#28C76F",
        fontSize: 16,
    },
    carouselText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
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
    },
    submitButtonText: {
        color: "#28C76F",
        fontSize: 16,
    },
});