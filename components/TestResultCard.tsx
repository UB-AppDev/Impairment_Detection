import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TestResultCardProps {
  name: string;
  role: string;
  status: string;
  date: string;
  time: string;
  testName: string;
}

export default function TestResultCard({
  name,
  role,
  status,
  date,
  time,
  testName,
}: TestResultCardProps) {
  return (
    <View style={styles.card}>
      {/* Green Header */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
        </View>
        <View style={styles.statusSection}>
          <View style={status === 'Fail' ? styles.failBadge : styles.passBadge}>
            <Text style={styles.badgeText}>{status}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {/* White Body */}
      <View style={styles.body}>
        <View style={styles.testInfo}>
          <Text style={styles.boldText}>Test Performed:</Text>
          <Text style={styles.testName}> 🖐 {testName}</Text>
        </View>

        {/* Questions Row */}
        <View style={styles.questionsRow}>
          {[1, 2, 3, 4].map((num) => (
            <View key={num} style={styles.questionBox}>
              <Text style={styles.questionNumber}>{num}</Text>
              <Text style={styles.questionText}>Question {num}</Text>
              <View style={styles.incorrectBadge}>
                <Text style={styles.badgeText}>Incorrect</Text>
              </View>
            </View>
          ))}
        </View>

        {/* More Details Button */}
        <TouchableOpacity>
          <Text style={styles.moreDetails}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '90%',
    marginVertical: 8, // reduced vertical margin
  },
  header: {
    backgroundColor: '#28C76F',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10, // reduced padding
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35, // reduced size
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 17.5,
    marginRight: 8, // reduced margin
  },
  name: {
    fontSize: 16, // reduced font size
    fontWeight: 'bold',
    color: '#fff',
  },
  role: {
    fontSize: 12, // reduced font size
    color: '#fff',
  },
  statusSection: {
    alignItems: 'flex-end',
  },
  failBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 3, // reduced margin
  },
  passBadge: {
    backgroundColor: '#28C76F',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 3, // reduced margin
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10, // slightly smaller text
  },
  date: {
    color: '#fff',
    fontSize: 12,
  },
  time: {
    color: '#fff',
    fontSize: 10,
  },
  body: {
    padding: 10, // reduced padding
  },
  testInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // reduced margin
  },
  boldText: {
    fontSize: 14, // reduced font size
    fontWeight: 'bold',
  },
  testName: {
    fontSize: 14,
    color: '#28C76F',
    marginLeft: 5,
  },
  questionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8, // reduced vertical margin
  },
  questionBox: {
    alignItems: 'center',
    flex: 1,
  },
  questionNumber: {
    fontSize: 16, // reduced font size
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 10, // reduced font size
    color: '#777',
  },
  incorrectBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 8, // reduced radius
    paddingVertical: 1, // reduced padding
    paddingHorizontal: 6,
    marginTop: 3, // reduced margin
  },
  moreDetails: {
    color: '#28C76F',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 8, // reduced margin
    fontSize: 12,
  },
});
