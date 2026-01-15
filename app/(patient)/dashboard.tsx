import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter, Stack } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    location: 'Nairobi',
    rating: 4.8,
    image: 'https://i.pravatar.cc/150?img=68', // Placeholder image
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    specialty: 'Pediatrician',
    location: 'Mombasa',
    rating: 4.9,
    image: 'https://i.pravatar.cc/150?img=43',
  },
  {
    id: '3',
    name: 'Dr. Peter Jones',
    specialty: 'Dermatologist',
    location: 'Kisumu',
    rating: 4.7,
    image: 'https://i.pravatar.cc/150?img=60',
  },
  {
    id: '4',
    name: 'Dr. Maryanne Okoro',
    specialty: 'General Practitioner',
    location: 'Nakuru',
    rating: 5.0,
    image: 'https://i.pravatar.cc/150?img=32',
  },
];

export default function PatientDashboard() {
  const router = useRouter();

  const renderDoctor = ({ item }: { item: typeof MOCK_DOCTORS[0] }) => (
    <TouchableOpacity style={styles.doctorCard} onPress={() => router.push(`/doctor/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        <Text style={styles.doctorLocation}>{item.location}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{ 
            title: 'HealthConnect',
            headerRight: () => (
                <TouchableOpacity onPress={() => router.push({ pathname: '/(settings)', params: { role: 'patient' }})}>
                    <Ionicons name="person-circle-outline" size={32} color="#007AFF" style={{ marginRight: 16 }} />
                </TouchableOpacity>
            )
        }} 
      />
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>Available Doctors</ThemedText>
        <FlatList
          data={MOCK_DOCTORS}
          renderItem={renderDoctor}
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
  listContainer: {
    paddingBottom: 16,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  doctorLocation: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  ratingContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFFBEA',
  },
  ratingText: {
    color: '#F59E0B',
    fontWeight: '600',
  },
});
