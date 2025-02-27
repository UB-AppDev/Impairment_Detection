import { ThemedText } from '@/components/ThemedText';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Statistics</ThemedText>
    </View>
    
  );    
}