import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const gameIcons = {
    "Memory Check": "brain",
    "Stroop Naming": "font",
    "Typing Challenge": "keyboard",
    "Walk and Turn": "walking",
    "Choice Reaction": "hand-paper",
    "Tongue Twisters": "comment-dots",
    "Single Leg Balance": "balance-scale",
    "Visual Pursuit": "eye",
};

export default function ResultComponent({ game, index }) {
    const passed = game.overallPassed;
    const dateObj = new Date(game.timestamp);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    const iconName = gameIcons[game.type] || "question";

    const router = useRouter();

    return (
        <View style={styles.testCard}>
            <View style={[styles.testHeader, passed ? styles.passColor : styles.failColor]}>
                <View style={styles.userInfo}>
                    <FontAwesome5 name="user-circle" size={36} color="#000" style={{ marginRight: 10 }} />
                    <View style={styles.nameBadgeWrapper}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>Jane Doe</Text>
                            <View style={[styles.statusBadge, passed ? styles.statusPass : styles.statusFail]}>
                                <Text style={styles.statusText}>{passed ? 'Pass' : 'Fail'}</Text>
                            </View>
                        </View>
                        <Text style={styles.role}>Patient</Text>
                    </View>
                </View>
                <View style={styles.testTime}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>

            <View style={styles.testBody}>
                <View style={styles.testRow}>
                    <Text style={styles.testLabel}>Test Performed:</Text>
                    <FontAwesome5 name={iconName} size={16} color="#25D366" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.testName}>{game.type}</Text>
                </View>
                <View style={styles.questionsRow}>
                    {game.questions.map((q, i) => (
                        <View key={i} style={styles.questionBox}>
                            <Text style={styles.questionNumber}>{i + 1}</Text>
                            <Text style={styles.questionLabel}>Question {i + 1}</Text>
                            <View style={[styles.questionStatus, q.passed ? styles.completed : styles.failed]}>
                                <Text style={styles.questionStatusText}>
                                    {q.passed ? 'Correct' : 'Incorrect'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={() =>
                    router.push({
                        pathname: "/gameresult",
                        params: {
                            fromStats: "true",
                            game: encodeURIComponent(JSON.stringify(game)),
                        },
                    })
                }>
                    <Text style={styles.moreDetails}>More Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    testCard: {
        backgroundColor: '#F4F4F4',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    testHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        position: 'relative',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    nameBadgeWrapper: {
        flexDirection: 'column',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    name: {
        fontSize: 18,
        color: '#000',
    },
    role: {
        fontSize: 12,
        color: '#000',
    },
    statusBadge: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    statusPass: {
        backgroundColor: '#3CC7F5',
    },
    statusFail: {
        backgroundColor: '#E74C3C',
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    testTime: {
        position: 'absolute',
        right: 10,
        top: 10,
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 12,
        color: '#000',
    },
    time: {
        fontSize: 10,
        color: '#000',
    },
    testBody: {
        backgroundColor: '#fff',
        padding: 15,
    },
    testRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    testLabel: {
        fontSize: 12,
        color: '#000',
    },
    testName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#25D366',
    },
    questionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        gap: 10,
        width: '75%',
        alignSelf: 'flex-start',
    },
    questionBox: {
        alignItems: 'center',
        width: 55,
    },
    questionNumber: {
        fontSize: 20,
        color: '#25D366',
    },
    questionLabel: {
        fontSize: 5,
        color: '#000',
        marginTop: 3,
        textAlign: 'center',
    },
    questionStatus: {
        marginTop: 5,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    completed: {
        backgroundColor: '#28C76F',
    },
    failed: {
        backgroundColor: '#E74C3C',
    },
    questionStatusText: {
        color: '#fff',
        fontSize: 5,
    },
    moreDetails: {
        textAlign: 'right',
        color: '#25D366',
        fontSize: 13,
        marginTop: 10,
    },
    passColor: {
        backgroundColor: '#28C76F',
    },
    failColor: {
        backgroundColor: '#25D366',
    },
});