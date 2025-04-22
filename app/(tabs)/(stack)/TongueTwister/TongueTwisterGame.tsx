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
        const uri = recording.getURI();
        setRecordingUri(uri ?? null);
        setRecording(null);
    };

    const handleSubmit = () => {
        const passed = recordingUri !== null && transcribedText.toLowerCase().trim() === tongueTwisters[currentStep].toLowerCase().trim();

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
        simulateTranscription();
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
            type: "Tongue Twister",
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
                                <FontAwesome5 name={isPlaying ? "pause" : "play"} size={width * 0.08} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.reviewLabel}>{isPlaying ? "Playing Recording" : "Not Playing Recording"}</Text>
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
                            {!recording && !recordingUri && (
                                <TouchableOpacity onPress={startRecording} style={styles.micButton}>
                                    <FontAwesome5 name="microphone" size={width * 0.08} color="white" />
                                </TouchableOpacity>
                            )}
                            {recording && (
                                <TouchableOpacity onPress={stopRecording} style={styles.micButton}>
                                    <FontAwesome5 name="stop" size={width * 0.08} color="white" />
                                </TouchableOpacity>
                            )}
                            {!recording && recordingUri && (
                                <>
                                    <TouchableOpacity onPress={playRecording} style={styles.micButton}>
                                        <FontAwesome5 name={isPlaying ? "pause" : "play"} size={width * 0.08} color="white" />
                                    </TouchableOpacity>
                                    <Text style={styles.reviewLabel}>{isPlaying ? "Playing Recording" : "Not Playing Recording"}</Text>
                                </>
                            )}
                            <View style={styles.timerContainer}>
                                <Text style={styles.timerText}>00:{("00" + countdown).slice(-2)}</Text>
                            </View>
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
        width: "90%",
    },
    twisterText: {
        color: "white",
        fontSize: width * 0.045,
        textAlign: "center",
        marginBottom: height * 0.03,
        width: "90%",
    },
    micButton: {
        backgroundColor: "black",
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
        marginTop: height * 0.03,
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
        color: "#fff",
        fontSize: width * 0.03,
        textAlign: "center",
        marginTop: height * 0.008,
        width: "90%",
    },
});
