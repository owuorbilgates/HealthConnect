import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const CONSULTATION_FEE = 1500; // Mock fee in KES

export default function MpesaPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayNow = () => {
    // Basic validation for a Kenyan phone number
    if (!/^(07|01)\d{8}$/.test(phoneNumber) && !/^254\d{9}$/.test(phoneNumber)) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid M-Pesa phone number (e.g., 0712345678 or 254712345678).');
        return;
    }

    // Navigate to the status screen in loading state
    router.push({
      pathname: '/(payment)/status',
      params: { ...params, status: 'loading' },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <View>
        <ThemedText type="subtitle" style={styles.prompt}>Enter your M-Pesa phone number to pay:</ThemedText>
        <ThemedText type="title" style={styles.amount}>KES {CONSULTATION_FEE.toLocaleString()}</ThemedText>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="e.g., 0712345678"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handlePayNow}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  prompt: {
    textAlign: 'center',
  },
  amount: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    marginBottom: 24,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00A37D',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
