import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CONSULTATION_FEE = 1500; // Mock fee in KES

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { doctorName, doctorSpecialty, selectedDate, selectedTime } = params;

  const formattedDate = new Date(selectedDate as string).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleProceedToPayment = () => {
    // Navigate to the payment flow, passing all booking details
    router.push({
        pathname: '/(payment)/methods',
        params,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Confirm Your Appointment</ThemedText>
      
      <View style={styles.summaryCard}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Consultation with</ThemedText>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.doctorSpecialty}>{doctorSpecialty}</Text>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Date</ThemedText>
            <Text style={styles.detailValue}>{formattedDate}</Text>
        </View>
        <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Time</ThemedText>
            <Text style={styles.detailValue}>{selectedTime}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Consultation Fee</ThemedText>
            <Text style={styles.feeValue}>KES {CONSULTATION_FEE.toLocaleString()}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleProceedToPayment}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  feeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
