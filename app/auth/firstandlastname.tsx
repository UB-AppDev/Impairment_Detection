import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseConfig';

export default function FirstAndLastName() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();
    const db = getFirestore();

    const handleContinue = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'User not logged in.');
            return;
        }
        // there is an issue with this, 
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { firstName, lastName }, { merge: true });
            router.push('/auth/organization');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Let us</Text>
                <Text style={styles.title}>get to know you!</Text>
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.activeDot} />
                <View style={styles.inactiveDot} />
                <View style={styles.inactiveDot} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    placeholder="Jane"
                    placeholderTextColor="#ccc"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                />
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    placeholder="Doe"
                    placeholderTextColor="#ccc"
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 80,
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#25D366',
        fontWeight: '600',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    activeDot: {
        width: 30,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#25D366',
        marginHorizontal: 4,
    },
    inactiveDot: {
        width: 10,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    inputContainer: {
        marginBottom: 40,
    },
    label: {
        fontSize: 13,
        marginBottom: 5,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f8f8f8',
        paddingVertical: 14,
        paddingHorizontal: 15,
        fontSize: 14,
        borderRadius: 8,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#25D366',
        paddingVertical: 16,
        borderRadius: 50,
        alignItems: 'center',
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
    },
});