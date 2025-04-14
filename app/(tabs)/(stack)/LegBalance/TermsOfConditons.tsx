import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DashboardHeader from "@/components/DashboardHeader";

export default function TOCScreen() {
  const router = useRouter();

  return (
      <View style={styles.screenContainer}>
        <DashboardHeader />
        <View style={styles.gameWrapper}>
          <View style={styles.gameContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-outline" size={80} color="black" />
            </View>
            <Text style={styles.carouselText}>
              Before we begin, please take a moment to review the following terms of service.
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Terms of Service OF SINGLE LEG BALANCE GAME</Text>
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
                onPress={() => router.push("/(tabs)/(stack)/LegBalance/SingleLegBalanceGame")}
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
    padding: 20,
  },
  gameWrapper: {
    flex: 0.9,
    width: "100%",
    alignItems: "center",
  },
  gameContainer: {
    backgroundColor: "#25D366",
    width: "100%",
    flex: 0.4,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    padding: 20,
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
    fontSize: 10,
    width: "70%",
    marginTop: 10,
  },
  infoBox: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    flex: 0.55,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    padding: 20,
    justifyContent: "space-between",
  },
  scrollContainer: {
    maxHeight: 200,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 9,
    color: "#000",
    marginBottom: 2,
  },
  startButton: {
    backgroundColor: "#25D366",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});