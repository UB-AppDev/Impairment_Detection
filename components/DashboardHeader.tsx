import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseConfig';

const DashboardHeader = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const db = getFirestore();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setFirstName(data.firstName || '');
                    setLastName(data.lastName || '');
                    setPosition(data.position || '');
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <View style={styles.grid}>
                    {[...Array(9)].map((_, i) => (
                        <View key={i} style={styles.gridSquare} />
                    ))}
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.headerTitle}>{`${firstName} ${lastName}`}</Text>
                <Text style={styles.headerSubtitle}>{position}</Text>
            </View>
            <Ionicons name="person-circle-outline" size={40} color="black" style={styles.icon} />
        </View>
    );
};

export default DashboardHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 32,
        height: 32,
    },
    gridSquare: {
        width: 8,
        height: 8,
        backgroundColor: '#25D366',
        margin: 1,
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 30,
    },
    headerTitle: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: 'black',
    },
    headerSubtitle: {
        fontSize: 10,
        fontFamily: 'Poppins',
        color: 'gray',
    },
    icon: {
        marginLeft: 10,
    },
});