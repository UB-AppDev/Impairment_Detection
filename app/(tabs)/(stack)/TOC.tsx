import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DashboardHeader from "@/components/DashboardHeader";

const { width, height } = Dimensions.get("window");

export default function TOCScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <DashboardHeader />
        <View style={styles.gameWrapper}>
          <View style={styles.gameContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-outline" size={width * 0.2} color="black" />
            </View>
            <Text style={styles.carouselText}>
              Before we begin, please take a moment to review the following terms of service.
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Terms of Service</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.description}>
                By using this application, you agree to the following terms:
                {"\n\n"}
                1. You must comply with all applicable laws and regulations.
                {"\n\n"}
                2. Your use of this application is at your own risk, and we are not liable for any damages.
                {"\n\n"}
                3. You may not use this application for any unlawful or harmful purposes.
                {"\n\n"}
                4. We reserve the right to update these terms at any time without prior notice.
                {"\n\n"}
                Please read these terms carefully before proceeding.
              </Text>
            </ScrollView>
            <TouchableOpacity
                style={styles.startButton}
                onPress={() => router.push("/(tabs)/(stack)/MemoryCheck/memorycheckgame")}
            >
              <Text style={styles.startButtonText}>Begin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  gameWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    backgroundColor: "#25D366",
    width: "100%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    justifyContent: "center",
    width: "100%",
  },
  carouselText: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.035,
    width: "80%",
    marginTop: height * 0.02,
  },
  infoBox: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    justifyContent: "space-between",
    flex: 1,
  },
  scrollContainer: {
    maxHeight: height * 0.3,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.015,
  },
  description: {
    fontSize: width * 0.03,
    color: "#000",
    marginBottom: height * 0.01,
  },
  startButton: {
    backgroundColor: "#25D366",
    width: "100%",
    paddingVertical: height * 0.02,
    borderRadius: 30,
    alignItems: "center",
    marginTop: height * 0.03,
  },
  startButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
});