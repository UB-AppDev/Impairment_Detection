import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import GameHeader from "@/components/GameHeader";
import ProgressTracker from "@/components/ProgressTracker";
import { randomizeIcons, selectCorrectIcons } from "@/logic/Randomizer";

const { width, height } = Dimensions.get("window");

export default function AccuracyScreen() {
  const router = useRouter();
  const iconsGrid = randomizeIcons();
  const correctIcons = selectCorrectIcons(iconsGrid);
  const progressStatus = ["inProgress", "inProgress", "inProgress", "inProgress"];

  return (
      <View style={styles.screenContainer}>
        <GameHeader />
        <View style={styles.gameWrapper}>
          <View style={styles.gameContainer}>
            <Text style={styles.carouselText}>Identify the following shapes among other shapes</Text>
            <View style={styles.iconContainer}>
              <FontAwesome5 name={correctIcons[0]} size={width * 0.2} color="white" />
              <FontAwesome5 name={correctIcons[1]} size={width * 0.2} color="white" />
            </View>
            <TouchableOpacity
                style={styles.startButton}
                onPress={() =>
                    router.push({
                      pathname: "/(tabs)/(stack)/MemoryCheck/MemoryCheckGame",
                      params: { correctIcons },
                    })
                }
            >
              <Text style={styles.startButtonText}>Proceed</Text>
            </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  carouselText: {
    color: "white",
    fontSize: width * 0.045,
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  startButton: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: height * 0.018,
    borderRadius: 30,
    alignItems: "center",
  },
  startButtonText: {
    color: "#28C76F",
    fontSize: width * 0.035,
  },
});