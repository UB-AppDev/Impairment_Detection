import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import GameHeader from "@/components/GameHeader";
import ProgressTracker from "@/components/ProgressTracker";

const { width, height } = Dimensions.get("window");

export default function VisualPursuitsGame() {
    const router = useRouter();
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ x: 5, y: 0 });
    const [direction, setDirection] = useState<"horizontal" | "vertical" | "diagonal" | "zigzag">("horizontal");
    const [countdown, setCountdown] = useState(30);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (gameCompleted) return;
        intervalRef.current = setInterval(() => {
            setBallPosition(prev => {
                let newX = prev.x + velocity.x;
                let newY = prev.y + velocity.y;

                if (newX <= 0 || newX >= width - 30) velocity.x = -velocity.x;
                if (newY <= 0 || newY >= height * 0.6 - 30) velocity.y = -velocity.y;

                return { x: newX, y: newY };
            });
        }, 16);

        timerRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalRef.current!);
            clearInterval(timerRef.current!);
        };
    }, [direction, gameCompleted]);

    const handleContinue = () => {
        if (currentStep < 3) {
            const nextDirection = ["horizontal", "vertical", "diagonal", "zigzag"][currentStep + 1] as any;
            setCurrentStep(prev => prev + 1);
            setDirection(nextDirection);
            setCountdown(30);
            if (nextDirection === "horizontal") setVelocity({ x: 5, y: 0 });
            else if (nextDirection === "vertical") setVelocity({ x: 0, y: 5 });
            else if (nextDirection === "diagonal") setVelocity({ x: 4, y: 4 });
            else setVelocity({ x: 5, y: Math.random() * 2 + 2 });
            setBallPosition({ x: 0, y: 0 });
            setProgressStatus(prev =>
                prev.map((status, index) =>
                    index === currentStep ? "completed" : status
                )
            );
        } else {
            setProgressStatus(prev => prev.map((status, index) => index === 3 ? "completed" : status));
            setGameCompleted(true);
        }
    };

    return (
        <View style={styles.screenContainer}>
            <GameHeader />
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    <Image source={require("@/assets/images/face-placeholder.png")} style={styles.faceIcon} />
                    <View style={[styles.movingBall, { left: ballPosition.x, top: ballPosition.y }]} />
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>00:{("00" + countdown).slice(-2)}</Text>
                    </View>
                    {!gameCompleted && (
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                            <Text style={styles.continueButtonText}>Next</Text>
                        </TouchableOpacity>
                    )}
                    {gameCompleted && (
                        <TouchableOpacity
                            style={styles.resultsButton}
                            onPress={() => router.push("/(stack)/gameresult")}
                        >
                            <Text style={styles.resultsButtonText}>Proceed to Results</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ProgressTracker progressStatus={progressStatus} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.05,
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
        padding: width * 0.05,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
    },
    faceIcon: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: "contain",
        marginBottom: height * 0.02,
    },
    movingBall: {
        position: "absolute",
        width: 30,
        height: 30,
        backgroundColor: "red",
        borderRadius: 15,
    },
    timerContainer: {
        marginTop: height * 0.02,
    },
    timerText: {
        color: "white",
        fontSize: width * 0.05,
        textAlign: "center",
    },
    continueButton: {
        backgroundColor: "#fff",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 30,
        marginTop: height * 0.03,
    },
    continueButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
    },
    resultsButton: {
        backgroundColor: "#fff",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 30,
        marginTop: height * 0.03,
    },
    resultsButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
    },
});