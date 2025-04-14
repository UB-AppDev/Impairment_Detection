import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export function GameTimer({time = 30, onTimeUp}: {time?:number, onTimeUp:() => void}) {
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        if (timeLeft <= 0){
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    timerContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    timerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "red",
    },
});