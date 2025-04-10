import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

export default function StroopBrick({ color, text, textColor }: { color: string; text: string, textColor: string }) {
    return (
        <View style={styles.container}>
            <View style={[styles.brick, { backgroundColor: color }]}>
                <Text style={[styles.text,{ color: textColor }]}>{text}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    brick: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 5,
    },
    text: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
});

