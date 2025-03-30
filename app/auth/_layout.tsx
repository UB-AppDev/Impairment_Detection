import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="firstandlastname" />
            <Stack.Screen name="organization" />
            <Stack.Screen name="termsofservice" />
        </Stack>
    );
}