import { View, Text, StyleSheet } from "react-native";

const ProgressTracker = () => {
    return (
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
    );
};

export default ProgressTracker;

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginTop: 20,
    },
    progressItem: {
        alignItems: "center",
        flex: 1,
    },
    progressText: {
        fontSize: 24,
        color: "#25D366",
    },
    progressLabel: {
        fontSize: 8,
        color: "#000",
        textAlign: "center",
        marginTop: 5,
    },
    progressStatus: {
        backgroundColor: "#638AB4",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 8,
    },
    statusText: {
        color: "white",
        fontSize: 6,
        textAlign: "center",
    },
});