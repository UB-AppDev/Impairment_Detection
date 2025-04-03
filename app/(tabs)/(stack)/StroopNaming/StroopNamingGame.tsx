import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import GameHeader from "@/components/GameHeader";
import {StroopGameGen} from "@/logic/StroopGameGen";
import ProgressTracker from "@/components/ProgressTracker";
import { GameTimer } from "@/components/GameTimer";
import { setOptions } from "expo-splash-screen";

export default function StroopNamingGame() {
    const router = useRouter();
    const [color, setColor] = useState("");
    const [color_word, setColorWord] = useState("");
    const [options, setGameOptions] = useState<string[]>([]);
    const [score, setScore] = useState(1);
    const [timerVisable, setTimerVisable] = useState(false);
    

    
    const parse_game_gen = () => {
        var game_info = StroopGameGen();
        setColor(game_info.word_color);
        setColorWord(game_info.word);
        setGameOptions(game_info.options);
    }

    const check_if_correct = (option: string) => {
        if (option.toLowerCase() === color){
            setScore(score+1);
            console.log("Correct, Score = " + score);
        }
        parse_game_gen();
        return;
    }

    const startGame = () => {
        parse_game_gen();
        setTimerVisable(true);
    }

    const gameOver = () =>{
        alert("Game Over! You Scored " + score + " Points!");
    }

    return (
        <View style={styles.screenContainer}>
            <GameHeader />
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    <Text style={styles.carouselText}>STROOP NAMING GAME</Text>
                    <Text style={[styles.gameText, { color: color }]}>{color_word}</Text>
                    <View style={styles.optionRow}>
                        <TouchableOpacity onPress={() => check_if_correct(options[0])}>
                            <Text style={styles.gameText}>{options[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => check_if_correct(options[1])}>
                            <Text style={styles.gameText}>{options[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => check_if_correct(options[2])}>
                            <Text style={styles.gameText}>{options[2]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {!timerVisable && (
                    <TouchableOpacity onPress={startGame}>
                    <Text>Begin Game</Text>
                    </TouchableOpacity>
                )}
                {timerVisable && (
                    <GameTimer time={10} onTimeUp={() => gameOver()} />
                )}
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
    carouselText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        marginBottom: 40,
    },
    gameText: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 10,
        fontWeight: 'bold',
    }
});