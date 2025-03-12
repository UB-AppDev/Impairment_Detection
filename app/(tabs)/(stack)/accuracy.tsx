import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function AccuracyScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={50} color="black" />
          <View>
            <Text style={styles.headerTitle}>John Doe</Text>
            <Text style={styles.headerSubtitle}>Doctor of Psychology</Text>
          </View>
        </View>

        <View style={styles.carouselBox}>
          <View style={styles.iconContainer}>
            <Ionicons name="bug-outline" size={40} color="black" />
            <Ionicons name="boat-outline" size={40} color="black" />
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
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation.
          </Text>
          <Text style={styles.subtitle}>Duration</Text>
          <Text style={styles.highlightText}>5-10 minutes</Text>
          <View style={styles.personRow}>
            <Ionicons name="person-circle-outline" size={40} color="black" />
            <View style={styles.personInfo}>
              <Text style={styles.personName}>Jane Doe</Text>
              <Text style={styles.personRole}>Patient</Text>
            </View>
            <Text style={styles.editText}>Edit</Text>
          </View>
          <View style={styles.personRow}>
            <Ionicons name="person-circle-outline" size={40} color="black" />
            <View style={styles.personInfo}>
              <Text style={styles.personName}>John Doe</Text>
              <Text style={styles.personRole}>Doctor of Psychology</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push("/(tabs)/(stack)/TOC")}
        >
          <Text style={styles.startButtonText}>Start Test</Text>
        </TouchableOpacity>
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
  startButton: {
    backgroundColor: "#28C76F",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

