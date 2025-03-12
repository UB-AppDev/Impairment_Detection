import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { randomizeIcons, selectCorrectIcons } from "@/logic/Randomizer";

export default function AccuracyScreen() {
  const router = useRouter();
  const iconsGrid = randomizeIcons();
  const correctIcons = selectCorrectIcons(iconsGrid);

  return (
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={50} color="black" />
          <View>
            <Text style={styles.headerTitle}>Jane Doe</Text>
            <Text style={styles.headerSubtitle}>Patient</Text>
          </View>
        </View>

        <View style={styles.carouselBox}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name={correctIcons[0]} size={40} color="white" />
            <FontAwesome5 name={correctIcons[1]} size={40} color="white" />
          </View>
          <Text style={styles.carouselText}>
            Identify the following shapes among other shapes
          </Text>
          <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push({ pathname: "/(tabs)/(stack)/memorycheckgame", params: { correctIcons } })}
          >
            <Text style={styles.startButtonText}>Proceed</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  carouselBox: {
    backgroundColor: "#28C76F",
    width: "100%",
    height: "50%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  carouselText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  startButtonText: {
    color: "#28C76F",
    fontSize: 16,
    fontWeight: "bold",
  },
});