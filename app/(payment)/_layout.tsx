import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    <Stack screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="methods" options={{ title: 'Choose Payment Method' }} />
      <Stack.Screen name="mpesa" options={{ title: 'Pay with M-Pesa' }} />
      <Stack.Screen name="status" options={{ headerShown: false }} />
    </Stack>
  );
}
