import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from "react-native";
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
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [currentStep, setCurrentStep] = useState(0);
    const [progressStatus, setProgressStatus] = useState(["inProgress", "inProgress", "inProgress", "inProgress"]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameData, setGameData] = useState<any[]>([]);
    const [showReviewScreen, setShowReviewScreen] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaybackEnded, setIsPlaybackEnded] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
            if (permission.status !== "granted") return;
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
        const uri = recording.getURI();
        setRecordingUri(uri ?? null);
        setRecording(null);
    };

    const handleSubmit = (transcriptionOverride?: string) => {
        if (!recordingUri) {
            setShowModal(true);
            return;
        }

        const expected = tongueTwisters[currentStep].toLowerCase().replace(/[^a-z\s]/gi, "").replace(/\s+/g, " ").trim();
        const actualInput = transcriptionOverride ?? transcribedText;
        const actual = actualInput.toLowerCase().replace(/[^a-z\s]/gi, "").replace(/\s+/g, " ").trim();
        const passed = actual === expected;

        const result = {
            question: currentStep + 1,
            duration: 0,
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
    };

    const simulateTranscription = async () => {
        const simulated = tongueTwisters[currentStep];
        setTranscribedText(simulated);
        setTimeout(() => handleSubmit(simulated), 300);
    };

    const handleContinue = () => {
        setShowReviewScreen(false);
        if (sound) {
            sound.unloadAsync();
            setSound(null);
        }
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
            setRecording(null);
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
        const overallPassed = passedQuestions >= 2;
        const gameRecord = {
            timestamp: new Date().toISOString(),
            type: "Tongue Twisters",
            totalQuestions: data.length,
            passedQuestions,
            averageDuration: 0,
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
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
            return;
        }
        if (sound && !isPlaying && !isPlaybackEnded) {
            await sound.playAsync();
            setIsPlaying(true);
            return;
        }
        if (sound && isPlaybackEnded) {
            await sound.unloadAsync();
            setSound(null);
            setIsPlaybackEnded(false);
        }
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri }, { shouldPlay: true });
        setSound(newSound);
        setIsPlaying(true);
        newSound.setOnPlaybackStatusUpdate(status => {
            if (!status.isLoaded) return;
            if (status.didJustFinish) {
                setIsPlaying(false);
                setPlaybackPosition(0);
                setIsPlaybackEnded(true);
            } else {
                setPlaybackPosition(status.positionMillis ?? 0);
            }
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
                            <TouchableOpacity style={styles.resultsButton} onPress={() => router.push("/(stack)/gameresult")}>
                                <Text style={styles.resultsButtonText}>Proceed to Results</Text>
                            </TouchableOpacity>
                        </>
                    ) : showReviewScreen ? (
                        <>
                            <Text style={styles.carouselText}>Your Response Review</Text>
                            <TouchableOpacity onPress={playRecording} style={styles.micButton}>
                                <FontAwesome5 name={isPlaying ? "pause" : "play"} size={width * 0.08} color="white" />
                            </TouchableOpacity>
                            <View style={[styles.playingStatusTag, isPlaying ? styles.inProgressStatus : styles.failedStatus]}>
                                <Text style={styles.statusText}>{isPlaying ? "Playing Recording" : "Not Playing Recording"}</Text>
                            </View>
                            <Text style={styles.reviewLabel}>Expected:</Text>
                            <Text style={styles.reviewText}>{tongueTwisters[currentStep]}</Text>
                            <Text style={styles.reviewLabel}>You said:</Text>
                            <Text style={styles.reviewText}>{transcribedText}</Text>
                            <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
                                <Text style={styles.submitButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.carouselText}>Please read the following!</Text>
                            <Text style={styles.twisterText}>{tongueTwisters[currentStep]}</Text>
                            {!recording && !recordingUri && (
                                <>
                                    <TouchableOpacity onPress={startRecording} style={styles.micButton}>
                                        <FontAwesome5 name="microphone" size={width * 0.08} color="white" />
                                    </TouchableOpacity>
                                    <View style={[styles.playingStatusTag, styles.failedStatus]}>
                                        <Text style={styles.statusText}>Please hit the button to begin recording</Text>
                                    </View>
                                </>
                            )}
                            {recording && (
                                <>
                                    <TouchableOpacity onPress={stopRecording} style={styles.micButton}>
                                        <FontAwesome5 name="stop" size={width * 0.08} color="white" />
                                    </TouchableOpacity>
                                    <View style={[styles.playingStatusTag, styles.recordingStatus]}>
                                        <Text style={styles.statusText}>Recording...</Text>
                                    </View>
                                </>
                            )}
                            {!recording && recordingUri && (
                                <>
                                    <TouchableOpacity onPress={startRecording} style={styles.micButton}>
                                        <FontAwesome5 name="redo" size={width * 0.08} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        if (sound) {
                                            sound.unloadAsync();
                                            setSound(null);
                                        }
                                        setRecording(null);
                                        setRecordingUri(null);
                                        setTranscribedText("");
                                        setCountdown(60);
                                    }}>
                                        <View style={[styles.playingStatusTag, styles.redoStatus]}>
                                            <Text style={styles.statusText}>Select here to redo your recording</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )}
                            <View style={styles.timerContainer}>
                                <Text style={styles.timerText}>00:{("00" + countdown).slice(-2)}</Text>
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={simulateTranscription}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <ProgressTracker progressStatus={progressStatus} />
            </View>
            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>You must complete and submit this question before proceeding.</Text>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Return to Question</Text>
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
        color: "#fff",
        fontSize: width * 0.045,
        textAlign: "center",
        marginBottom: height * 0.015,
        width: "90%",
    },
    twisterText: {
        color: "#000",
        fontSize: width * 0.025,
        textAlign: "center",
        marginBottom: height * 0.03,
        width: "90%",
    },
    micButton: {
        backgroundColor: "#000",
        padding: width * 0.04,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: height * 0.015,
    },
    timerContainer: {
        marginTop: height * 0.02,
    },
    timerText: {
        color: "white",
        fontSize: width * 0.05,
        textAlign: "center",
    },
    submitButton: {
        backgroundColor: "#fff",
        width: "80%",
        paddingVertical: height * 0.02,
        borderRadius: 30,
        alignItems: "center",
        marginTop: height * 0.02,
    },
    submitButtonText: {
        color: "#28C76F",
        fontSize: width * 0.045,
    },
    reviewLabel: {
        color: "white",
        fontSize: width * 0.03,
        marginTop: height * 0.015,
        textAlign: "center",
    },
    reviewText: {
        color: "#000",
        fontSize: width * 0.02,
        textAlign: "center",
        marginTop: height * 0.008,
        width: "90%",
    },
    playingStatusTag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: height * 0.015,
    },
    inProgressStatus: {
        backgroundColor: "#638AB4",
    },
    failedStatus: {
        backgroundColor: "#E74C3C",
    },
    recordingStatus: {
        backgroundColor: "#25D366",
    },
    redoStatus: {
        backgroundColor: "#F39C12",
    },
    statusText: {
        color: "#fff",
        fontSize: 8,
        textAlign: "center",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#28C76F",
        padding: 30,
        borderRadius: 20,
        width: "80%",
    },
    modalText: {
        color: "#fff",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderRadius: 20,
    },
    modalButtonText: {
        color: "#000",
        textAlign: "center",
        fontSize: 12,
    },
});