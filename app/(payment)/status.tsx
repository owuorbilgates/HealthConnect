import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { status } = params;

  // Simulate the M-Pesa API call and result
  useEffect(() => {
    if (status === 'loading') {
      const timer = setTimeout(() => {
        // Randomly succeed or fail for this mock-up
        const isSuccess = Math.random() > 0.3; // 70% chance of success
        router.replace({
          pathname: '/(payment)/status',
          params: { ...params, status: isSuccess ? 'success' : 'failure' },
        });
      }, 4000); // 4-second delay to simulate waiting for PIN

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00A37D" />
        <ThemedText type="subtitle" style={styles.statusText}>
          Waiting for M-Pesa PIN...
        </ThemedText>
        <Text style={styles.subText}>Please check your phone to complete the transaction.</Text>
      </ThemedView>
    );
  }

  if (status === 'success') {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <Ionicons name="checkmark-circle" size={80} color="#34C759" />
        <ThemedText type="title" style={styles.statusText}>
          Payment Confirmed!
        </ThemedText>
        <Text style={styles.subText}>Your appointment has been successfully booked.</Text>
        <TouchableOpacity 
          style={styles.button}
          // In a real app, this would go to a dedicated appointments list
          onPress={() => router.replace('/(patient)/dashboard')} 
        >
          <Text style={styles.buttonText}>Go to My Appointments</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  if (status === 'failure') {
    return (
      <ThemedView style={[styles.container, styles.center]}>
        <Ionicons name="close-circle" size={80} color="#FF3B30" />
        <ThemedText type="title" style={styles.statusText}>
          Payment Failed
        </ThemedText>
        <Text style={styles.subText}>Something went wrong. Please try again.</Text>
        <TouchableOpacity 
          style={[styles.button, styles.retryButton]}
          onPress={() => router.replace('/(payment)/methods')}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return null; // Should not happen
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  statusText: {
    marginTop: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  subText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 32,
  },
  retryButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
