import { Stack } from 'expo-router';

export default function GamesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MemoryCheck/GameInfo" />
            <Stack.Screen name="MemoryCheck/TermsOfConditions" />
            <Stack.Screen name="MemoryCheck/memorycheckgame" />

            <Stack.Screen name="StroopNaming/GameInfo" />
            <Stack.Screen name="StroopNaming/TermsOfConditions" />
            <Stack.Screen name="StroopNaming/StroopNamingGame" />

            <Stack.Screen name="LegBalance/GameInfo" />
            <Stack.Screen name="LegBalance/TermsOfConditions" />
            <Stack.Screen name="LegBalance/SingleLegBalanceGame" />

            <Stack.Screen name="TongueTwister/GameInfo" />
            <Stack.Screen name="TongueTwister/tonguetwister" />
            

        </Stack>
    );
}