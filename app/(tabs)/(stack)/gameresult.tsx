import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function GameResult() {
    const router = useRouter();
    const { fromStats, game } = useLocalSearchParams();
    const [latestResult, setLatestResult] = useState(null);

    useEffect(() => {
        if (fromStats === "true" && typeof game === "string") {
            try {
                const parsed = JSON.parse(decodeURIComponent(game));
                setLatestResult(parsed);
            } catch (e) {
                console.error("Failed to parse game param", e);
            }
        }
    }, [fromStats, game]);

    if (!latestResult) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const passed = latestResult.overallPassed;
    const questions = latestResult.questions;

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={[styles.resultBox, passed ? styles.passBox : styles.failBox]}>
                <FontAwesome5 name={passed ? "smile" : "frown"} size={width * 0.4} color="black" />
                <Text style={styles.resultText}>
                    {passed ? "You have passed the Memory Check Test!" : "You have failed the Memory Check Test!"}
                </Text>
            </View>
            <View style={styles.resultsContainer}>
                {questions.map((q, index) => (
                    <View key={index} style={styles.questionRow}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.questionNumber}>{q.question}</Text>
                            <View style={[styles.statusTag, q.passed ? styles.passTag : styles.failTag]}>
                                <Text style={styles.statusText}>{q.passed ? "Passed" : "Failed"}</Text>
                            </View>
                        </View>
                        <View style={styles.questionDetails}>
                            <Text style={styles.questionLabel}>Question {q.question}</Text>
                            <View style={styles.underline} />
                            <View style={styles.detailRow}>
                                <Text style={styles.objectCount}>{q.totalObjects} Objects</Text>
                                <Text style={styles.identifiableItems}>{q.correctObjects} Correct</Text>
                                <Text style={styles.identifiableItems}>{q.falseObjects} Incorrect</Text>
                            </View>
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={() => router.push("/statistics")}>
                    <Text style={styles.buttonText}>
                        {fromStats === "true" ? "Return to Statistics" : "End Test"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.05,
    },
    resultBox: {
        width: "100%",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: width * 0.06,
        alignItems: "center",
    },
    passBox: {
        backgroundColor: "#28C76F",
    },
    failBox: {
        backgroundColor: "#E74C3C",
    },
    resultText: {
        color: "white",
        fontSize: width * 0.04,
        width: "80%",
        textAlign: "center",
        marginTop: height * 0.02,
    },
    resultsContainer: {
        width: "100%",
        backgroundColor: "#F8F8F8",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingVertical: height * 0.025,
        paddingHorizontal: width * 0.04,
        alignItems: "center",
    },
    questionRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: height * 0.015,
        justifyContent: "space-between",
    },
    numberContainer: {
        alignItems: "center",
        width: "20%",
    },
    questionNumber: {
        fontSize: width * 0.05,
        color: "#25D366",
    },
    statusTag: {
        borderRadius: 12,
        paddingVertical: height * 0.005,
        paddingHorizontal: width * 0.03,
        marginTop: height * 0.005,
    },
    passTag: {
        backgroundColor: "#28C76F",
    },
    failTag: {
        backgroundColor: "#E74C3C",
    },
    statusText: {
        color: "white",
        fontSize: width * 0.025,
    },
    questionDetails: {
        flex: 1,
        marginLeft: width * 0.03,
    },
    questionLabel: {
        fontSize: width * 0.035,
        fontWeight: "bold",
        color: "#000",
    },
    underline: {
        height: 1,
        backgroundColor: "#000",
        marginTop: height * 0.003,
        marginBottom: height * 0.007,
        width: "35%",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: height * 0.005,
    },
    objectCount: {
        fontSize: width * 0.03,
        color: "#000",
    },
    identifiableItems: {
        fontSize: width * 0.03,
        color: "#28C76F",
    },
    button: {
        backgroundColor: "#28C76F",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.2,
        borderRadius: 30,
        marginTop: height * 0.03,
    },
    buttonText: {
        color: "white",
        fontSize: width * 0.04,
    },
});