import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ResultComponent({ game, index }) {
    const passed = game.overallPassed;
    const dateObj = new Date(game.timestamp);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();

    return (
        <View style={styles.testCard}>
            <View style={[styles.testHeader, passed ? styles.passColor : styles.failColor]}>
                <View style={styles.userInfo}>
                    <FontAwesome5 name="user-circle" size={36} color="#000" style={{ marginRight: 10 }} />
                    <View>
                        <Text style={styles.name}>Test #{index + 1}</Text>
                        <Text style={styles.role}>Patient</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: passed ? '#28C76F' : '#E74C3C' }]}>
                    <Text style={styles.statusText}>{passed ? 'Pass' : 'Fail'}</Text>
                </View>
                <View style={styles.testTime}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>

            <View style={styles.testBody}>
                <Text style={styles.testLabel}>Test Performed:</Text>
                <Text style={styles.testName}>{game.type}</Text>
                <View style={styles.questionsRow}>
                    {game.questions.map((q, i) => (
                        <View key={i} style={styles.questionBox}>
                            <Text style={styles.questionNumber}>{q.question}</Text>
                            <View style={[styles.questionStatus, q.passed ? styles.completed : styles.failed]}>
                                <Text style={styles.questionStatusText}>
                                    {q.passed ? 'Passed' : 'Failed'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity>
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
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    role: {
        fontSize: 12,
        color: '#000',
    },
    statusBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        position: 'absolute',
        left: 140,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
    },
    testTime: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    date: {
        fontSize: 12,
        color: '#000',
        textAlign: 'right',
    },
    time: {
        fontSize: 10,
        color: '#000',
        textAlign: 'right',
    },
    testBody: {
        backgroundColor: '#fff',
        padding: 15,
    },
    testLabel: {
        fontSize: 12,
        color: '#000',
        marginBottom: 4,
    },
    testName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        color: '#28C76F',
    },
    questionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    questionBox: {
        alignItems: 'center',
    },
    questionNumber: {
        fontSize: 16,
        color: '#000',
    },
    questionStatus: {
        marginTop: 4,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 8,
    },
    completed: {
        backgroundColor: '#28C76F',
    },
    failed: {
        backgroundColor: '#E74C3C',
    },
    questionStatusText: {
        color: '#fff',
        fontSize: 10,
    },
    moreDetails: {
        textAlign: 'right',
        color: '#28C76F',
        fontSize: 13,
        marginTop: 10,
    },
    passColor: {
        backgroundColor: '#28C76F',
    },
    failColor: {
        backgroundColor: '#E74C3C',
    },
});