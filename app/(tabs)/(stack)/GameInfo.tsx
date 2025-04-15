import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DashboardHeader from "@/components/DashboardHeader";
import StroopBrick from "@/components/StroopBrick";

const { width, height } = Dimensions.get("window");

export default function AccuracyScreen() {
  const router = useRouter();
  const { game } = useLocalSearchParams();
  const data = gameData[game as string];

  return (
      <ScrollView contentContainerStyle={styles.scrollScreen}>
        <View style={styles.screenContainer}>
          <DashboardHeader />
          <View style={styles.gameWrapper}>
            <View style={styles.gameContainer}>
              {data?.topContent}
              <Text style={styles.carouselText}>This test requires you to tap the screen</Text>
              <View style={styles.paginationDots}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.sectionTitle}>{data?.title}</Text>
              <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.description}>{data?.description}</Text>
              </ScrollView>
              <Text style={styles.subtitle}>Duration</Text>
              <Text style={styles.highlightText}>5-10 minutes</Text>
              <Text style={styles.testerLabel}>Testee</Text>
              <View style={styles.personRow}>
                <Ionicons name="person-circle-outline" size={width * 0.1} color="black" />
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>Jane Doe</Text>
                  <Text style={styles.personRole}>Patient</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </View>
              <Text style={styles.testerLabel}>Tester</Text>
              <View style={styles.personRow}>
                <Ionicons name="person-circle-outline" size={width * 0.1} color="black" />
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>John Doe</Text>
                  <Text style={styles.personRole}>Doctor of Psychology</Text>
                </View>
              </View>
              <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => router.push(data?.startRoute ?? "/")}
              >
                <Text style={styles.startButtonText}>Start Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollScreen: { flexGrow: 1 },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  gameWrapper: { width: "100%", alignItems: "center" },
  gameContainer: {
    backgroundColor: "#25D366",
    width: "100%",
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    padding: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: { flexDirection: "row", justifyContent: "center", width: "100%" },
  twisterText: {
    color: "#2000FF",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  carouselText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.03,
    width: "70%",
    marginTop: 10,
  },
  paginationDots: { flexDirection: "row", marginTop: 10 },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginHorizontal: 3,
    opacity: 0.5,
  },
  activeDot: { opacity: 1 },
  infoBox: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    padding: width * 0.05,
    justifyContent: "space-between",
  },
  scrollContainer: { maxHeight: height * 0.15, marginBottom: 10 },
  scrollContent: { flexGrow: 1 },
  sectionTitle: { fontSize: width * 0.045, fontWeight: "bold" },
  description: { fontSize: width * 0.03, color: "#000", marginBottom: 2 },
  subtitle: { fontSize: width * 0.035, marginTop: 2 },
  highlightText: { fontSize: width * 0.03, color: "#25D366", marginBottom: 2 },
  testerLabel: { fontSize: width * 0.035, marginTop: 2 },
  personRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  personInfo: { flex: 1, marginLeft: 10 },
  personName: { fontSize: width * 0.04 },
  personRole: { fontSize: width * 0.03, color: "#000" },
  editText: { color: "#25D366", fontSize: width * 0.03 },
  startButton: {
    backgroundColor: "#25D366",
    width: "100%",
    paddingVertical: height * 0.02,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: { color: "#fff", fontSize: width * 0.04 },
});

const gameData: any = {
  "memory-check": {
    title: "Item Accuracy",
    description:
        "The Accuracy Test is designed to evaluate a player's ability to recognize and recall specific shapes within a given timeframe. Participants will be presented with a set of shapes and asked to identify the correct ones from a larger grid. The test progresses through multiple stages, with increasing difficulty, to assess cognitive processing and visual memory accuracy.",
    startRoute: "/(tabs)/(stack)/MemoryCheck/MCGInstructions",
    topContent: (
        <View style={styles.iconContainer}>
          <Ionicons name="bug-outline" size={width * 0.18} color="black" />
          <Ionicons name="boat-outline" size={width * 0.18} color="black" />
        </View>
    ),
  },
  "tongue-twister": {
    title: "Tongue Twister Game",
    description:
        "You will be shown several tongue twisters in a row. Please read them into the microphone as clearly as you can. Press the “NEXT” button once you have read the phrase. Continue reading until time is up.",
    startRoute: "/(tabs)/(stack)/TongueTwister/TongueTwisterGame",
    topContent: (
        <Text style={styles.twisterText}>She sells{"\n"}seashell by{"\n"}the seashore</Text>
    ),
  },
  "stroop-naming": {
    title: "Stroop Naming",
    description:
        "A word will appear at the top of the screen, with three answer choices at the bottom. Choose the answer choice that matches the color of the word, not what the text says.",
    startRoute: "/(tabs)/(stack)/StroopNaming/TermsOfConditons",
    topContent: <StroopBrick color="#D3D3D3" text="GRAY" textColor="blue" />,
  },
  "leg-balance": {
    title: "Single Leg Balance Game",
    description:
        "Balance on one leg while completing simple mental tasks on screen. This test helps measure stability and multitasking ability.",
    startRoute: "/(tabs)/(stack)/LegBalance/TermsOfConditons",
    topContent: <Text style={styles.twisterText}>RED</Text>,
  },
};