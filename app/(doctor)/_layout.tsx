import { Stack } from 'expo-router';

export default function DoctorLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="availability" options={{ title: 'Manage Availability' }} />
      <Stack.Screen name="prescription" options={{ title: 'Write Prescription' }} />
    </Stack>
  );
}