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
                        <Text style={styles.questionNumber}>{num}</Text>
                        <View style={styles.questionDetails}>
                            <Text style={styles.questionLabel}>Question {num}</Text>
                            <Text style={styles.objectCount}>9 Objects</Text>
                            <Text style={styles.identifiableItems}>2 Identifiable Items</Text>
                        </View>
                        <View style={[styles.statusTag,
                            progressStatus[index] === "completed" ? styles.passTag : styles.failTag]}>
                            <Text style={styles.statusText}>
                                {progressStatus[index] === "completed" ? "Passed" : "Failed"}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/dashboard")}>
                <Text style={styles.buttonText}>End Test</Text>
            </TouchableOpacity>
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
        height: "40%",
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
        fontSize: 12,
        width: '60%',
        textAlign: "center",
        marginTop: 50,
    },
    resultsContainer: {
        width: "90%",
        backgroundColor: "#F8F8F8",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    questionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    questionNumber: {
        fontSize: 24,
        color: "#25D366",
        marginRight: 10,
    },
    questionDetails: {
        flex: 1,
    },
    questionLabel: {
        fontSize: 12,
        color: "#000",
    },
    objectCount: {
        fontSize: 10,
        color: "#000",
    },
    identifiableItems: {
        fontSize: 10,
        color: "#28C76F",
    },
    statusTag: {
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    passTag: {
        backgroundColor: "#28C76F",
    },
    failTag: {
        backgroundColor: "#E74C3C",
    },
    statusText: {
        color: "white",
        fontSize: 12,
    },
    button: {
        backgroundColor: "#28C76F",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
