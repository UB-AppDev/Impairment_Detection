import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DashboardHeader = () => {
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
                <Text style={styles.headerTitle}>John Doe</Text>
                <Text style={styles.headerSubtitle}>Doctor of Psychology</Text>
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
