import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image, Modal } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import GameHeader from "@/components/GameHeader";
import ProgressTracker from "@/components/ProgressTracker";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from "@/firebase/firebaseConfig";

const { width, height } = Dimensions.get("window");

const directions = ["horizontal", "vertical", "diagonal", "zigzag"];
const directionNames = ["Horizontal Movement", "Vertical Movement", "Diagonal Movement", "Zigzag Movement"];

export default function VisualPursuitsGame() {
    const router = useRouter();
    const db = getFirestore();
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState({ x: 5, y: 0 });
    const [direction, setDirection] = useState("horizontal");
    const [countdown, setCountdown] = useState(30);
    const [isGameActive, setIsGameActive] = useState(false);
    const [showReviewScreen, setShowReviewScreen] = useState(false);
    const [gameData, setGameData] = useState([]);
    const [duration, setDuration] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (!isGameActive || gameCompleted) return;

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
                    if (timerRef.current) clearInterval(timerRef.current);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isGameActive, direction, gameCompleted]);

    useEffect(() => {
        if (countdown === 0 && isGameActive) {
        }
    }, [countdown, isGameActive]);

    const startGame = () => {
        setIsGameActive(true);
        setDuration(0);

        const centerX = (width - 30) / 2;
        const centerY = (height * 0.6 - 30) / 2;

        if (direction === "horizontal" || direction === "vertical") {
            setBallPosition({ x: centerX, y: centerY });
        }

        const durationTimer = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);

        timerRef.current = durationTimer;
    };

    const finishGame = () => {
        setIsGameActive(false);
        if (timerRef.current) clearInterval(timerRef.current);

        const result = {
            question: currentStep + 1,
            duration: duration,
            direction: directionNames[currentStep],
            completed: countdown <= 0
        };

        setGameData(prev => [...prev, result]);
        setShowReviewScreen(true);
    };

    const handleSubmit = () => {
        if (!isGameActive) {
            setShowModal(true);
            return;
        }

        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
        finishGame();
    };

    const handleContinue = () => {
        setShowReviewScreen(false);

        if (currentStep < 3) {
            const nextDirection = directions[currentStep + 1];
            setCurrentStep(prev => prev + 1);
            setDirection(nextDirection);
            setCountdown(30);

            const centerX = (width - 30) / 2;
            const centerY = (height * 0.6 - 30) / 2;

            if (nextDirection === "horizontal") {
                setVelocity({ x: 5, y: 0 });
                setBallPosition({ x: centerX, y: centerY });
            }
            else if (nextDirection === "vertical") {
                setVelocity({ x: 0, y: 5 });
                setBallPosition({ x: centerX, y: centerY });
            }
            else if (nextDirection === "diagonal") {
                setVelocity({ x: 4, y: 4 });
                setBallPosition({ x: 0, y: 0 });
            }
            else {
                setVelocity({ x: 5, y: Math.random() * 2 + 2 });
                setBallPosition({ x: 0, y: 0 });
            }

            setProgressStatus(prev =>
                prev.map((status, index) =>
                    index === currentStep ? "completed" : status
                )
            );
        } else {
            setProgressStatus(prev => prev.map((status, index) => index === 3 ? "completed" : status));
            setGameCompleted(true);
            saveResultsToFirebase();
        }
    };

    const saveResultsToFirebase = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const totalTime = gameData.reduce((sum, item) => sum + item.duration, 0);
        const completedTasks = gameData.filter(item => item.completed).length;

        const gameRecord = {
            timestamp: new Date().toISOString(),
            type: "Visual Pursuits",
            totalQuestions: gameData.length,
            completedQuestions: completedTasks,
            averageDuration: totalTime / gameData.length,
            overallPassed: completedTasks >= 2,
            questions: gameData
        };

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            visualPursuitHistory: arrayUnion(gameRecord)
        });
    };

    return (
        <View style={styles.screenContainer}>
            <GameHeader />
            <View style={styles.gameWrapper}>
                <View style={styles.gameContainer}>
                    {gameCompleted ? (
                        <>
                            <Text style={styles.completedText}>You have completed the test, please proceed to see your results!</Text>
                            <FontAwesome5 name="chart-bar" size={width * 0.2} color="black" style={styles.completedIcon} />
                            <TouchableOpacity
                                style={styles.resultsButton}
                                onPress={() => router.push("/(stack)/gameresult")}
                            >
                                <Text style={styles.resultsButtonText}>Proceed to Results</Text>
                            </TouchableOpacity>
                        </>
                    ) : showReviewScreen ? (
                        <>
                            <Text style={styles.carouselText}>Task Review</Text>
                            <View style={styles.reviewContainer}>
                                <Text style={styles.reviewTitle}>{directionNames[currentStep]}</Text>
                                <View style={styles.reviewItem}>
                                    <Text style={styles.reviewLabel}>Time Spent:</Text>
                                    <Text style={styles.reviewValue}>{duration} seconds</Text>
                                </View>
                                <View style={styles.reviewItem}>
                                    <Text style={styles.reviewLabel}>Status:</Text>
                                    <View style={[styles.statusTag, countdown <= 0 ? styles.failedStatus : styles.completedStatus]}>
                                        <Text style={styles.statusText}>{countdown <= 0 ? "Timed Out" : "Completed"}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
                                <Text style={styles.submitButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Image source={require("@/assets/images/face-placeholder.png")} style={styles.faceIcon} />
                            <View style={[styles.movingBall, { left: ballPosition.x, top: ballPosition.y }]} />

                            <Text style={styles.instructionText}>
                                {isGameActive && countdown > 0
                                    ? `Follow the moving ball with your eyes (${directionNames[currentStep]})`
                                    : isGameActive && countdown === 0
                                        ? "Time's up! Please submit your results."
                                        : "Press Start to begin the eye tracking exercise"}
                            </Text>

                            <View style={styles.timerWrapper}>
                                <Text style={styles.timerLabel}>Time Remaining:</Text>
                                <View style={[styles.timerTag, isGameActive ? styles.inProgressStatus : styles.waitingStatus]}>
                                    <Text style={styles.timerText}>00:{("00" + countdown).slice(-2)}</Text>
                                </View>
                            </View>

                            {!isGameActive ? (
                                <TouchableOpacity style={styles.startButton} onPress={startGame}>
                                    <Text style={styles.startButtonText}>Start</Text>
                                </TouchableOpacity>
                            ) : countdown === 0 ? (
                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                </TouchableOpacity>
                            ) : null}
                        </>
                    )}
                </View>
                <ProgressTracker progressStatus={progressStatus} />
            </View>

            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>You must start the game before submitting.</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Return to Game</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    instructionText: {
        color: "#fff",
        fontSize: width * 0.035,
        textAlign: "center",
        marginBottom: height * 0.02,
        width: "80%",
    },
    timerWrapper: {
        alignItems: "center",
        marginTop: height * 0.02,
    },
    timerLabel: {
        color: "#fff",
        fontSize: width * 0.035,
        marginBottom: height * 0.01,
    },
    timerTag: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.01,
        borderRadius: 20,
    },
    timerText: {
        color: "white",
        fontSize: width * 0.04,
        textAlign: "center",
    },
    inProgressStatus: {
        backgroundColor: "#638AB4",
    },
    waitingStatus: {
        backgroundColor: "#F39C12",
    },
    startButton: {
        backgroundColor: "#fff",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 30,
        marginTop: height * 0.03,
    },
    startButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
    },
    submitButton: {
        backgroundColor: "#fff",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 30,
        marginTop: height * 0.03,
    },
    submitButtonText: {
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
    completedText: {
        color: "white",
        fontSize: width * 0.035,
        textAlign: "center",
        marginBottom: height * 0.025,
        width: "80%",
    },
    completedIcon: {
        marginBottom: height * 0.025,
    },
    carouselText: {
        color: "#fff",
        fontSize: width * 0.045,
        textAlign: "center",
        marginBottom: height * 0.03,
        width: "90%",
    },
    reviewContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 12,
        padding: width * 0.04,
        width: "90%",
        marginBottom: height * 0.02,
    },
    reviewTitle: {
        color: "#fff",
        fontSize: width * 0.04,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: height * 0.015,
    },
    reviewItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.01,
    },
    reviewLabel: {
        color: "#fff",
        fontSize: width * 0.03,
    },
    reviewValue: {
        color: "#fff",
        fontSize: width * 0.03,
        fontWeight: "bold",
    },
    statusTag: {
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.005,
        borderRadius: 20,
    },
    completedStatus: {
        backgroundColor: "#25D366",
    },
    failedStatus: {
        backgroundColor: "#E74C3C",
    },
    statusText: {
        color: "#fff",
        fontSize: width * 0.025,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#28C76F",
        padding: width * 0.05,
        borderRadius: 20,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        color: "#fff",
        fontSize: width * 0.035,
        marginBottom: height * 0.02,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#fff",
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.08,
        borderRadius: 20,
    },
    modalButtonText: {
        color: "#28C76F",
        textAlign: "center",
        fontSize: width * 0.035,
    },
});