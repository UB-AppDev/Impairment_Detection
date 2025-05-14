import { Stack } from 'expo-router';

export default function GamesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MemoryCheck/TermsOfConditions" />
            <Stack.Screen name="MemoryCheck/memorycheckgame" />

            <Stack.Screen name="StroopNaming/TermsOfConditions" />
            <Stack.Screen name="StroopNaming/StroopNamingGame" />

            <Stack.Screen name="LegBalance/TermsOfConditions" />
            <Stack.Screen name="LegBalance/SingleLegBalanceGame" />

            <Stack.Screen name="TongueTwister/TongueTwisterGame" />

            <Stack.Screen name="MemoryCheck/MCGInstructions" />
            <Stack.Screen name="MemoryCheck/MemoryCheckGame" />

            <Stack.Screen name="EyeTracker/VisualPursuitsGame" />
            

        </Stack>
    );
}