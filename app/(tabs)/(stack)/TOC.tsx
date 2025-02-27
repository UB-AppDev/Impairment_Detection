import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TOCScreen() {
  const router = useRouter();

  return (
    <View style={styles.screenContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={50} color="black" />
        <View>
          <Text style={styles.headerTitle}>John Doe</Text>
          <Text style={styles.headerSubtitle}>Doctor of Psychology</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Green Carousel Box */}
        <View style={styles.carouselBox}>
          <View style={styles.iconContainer}>
            <Ionicons name="bug-outline" size={40} color="black" />
            <Ionicons name="boat-outline" size={40} color="black" />
          </View>
          <Text style={styles.carouselText}>
            Before we begin, please take a moment to review the following information.
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Item Accuracy</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </Text>
          {/* Start Test Button */}
        <TouchableOpacity style={styles.startButton}
            onPress={() => router.push("/(tabs)/(stack)/accuracygame")} // Redirects to Accuracy Game
        >
          <Text style={styles.startButtonText}>Start Test</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  /** Scroll View Container **/
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },

  /** Header Section **/
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

  /** Carousel Box **/
  carouselBox: {
    backgroundColor: "#28C76F",
    width: "100%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
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

  /** Info Box **/
  infoBox: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "gray",
  },

  /** Start Button **/
  startButton: {
    backgroundColor: "#28C76F",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
