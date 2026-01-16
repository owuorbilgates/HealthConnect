import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* 👇 THIS IS THE FIX. It hides the header for the entire 'patient' folder */}
        <Stack.Screen name="(patient)" options={{ headerShown: false }} />

        {/* You likely need this for the doctor side too later */}
        <Stack.Screen name="(doctor)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}