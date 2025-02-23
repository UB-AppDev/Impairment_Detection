import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function AccuracyScreen() {
  const router = useRouter();

  return (
    <View style={styles.screenContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={50} color="black" />
        <View>
          <Text style={styles.headerTitle}>Jane Doe</Text>
          <Text style={styles.headerSubtitle}>patient</Text>
        </View>
      </View>

      {/* Green Carousel Box */}
      <View style={styles.carouselBox}>
        <View style={styles.iconContainer}>
          <Ionicons name="bug-outline" size={40} color="white" />
          <Ionicons name="boat-outline" size={40} color="white" />
        </View>
        <Text style={styles.carouselText}>
          Identify the following shapes among other shapes
        </Text>
        <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/(tabs)/(stack)/TOC")}
        >
        <Text style={styles.startButtonText}>Proceed</Text>
      </TouchableOpacity>
      </View>
      {/* Start Test Button */}
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  highlightText: {
    fontSize: 14,
    color: "#28C76F",
    marginBottom: 10,
  },

  /** Person Row **/
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  personInfo: {
    flex: 1,
    marginLeft: 10,
  },
  personName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  personRole: {
    fontSize: 12,
    color: "gray",
  },
  editText: {
    color: "#28C76F",
    fontWeight: "bold",
  },

  /** Start Button **/
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
