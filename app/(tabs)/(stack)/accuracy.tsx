import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DashboardHeader from "@/components/DashboardHeader";

const { width, height } = Dimensions.get("window");

export default function AccuracyScreen() {
  const router = useRouter();

  return (
      <ScrollView contentContainerStyle={styles.scrollScreen}>
        <View style={styles.screenContainer}>
          <DashboardHeader />
          <View style={styles.gameWrapper}>
            <View style={styles.gameContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="bug-outline" size={width * 0.18} color="black" />
                <Ionicons name="boat-outline" size={width * 0.18} color="black" />
              </View>
              <Text style={styles.carouselText}>
                The player will be given a set of shapes to recognize
              </Text>
              <View style={styles.paginationDots}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
              </View>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.sectionTitle}>Item Accuracy</Text>
              <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.description}>
                  The Accuracy Test is designed to evaluate a player's ability to recognize and recall specific shapes within a given timeframe. Participants will be presented with a set of shapes and asked to identify the correct ones from a larger grid. The test progresses through multiple stages, with increasing difficulty, to assess cognitive processing and visual memory accuracy. The goal is to measure how well a participant can differentiate between similar patterns under controlled conditions. The test duration is approximately 5-10 minutes, and results will be provided upon completion.
                </Text>
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
                  onPress={() => router.push("/(tabs)/(stack)/MemoryCheck/TermsOfConditons")}
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
  scrollScreen: {
    flexGrow: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  gameWrapper: {
    width: "100%",
    alignItems: "center",
  },
  gameContainer: {
    backgroundColor: "#25D366",
    width: "100%",
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    padding: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  carouselText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.03,
    width: "70%",
    marginTop: 10,
  },
  paginationDots: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginHorizontal: 3,
    opacity: 0.5,
  },
  activeDot: {
    opacity: 1,
  },
  infoBox: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    padding: width * 0.05,
    justifyContent: "space-between",
  },
  scrollContainer: {
    maxHeight: height * 0.15,
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  description: {
    fontSize: width * 0.03,
    color: "#000",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: width * 0.035,
    marginTop: 2,
  },
  highlightText: {
    fontSize: width * 0.03,
    color: "#25D366",
    marginBottom: 2,
  },
  testerLabel: {
    fontSize: width * 0.035,
    marginTop: 2,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  personInfo: {
    flex: 1,
    marginLeft: 10,
  },
  personName: {
    fontSize: width * 0.04,
  },
  personRole: {
    fontSize: width * 0.03,
    color: "#000",
  },
  editText: {
    color: "#25D366",
    fontSize: width * 0.03,
  },
  startButton: {
    backgroundColor: "#25D366",
    width: "100%",
    paddingVertical: height * 0.02,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
});