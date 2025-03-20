import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function GameResult() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const progressStatus = Array.isArray(params.progressStatus) ? params.progressStatus : [];

    const totalQuestions = 4;
    const correctAnswers = progressStatus.filter(status => status === "completed").length;
    const passed = correctAnswers >= totalQuestions / 2;

    return (
        <View style={styles.container}>
            <View style={[styles.resultBox, passed ? styles.passBox : styles.failBox]}>
                <FontAwesome5 name={passed ? "smile" : "frown"} size={160} color="black" />
                <Text style={styles.resultText}>
                    {passed ? "You have passed the Item Accuracy Test!" : "You have failed the Item Accuracy Test!"}
                </Text>
            </View>
            <View style={styles.resultsContainer}>
                {["1", "2", "3", "4"].map((num, index) => (
                    <View key={num} style={styles.questionRow}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.questionNumber}>{num}</Text>
                            <View style={[styles.statusTag,
                                progressStatus[index] === "completed" ? styles.passTag : styles.failTag]}>
                                <Text style={styles.statusText}>
                                    {progressStatus[index] === "completed" ? "Passed" : "Failed"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.questionDetails}>
                            <Text style={styles.questionLabel}>Question {num}</Text>
                            <View style={styles.underline} />
                            <View style={styles.detailRow}>
                                <Text style={styles.objectCount}>9 Objects</Text>
                                <Text style={styles.identifiableItems}>2 Identifiable Items</Text>
                            </View>
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.button} onPress={() => router.push("/dashboard")}>
                    <Text style={styles.buttonText}>End Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 40,
    },
    resultBox: {
        width: "90%",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 25,
        height: "35%",
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
        fontSize: 16,
        width: "70%",
        textAlign: "center",
        marginTop: 20,
    },
    resultsContainer: {
        width: "90%",
        backgroundColor: "#F8F8F8",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    questionRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
        justifyContent: "space-between",
    },
    numberContainer: {
        alignItems: "center",
    },
    questionNumber: {
        fontSize: 24,
        color: "#25D366",
    },
    statusTag: {
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginTop: 5,
    },
    passTag: {
        backgroundColor: "#28C76F",
    },
    failTag: {
        backgroundColor: "#E74C3C",
    },
    statusText: {
        color: "white",
        fontSize: 10,
    },
    questionDetails: {
        flex: 1,
        marginLeft: 10,
    },
    questionLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    underline: {
        height: 1,
        backgroundColor: "#000",
        marginTop: 3,
        marginBottom: 5,
        width: "35%",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    objectCount: {
        fontSize: 12,
        color: "#000",
    },
    identifiableItems: {
        fontSize: 12,
        color: "#28C76F",
    },
    button: {
        backgroundColor: "#28C76F",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
