import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Gyroscope } from 'expo-sensors';
import { GameTimer } from "@/components/GameTimer";
import { Vibration } from 'react-native';


export default function SingleLegBalanceGame() {
    const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroSum, setGyroSum] = useState({ x: 0, y: 0, z: 0 });
    const [sampleCount, setSampleCount] = useState(0);
    const [timerVisible, setTimerVisible] = useState(false);
    const gameDuration = 10; // seconds
    const gyroInterval = .1; // seconds

    let gyroSubscription = null;

    const startGame = () => {
        Vibration.vibrate(1000 * gyroInterval);
        // Reset state
        setGyroData({ x: 0, y: 0, z: 0 });
        setGyroSum({ x: 0, y: 0, z: 0 });
        setSampleCount(0);
        setTimerVisible(true);

        Gyroscope.setUpdateInterval(1000 * gyroInterval);

        gyroSubscription = Gyroscope.addListener(data => {
            setGyroData(data);

            setGyroSum(prev => ({
                x: prev.x + data.x,
                y: prev.y + data.y,
                z: prev.z + data.z,
            }));

            setSampleCount(prev => prev + 1);
        });
    };

    const gameOver = () => {
        setTimerVisible(false);
        Gyroscope.removeAllListeners();
        console.log(gyroSum, sampleCount);    
        const averageX = (gyroSum.x / sampleCount);
        const averageY = (gyroSum.y / sampleCount);
        const averageZ = (gyroSum.z / sampleCount);
        Vibration.vibrate([0, 500, 200, 500]); // wait, vibrate, wait, vibrate
        alert(
            `Game Over!\nAverage Gyroscope Data:\nX: ${averageX.toFixed(6)}\nY: ${averageY.toFixed(6)}\nZ: ${averageZ.toFixed(6)}`
        );
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Single Leg Balance Game</Text>

            {!timerVisible && (
                <TouchableOpacity style={styles.button} onPress={startGame}>
                    <Text style={styles.buttonText}>Begin Game</Text>
                </TouchableOpacity>
            )}

            {timerVisible && (
                <View style={styles.gameSection}>
                    <GameTimer time={gameDuration} onTimeUp={gameOver} />
                    <Text style={styles.label}>Live Gyroscope Data:</Text>
                    <Text style={styles.data}>X: {gyroData.x.toFixed(2)}</Text>
                    <Text style={styles.data}>Y: {gyroData.y.toFixed(2)}</Text>
                    <Text style={styles.data}>Z: {gyroData.z.toFixed(2)}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    gameSection: {
        alignItems: "center",
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    data: {
        fontSize: 16,
        marginVertical: 2,
    },
});
