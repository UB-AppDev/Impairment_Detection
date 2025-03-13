import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TOCScreen() {
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

        <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
          <View style={styles.carouselBox}>
            <View style={styles.iconContainer}>
              <Ionicons name="bug-outline" size={40} color="black" />
              <Ionicons name="boat-outline" size={40} color="black" />
            </View>
            <Text style={styles.carouselText}>
              Before we begin, please take a moment to review the following information.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Memory Check</Text>
            <Text style={styles.description}>
              {"\n\n"}
              1. Acceptance of Terms: 
              {"\n\n"}
              By participating in this sobriety test, you agree to be bound by these terms and confirm you are of legal age and capable of consenting.
              {"\n\n"}
              2. Test Procedure: 
              {"\n\n"}
              The test is designed to assess your sobriety through a series of standardized tasks. You agree to follow all instructions provided.
              {"\n\n"}
              3. Accuracy and Limitations: 
              {"\n\n"}
              This test is offered on an "as-is" basis without warranties. The results are solely for personal evaluation and not legal or medical advice.
              {"\n\n"}
              4. Data and Privacy: 
              {"\n\n"}
              All data collected during the test will be anonymized and used only for evaluation and test improvement. No personal information will be shared.
              {"\n\n"}
              5. Liability Disclaimer: 
              {"\n\n"}
              Test administrators and associated parties are not liable for any damages or losses resulting from your participation. You assume all risks involved.
              {"\n\n"}
              6. Modification of Terms: 
              {"\n\n"}
              These terms may be updated at any time. Continued participation after changes indicates acceptance of the revised terms.
              {"\n\n"}
              7. Governing Law: 
              {"\n\n"}
              These terms are governed by the applicable laws of the jurisdiction in which the test is conducted.
            </Text>
            <TouchableOpacity style={styles.startButton}
                              onPress={() => router.push("/(tabs)/(stack)/MemoryCheck/Game")}
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
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
