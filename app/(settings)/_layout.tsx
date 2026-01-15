import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
      <Stack.Screen name="appointments" options={{ title: 'My Appointments' }} />
      <Stack.Screen name="history" options={{ title: 'Medical History' }} />
      <Stack.Screen name="profile" options={{ title: 'Edit Profile' }} />
    </Stack>
  );
}
