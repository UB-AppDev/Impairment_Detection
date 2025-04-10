import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GameHeader from "@/components/GameHeader";
import { StroopGameGen } from "@/logic/StroopGameGen";
import StroopBrick from "@/components/StroopBrick";
import { GameTimer } from "@/components/GameTimer";
import { router, useRouter } from "expo-router";

export default function StroopNamingGame() {
    const router = useRouter();
    const [color, setColor] = useState("");
    const [color_word, setColorWord] = useState("");
    const [options, setGameOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false); // Track if game has started
    const [finalScore, setFinalScore] = useState(0);
    const [gameDuration] = useState(30); // Set the game duration in seconds

    const parse_game_gen = () => {
        const game_info = StroopGameGen();
        setColor(game_info.word_color);
        setColorWord(game_info.word);
        setGameOptions(game_info.options);
    };

    const check_if_correct = (option: string) => {
        if (option.toLowerCase() === color) {
            setScore(score + 1);
            console.log("Correct, Score = " + score);
        }
        parse_game_gen();
    };

    const startGame = () => {
        parse_game_gen();
        setGameStarted(true); // Game has started
    };

    const gameOver = () => {
        setFinalScore(score);
        alert("Game Over! You Scored " + finalScore + " Points!");
        // Reset the game state after the alert is dismissed
        setTimeout(() => {
            setGameStarted(false); // Reset game state
            setScore(0); // Reset score
        }, 0); // Delay to allow alert to be dismissed first
    };


    return (
        <View style={styles.screenContainer}>
            <GameHeader />
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    {gameStarted && (
                        <>
                            <View style={styles.mainBrickWrapper}>
                                <StroopBrick color="#D3D3D3" text={color_word} textColor={color} />
                            </View>

                            <View style={styles.optionRow}>
                                {options.map((opt, i) => (
                                    <TouchableOpacity key={i} onPress={() => check_if_correct(opt)}>
                                        <StroopBrick color={opt.toLowerCase()} text={opt} textColor="white" />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        
                        </>
                    )}
                </View>
            </View>

            {!gameStarted && (
                <TouchableOpacity onPress={startGame} style={styles.startButton}>
                    <Text style={styles.startButtonText}>Begin Game</Text>
                </TouchableOpacity>
            )}

            {/* Stop button to end the game */}
            {gameStarted && (
                <GameTimer time={gameDuration} onTimeUp={gameOver} />
                // <TouchableOpacity onPress={gameOver}>
                //     <Text>STOP</Text>
                // </TouchableOpacity>
            )}
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
        flex: 0.55,
        borderRadius: 12,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
    },

    mainBrickWrapper: {
        marginVertical: 20,
        alignItems: "center",
    },
    optionRow: {
        flexDirection: "row",
        justifyContent: "center", // Center the items horizontally
        alignItems: "center", // Ensure the items are aligned vertically in the center
        width: "100%",
        gap: 10,
        marginTop: 10,
    },

    startText: {
        fontSize: 20,
        color: "white",
        marginTop: 20,
    },
    startButton: {
        backgroundColor: "#25D366",
        width: "100%",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20,
      },
      startButtonText: {
        color: "#fff",
        fontSize: 14,
      },
});
