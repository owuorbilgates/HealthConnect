import { Stack } from 'expo-router';

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen name="calendar" options={{ title: 'Book Appointment' }} />
      <Stack.Screen name="time" options={{ title: 'Select a Time' }} />
      <Stack.Screen name="confirm" options={{ title: 'Confirm & Pay' }} />
    </Stack>
  );
}
