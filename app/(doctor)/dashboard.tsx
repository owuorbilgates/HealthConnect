import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter, Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_APPOINTMENTS = [
  {
    id: '1',
    patientName: 'Alice Johnson',
    time: '10:00 AM - 10:30 AM',
    date: '2026-01-15',
    status: 'Confirmed',
  },
  {
    id: '2',
    patientName: 'Bob Williams',
    time: '11:00 AM - 11:30 AM',
    date: '2026-01-15',
    status: 'Confirmed',
  },
  {
    id: '3',
    patientName: 'Charlie Brown',
    time: '2:00 PM - 2:30 PM',
    date: '2026-01-16',
    status: 'Pending',
  },
];

const EarningsWallet = () => (
    <View style={styles.walletCard}>
        <ThemedText style={styles.walletTitle}>My Wallet</ThemedText>
        <Text style={styles.walletBalance}>KES 42,500</Text>
        <Text style={styles.walletSubtext}>Total Earnings</Text>
        <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw to M-Pesa</Text>
        </TouchableOpacity>
    </View>
);

export default function DoctorDashboard() {
  const router = useRouter();

  const renderAppointment = ({ item }: { item: typeof MOCK_APPOINTMENTS[0] }) => (
    <TouchableOpacity style={styles.appointmentCard} onPress={() => router.push(`/consultation/${item.id}`)}>
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{item.patientName}</Text>
        <Text style={styles.appointmentTime}>{item.date} at {item.time}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{ 
            title: 'HealthConnect',
            headerRight: () => (
                <TouchableOpacity onPress={() => router.push({ pathname: '/(settings)', params: { role: 'doctor' }})}>
                    <Ionicons name="person-circle-outline" size={32} color="#007AFF" style={{ marginRight: 16 }} />
                </TouchableOpacity>
            )
        }} 
      />
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>Doctor Dashboard</ThemedText>
        
        <EarningsWallet />

        <View style={styles.toolsContainer}>
             <TouchableOpacity style={styles.toolButton} onPress={() => router.push('/(doctor)/availability')}>
                <Text style={styles.toolButtonText}>Manage Availability</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.toolButton} onPress={() => router.push('/(doctor)/prescription')}>
                <Text style={styles.toolButtonText}>Write Prescription</Text>
            </TouchableOpacity>
        </View>

        <ThemedText type="subtitle" style={styles.subtitle}>Upcoming Appointments</ThemedText>
        <FlatList
          data={MOCK_APPOINTMENTS}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  walletCard: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  walletTitle: {
      color: '#fff',
      fontSize: 16,
      opacity: 0.8,
  },
  walletBalance: {
      color: '#fff',
      fontSize: 40,
      fontWeight: 'bold',
      marginVertical: 4,
  },
  walletSubtext: {
      color: '#fff',
      opacity: 0.8,
  },
  withdrawButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 16,
  },
  withdrawButtonText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  toolsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  toolButton: {
      backgroundColor: '#f0f0f0',
      padding: 16,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 8,
      alignItems: 'center',
  },
  toolButtonText: {
      fontWeight: '600',
      fontSize: 15,
  },
  listContainer: {
    paddingBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  confirmed: {
    backgroundColor: '#34C759',
  },
  pending: {
    backgroundColor: '#FF9500',
  },
});
