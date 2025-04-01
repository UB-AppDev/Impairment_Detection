import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseConfig';
import { getApp } from 'firebase/app';

const organizations = [
    { id: '1', name: 'Eric County Medical Center', members: '200–500 Members' },
    { id: '2', name: 'Eric County Medical Center', members: '200–500 Members' },
    { id: '3', name: 'Eric County Medical Center', members: '200–500 Members' },
    { id: '4', name: 'Eric County Medical Center', members: '200–500 Members' },
    { id: '5', name: 'Eric County Medical Center', members: '200–500 Members' },
];

export default function Organization() {
    const [position, setPosition] = useState('');
    const [organization, setOrganization] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const db = getFirestore(getApp());

    const handleContinue = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'User not logged in.');
            return;
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, { position, organization }, { merge: true });
            router.push('/auth/termsofservice');
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Please enter</Text>
                <Text style={styles.title}>your organization!</Text>
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.inactiveDot} />
                <View style={styles.activeDot} />
                <View style={styles.inactiveDot} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Position Title</Text>
                <TextInput
                    placeholder="Doctor of Psychology"
                    placeholderTextColor="#ccc"
                    value={position}
                    onChangeText={setPosition}
                    style={styles.input}
                />
                <Text style={styles.label}>Organization</Text>
                <Pressable onPress={() => setShowDropdown(!showDropdown)}>
                    <View pointerEvents="none">
                        <TextInput
                            placeholder="Search..."
                            placeholderTextColor="#ccc"
                            value={organization}
                            editable={false}
                            style={styles.input}
                        />
                    </View>
                </Pressable>
                {showDropdown && (
                    <FlatList
                        data={organizations}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.orgItem}
                                onPress={() => {
                                    setOrganization(item.name);
                                    setShowDropdown(false);
                                }}
                            >
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/40' }}
                                    style={styles.orgImage}
                                />
                                <View>
                                    <Text style={styles.orgName}>{item.name}</Text>
                                    <Text style={styles.orgMembers}>{item.members}</Text>
                                </View>
                            </Pressable>
                        )}
                    />
                )}
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
    orgItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    orgImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginRight: 10,
    },
    orgName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    orgMembers: {
        fontSize: 12,
        color: '#555',
    },
});
