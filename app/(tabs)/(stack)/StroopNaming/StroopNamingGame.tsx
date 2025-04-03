import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import GameHeader from "@/components/GameHeader";
import {StroopGameGen} from "@/logic/StroopGameGen";
import ProgressTracker from "@/components/ProgressTracker";
import { setOptions } from "expo-splash-screen";

export default function StroopNamingGame() {
    const router = useRouter();
    const [color, setColor] = useState("");
    const [color_word, setColorWord] = useState("");
    const [options, setGameOptions] = useState<string[]>([]);

    
    const parse_game_gen = () => {
        var game_info = StroopGameGen();
        setColor(game_info.word_color);
        setColorWord(game_info.word);
        setGameOptions(game_info.options);
    }

    const check_if_correct = (option: string) => {
        if (option == color){
            return true;
        }
        return false;
    }

    return (
        <View style={styles.screenContainer}>
            <GameHeader />
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    <Text style={styles.carouselText}>ENTERWD STROOP NAMING GAME!</Text>
                    <Text>{color_word}</Text>
                    {options.map((option, index) => (
                        <TouchableOpacity onPress={(option) => check_if_correct}>
                            <Text key={index}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    <Text>{options}</Text>
                </View>
                <TouchableOpacity onPress={parse_game_gen}>
                    <Text>generate game</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
    },
    gameWrapper: {
        flex: 0.9,
        width: "100%",
        alignItems: "center",
    },
    gameContainer: {
        backgroundColor: "#28C76F",
        width: "100%",
        flex: 0.85,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    completedContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    completedText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 20,
        width: '80%',
    },
    completedIcon: {
        marginBottom: 20,
    },
    resultsButton: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    resultsButtonText: {
        color: "#28C76F",
        fontSize: 16,
    },
    carouselText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    iconGrid: {
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    iconWrapper: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    correctSelection: {
        backgroundColor: "#25D366",
        borderRadius: 10,
    },
    incorrectSelection: {
        backgroundColor: "#E74C3C",
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: "#fff",
        width: "80%",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#28C76F",
        fontSize: 16,
    },
});