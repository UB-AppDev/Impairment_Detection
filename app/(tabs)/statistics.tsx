import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseConfig';
import ResultComponent from '@/components/resultcomponent';

const TABS = ['Past Tests', 'Past Clients', 'Misc'];

export default function StatisticsScreen() {
    const [selectedTab, setSelectedTab] = useState('Past Tests');
    const [gameData, setGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();

    useEffect(() => {
        const fetchUserStats = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const { memoryCheckHistory = [] } = data || {};
                const sorted = [...memoryCheckHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setGameData(sorted);
                setLoading(false);
            }
        };
        fetchUserStats();
    }, []);

    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: '#fff' }}>
            <View style={styles.header}>
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, selectedTab === tab && styles.tabSelected]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={{ padding: 10 }}>
                {selectedTab === 'Past Tests' && (
                    loading ? (
                        <Text style={styles.centerText}>Loading...</Text>
                    ) : gameData.length === 0 ? (
                        <Text style={styles.centerText}>There is currently no previous tests.</Text>
                    ) : (
                        gameData.map((game, index) => (
                            <ResultComponent key={index} game={game} index={index} />
                        ))
                    )
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ccc',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    tabSelected: {
        backgroundColor: '#28C76F',
    },
    tabText: {
        fontSize: 14,
        color: '#333',
    },
    tabTextSelected: {
        color: 'white',
        fontWeight: 'bold',
    },
    centerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        color: '#000',
    },
});