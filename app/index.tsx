import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200' }} // Replace with your actual image
        style={styles.image}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Title */}
      <Text style={styles.title}>All-In One Sobriety App!</Text>

      {/* Green Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)/dashboard')} // Redirects to Dashboard
      >
        <Text style={styles.buttonText}>Begin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#28C76F', // Green color for active dot
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28C76F',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28C76F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
