import { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import GameHeader from "@/components/GameHeader";
import { randomizeIcons, selectCorrectIcons } from "@/logic/Randomizer";
import ProgressTracker from "@/components/ProgressTracker";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from "@/firebase/firebaseConfig";

export default function MemoryCheckGame() {
    const router = useRouter();
    const [selectedItems, setSelectedItems] = useState([]);
    const [iconsGrid, setIconsGrid] = useState([]);
    const [correctIcons, setCorrectIcons] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [incorrectSelections, setIncorrectSelections] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [buttonText, setButtonText] = useState("Submit");
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameData, setGameData] = useState([]);
    const [showAnswerScreen, setShowAnswerScreen] = useState(false);
    const [showMemorizeScreen, setShowMemorizeScreen] = useState(true);
    const db = getFirestore();

    const generateNewIcons = () => {
        const newGrid = randomizeIcons();
        const newCorrectIcons = selectCorrectIcons(newGrid);
        setIconsGrid(newGrid);
        setCorrectIcons(newCorrectIcons);
    };

    const initializeGame = useCallback(() => {
        generateNewIcons();
        setSelectedItems([]);
        setCurrentStep(0);
        setProgressStatus(["inProgress", "inProgress", "inProgress", "inProgress"]);
        setIncorrectSelections([]);
        setShowFeedback(false);
        setButtonText("Submit");
        setGameCompleted(false);
        setGameData([]);
        setShowMemorizeScreen(true);
        setShowAnswerScreen(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            initializeGame();
        }, [initializeGame])
    );

    const toggleSelection = (icon, index) => {
        if (!showFeedback) {
            setSelectedItems((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        }
    };

    const handleProceed = () => {
        if (currentStep < 3) {
            setCurrentStep((prev) => prev + 1);
            generateNewIcons();
            setSelectedItems([]);
            setIncorrectSelections([]);
            setShowFeedback(false);
            setButtonText("Submit");
            setShowAnswerScreen(false);
            setShowMemorizeScreen(true);
        } else {
            setGameCompleted(true);
            saveResultsToFirebase();
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

        const passedIcons = correctIcons.filter(icon => selectedIcons.includes(icon));
        const falseSelections = selectedIcons.filter(icon => !correctIcons.includes(icon));
        const allCorrect = passedIcons.length === correctIcons.length && falseSelections.length === 0;

        const result = {
            question: currentStep + 1,
            totalObjects: 9,
            correctObjects: passedIcons.length,
            falseObjects: falseSelections.length,
            passed: allCorrect,
        };

        setGameData(prev => [...prev, result]);

        if (allCorrect) {
            setProgressStatus((prev) =>
                prev.map((status, index) => (index === currentStep ? "completed" : status))
            );
            setShowAnswerScreen(true);
            setButtonText("Proceed");
        } else {
            setProgressStatus((prev) =>
                prev.map((status, index) => (index === currentStep ? "failed" : status))
            );
            setIncorrectSelections(falseSelections);
            setShowFeedback(true);
            setButtonText("Proceed");
        }
    };

    const saveResultsToFirebase = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const totalQuestions = gameData.length;
        const passedQuestions = gameData.filter(q => q.passed).length;
        const averageCorrect = gameData.reduce((sum, q) => sum + q.correctObjects, 0) / totalQuestions;
        const overallPassed = passedQuestions >= totalQuestions / 2;

        const gameRecord = {
            timestamp: new Date().toISOString(),
            type: "Memory Check",
            totalQuestions,
            passedQuestions,
            averageCorrect,
            overallPassed,
            questions: gameData
        };

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            memoryCheckHistory: arrayUnion(gameRecord)
        });
    };

    return (
        <View style={styles.screenContainer}>
            <GameHeader />
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    {gameCompleted ? (
                        <>
                            <Text style={styles.completedText}>
                                You have completed the test, please proceed to see your results!
                            </Text>
                            <FontAwesome5 name="chart-bar" size={80} color="black" style={styles.completedIcon} />
                            <TouchableOpacity style={styles.resultsButton} onPress={() => router.push("/(stack)/gameresult")}>
                                <Text style={styles.resultsButtonText}>Proceed to Results</Text>
                            </TouchableOpacity>
                        </>
                    ) : showMemorizeScreen ? (
                        <>
                            <Text style={styles.carouselText}>These are the icons to identify!</Text>
                            <View style={styles.iconGrid}>
                                {correctIcons.map((icon, index) => (
                                    <View key={index} style={[styles.iconWrapper, styles.correctSelection]}>
                                        <FontAwesome5 name={icon} size={50} color="white" />
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={() => setShowMemorizeScreen(false)}>
                                <Text style={styles.submitButtonText}>Next</Text>
                            </TouchableOpacity>
                        </>
                    ) : showAnswerScreen ? (
                        <>
                            <Text style={styles.carouselText}>Correct Answers:</Text>
                            <View style={styles.iconGrid}>
                                {iconsGrid.map((row, rowIndex) => (
                                    <View key={rowIndex} style={styles.row}>
                                        {row.map((icon, colIndex) => {
                                            const index = rowIndex * 3 + colIndex;
                                            const isCorrect = correctIcons.includes(icon);
                                            const isIncorrect = incorrectSelections.includes(icon);
                                            return (
                                                <View
                                                    key={index}
                                                    style={[
                                                        styles.iconWrapper,
                                                        isCorrect && styles.correctSelection,
                                                        isIncorrect && styles.incorrectSelection
                                                    ]}
                                                >
                                                    <FontAwesome5
                                                        name={icon}
                                                        size={50}
                                                        color={isCorrect || isIncorrect ? "white" : "black"}
                                                    />
                                                </View>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={handleProceed}>
                                <Text style={styles.submitButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
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
                                                        showFeedback && incorrectSelections.includes(icon) && styles.incorrectSelection
                                                    ]}
                                                >
                                                    <FontAwesome5
                                                        name={icon}
                                                        size={50}
                                                        color={
                                                            showFeedback && (correctIcons.includes(icon) || incorrectSelections.includes(icon))
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
        justifyContent: "center",
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
        borderRadius: 10,
        margin: 5,
    },
    correctSelection: {
        backgroundColor: "#25D366",
    },
    incorrectSelection: {
        backgroundColor: "#E74C3C",
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
