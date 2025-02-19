import { Squircle } from '@/components/squircle';
import TestResultCard from '@/components/TestResultCard';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  return (
    // We wrap everything in a parent View to ensure a solid white background
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.darkText}>
          Dashboard
        </ThemedText>

        {/* Horizontal Scroll Section */}
        <View style={styles.horizontalSection}>
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalContainer}
          >
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 1" />
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 2" />
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 3" />
            <Squircle imageUri="https://via.placeholder.com/200" text="Test 4" />
          </ScrollView>
        </View>

        <ThemedText type="default" style={styles.darkText}>
          Past Tests
        </ThemedText>
        <TestResultCard
          name="Jane Doe"
          role="Patient"
          status="Pass"
          date="2/18/2025"
          time="21:06:00 - 21:12:00"
          testName="Item Accuracy"
        />
        <TestResultCard
          name="Jane Doe"
          role="Patient"
          status="Fail"
          date="2/13/2025"
          time="21:00:00 - 21:05:00"
          testName="Item Accuracy"
        />
        <TestResultCard
          name="Jane Doe"
          role="Patient"
          status="Fail"
          date="2/13/2025"
          time="21:00:00 - 21:05:00"
          testName="Item Accuracy"
        />
        <TestResultCard
          name="Jane Doe"
          role="Patient"
          status="Fail"
          date="2/13/2025"
          time="21:00:00 - 21:05:00"
          testName="Item Accuracy"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Ensures the entire screen area is white, including bottom
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Adds padding for the ScrollView content
  scrollContent: {
    padding: 20,
  },
  // Dark text override
  darkText: {
    color: '#000',
  },
  // Horizontal section is full width with some vertical spacing
  horizontalSection: {
    width: '100%',
    marginVertical: 10,
  },
  // Lays out squircle cards in a row
  horizontalContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
