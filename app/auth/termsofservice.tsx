import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function TermsOfService() {
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();

    const handleContinue = () => {
        if (!isChecked) return;
        router.replace('/dashboard');
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Please accept</Text>
                <Text style={styles.title}>our conditions</Text>
            </View>
            <View style={styles.progressContainer}>
                <View style={styles.inactiveDot} />
                <View style={styles.inactiveDot} />
                <View style={styles.activeDot} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Terms and Conditions</Text>
                <ScrollView style={styles.scrollBox}>
                    <Text style={styles.termsText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                        onPress={() => setIsChecked(!isChecked)}
                    >
                        {isChecked && <View style={styles.checkmark} />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Agree to terms and conditions</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.continueButton, { opacity: isChecked ? 1 : 0.5 }]}
                onPress={handleContinue}
                disabled={!isChecked}
            >
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
        marginBottom: 30,
    },
    label: {
        fontSize: 13,
        marginBottom: 10,
        color: '#444',
    },
    scrollBox: {
        maxHeight: 150,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 14,
        marginBottom: 20,
    },
    termsText: {
        fontSize: 14,
        color: '#444',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#25D366',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#25D366',
    },
    checkmark: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
    },
    checkboxLabel: {
        fontSize: 13,
        color: '#444',
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
