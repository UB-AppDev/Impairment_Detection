import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useState, useCallback, useRef } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import GameHeader from "@/components/GameHeader";
import ProgressTracker from "@/components/ProgressTracker";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from "@/firebase/firebaseConfig";

const { width, height } = Dimensions.get("window");

const tongueTwisters = [
    "She sells seashells by the seashore",
    "Red lorry yellow lorry",
    "Unique as unique",
    "How can a clam cram in a clean cream can"
];

export default function TongueTwisterGame() {
    const router = useRouter();
    const db = getFirestore();
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [countdown, setCountdown] = useState(60);
    const [currentStep, setCurrentStep] = useState(0);
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameData, setGameData] = useState<any[]>([]);
    const [showReviewScreen, setShowReviewScreen] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useFocusEffect(
        useCallback(() => {
            initializeGame();
        }, [])
    );

    const initializeGame = () => {
        setCurrentStep(0);
        setProgressStatus(["inProgress", "inProgress", "inProgress", "inProgress"]);
        setGameCompleted(false);
        setGameData([]);
        setRecordingUri(null);
        setTranscribedText("");
        setShowReviewScreen(false);
        setCountdown(60);
    };

    const startCountdown = () => {
        intervalRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    stopRecording();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status !== 'granted') return;

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await newRecording.startAsync();
            setRecording(newRecording);
            setCountdown(60);
            startCountdown();
        } catch {}
    };

    const stopRecording = async () => {
        if (!recording) return;
        clearInterval(intervalRef.current!);
        await recording.stopAndUnloadAsync();
        const status = await recording.getStatusAsync();
        setRecordingDuration(status.durationMillis ?? 0);
        const uri = recording.getURI();
        setRecordingUri(uri ?? null);
        setRecording(null);
    };

    const handleSubmit = () => {
        const durationSeconds = Math.floor(recordingDuration / 1000);
        const expected = tongueTwisters[currentStep].toLowerCase().trim();
        const actual = transcribedText.toLowerCase().trim();
        const passed = durationSeconds >= 1 && expected === actual;

        const result = {
            question: currentStep + 1,
            duration: durationSeconds,
            passed,
            prompt: tongueTwisters[currentStep],
            uri: recordingUri
        };

        setGameData(prev => [...prev, result]);

        setProgressStatus(prev =>
            prev.map((status, index) =>
                index === currentStep ? (passed ? "completed" : "failed") : status
            )
        );

        setShowReviewScreen(true);
        simulateTranscription();
    };

    const handleContinue = () => {
        setShowReviewScreen(false);
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            setRecording(null);
            setRecordingDuration(0);
            setRecordingUri(null);
            setTranscribedText("");
            setCountdown(60);
        } else {
            setGameCompleted(true);
            saveResultsToFirebase(gameData);
        }
    };

    const saveResultsToFirebase = async (data: any[]) => {
        const user = auth.currentUser;
        if (!user) return;

        const passedQuestions = data.filter(q => q.passed).length;
        const averageDuration = data.reduce((sum, q) => sum + q.duration, 0) / data.length;
        const overallPassed = passedQuestions >= 2;

        const gameRecord = {
            timestamp: new Date().toISOString(),
            type: "Tongue Twister",
            totalQuestions: data.length,
            passedQuestions,
            averageDuration,
            overallPassed,
            questions: data
        };

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            tongueTwisterHistory: arrayUnion(gameRecord)
        });
    };

    const playRecording = async () => {
        if (!recordingUri) return;
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri });
        await newSound.playAsync();
        setSound(newSound);
    };

    const simulateTranscription = async () => {
        setTranscribedText(tongueTwisters[currentStep]);
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
                            <TouchableOpacity style={styles.resultsButton} onPress={() => router.push("/(stack)/gameresult")}>
                                <Text style={styles.resultsButtonText}>Proceed to Results</Text>
                            </TouchableOpacity>
                        </>
                    ) : showReviewScreen ? (
                        <>
                            <Text style={styles.carouselText}>Your Response Review</Text>
                            <TouchableOpacity onPress={playRecording} style={styles.micButton}>
                                <FontAwesome5 name="play" size={width * 0.2} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.reviewLabel}>Expected:</Text>
                            <Text style={styles.reviewText}>{tongueTwisters[currentStep]}</Text>
                            <Text style={styles.reviewLabel}>You said:</Text>
                            <Text style={styles.reviewText}>{transcribedText}</Text>
                            <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
                                <Text style={styles.submitButtonText}>Next</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.carouselText}>Please read the following!</Text>
                            <Text style={styles.twisterText}>{tongueTwisters[currentStep]}</Text>
                            <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.micButton}>
                                <FontAwesome5 name={recording ? "stop" : "microphone"} size={width * 0.2} color="white" />
                            </TouchableOpacity>
                            <View style={styles.timerContainer}>
                                <Text style={styles.timerText}>
                                    00:{("00" + countdown).slice(-2)}
                                </Text>
                            </View>
                            {!recording && recordingUri && (
                                <TouchableOpacity onPress={playRecording} style={styles.replayButton}>
                                    <Text style={styles.replayButtonText}>Replay Recording</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </>
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
    resultsButton: {
        backgroundColor: "white",
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 30,
    },
    resultsButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
    },
    carouselText: {
        color: "white",
        fontSize: width * 0.045,
        textAlign: "center",
        marginBottom: height * 0.015,
    },
    twisterText: {
        color: "white",
        fontSize: width * 0.05,
        textAlign: "center",
        marginBottom: height * 0.03,
    },
    micButton: {
        backgroundColor: "black",
        padding: width * 0.08,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    timerContainer: {
        marginTop: height * 0.02,
    },
    timerText: {
        color: "white",
        fontSize: width * 0.05,
        textAlign: "center",
    },
    replayButton: {
        backgroundColor: "white",
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.08,
        borderRadius: 30,
        marginTop: height * 0.02,
    },
    replayButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
        textAlign: "center",
    },
    submitButton: {
        backgroundColor: "#fff",
        width: "80%",
        paddingVertical: height * 0.02,
        borderRadius: 30,
        alignItems: "center",
        marginTop: height * 0.03,
    },
    submitButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
    },
    reviewLabel: {
        color: "white",
        fontSize: width * 0.04,
        marginTop: height * 0.02,
    },
    reviewText: {
        color: "#fff",
        fontSize: width * 0.05,
        textAlign: "center",
        marginTop: height * 0.01,
    },
});
