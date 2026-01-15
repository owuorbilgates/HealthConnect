import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Stack } from 'expo-router';

// In a real app, you'd fetch this data based on the ID.
// Here we'll just use the same mock data and find the doctor.
const MOCK_DOCTORS = [
    { id: '1', name: 'Dr. John Doe', specialty: 'Cardiologist', location: 'Nairobi', rating: 4.8, image: 'https://i.pravatar.cc/150?img=68', bio: 'Dr. Doe has been a practicing cardiologist for over 15 years, with a focus on preventative care and heart health education.' },
    { id: '2', name: 'Dr. Jane Smith', specialty: 'Pediatrician', location: 'Mombasa', rating: 4.9, image: 'https://i.pravatar.cc/150?img=43', bio: 'Dr. Smith is a board-certified pediatrician dedicated to providing comprehensive care for children from birth through adolescence.' },
    { id: '3', name: 'Dr. Peter Jones', specialty: 'Dermatologist', location: 'Kisumu', rating: 4.7, image: 'https://i.pravatar.cc/150?img=60', bio: 'With a passion for skin health, Dr. Jones specializes in treating a wide range of dermatological conditions.' },
    { id: '4', name: 'Dr. Maryanne Okoro', specialty: 'General Practitioner', location: 'Nakuru', rating: 5.0, image: 'https://i.pravatar.cc/150?img=32', bio: 'Dr. Okoro provides holistic primary care services to patients of all ages, focusing on long-term wellness.' },
];


export default function DoctorProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const doctor = MOCK_DOCTORS.find(d => d.id === id);
    const router = useRouter();

    if (!doctor) {
        return (
            <ThemedView style={styles.container}>
                <SafeAreaView>
                    <ThemedText>Doctor not found.</ThemedText>
                </SafeAreaView>
            </ThemedView>
        );
    }

    const handleBooking = () => {
        router.push({
            pathname: '/(booking)/calendar',
            params: { 
                doctorId: doctor.id, 
                doctorName: doctor.name,
                doctorSpecialty: doctor.specialty,
            },
        });
    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: doctor.name, headerBackTitle: 'Back' }} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                    <ThemedText type="title" style={styles.doctorName}>{doctor.name}</ThemedText>
                    <ThemedText type="subtitle" style={styles.doctorSpecialty}>{doctor.specialty}</ThemedText>
                    <Text style={styles.ratingText}>⭐ {doctor.rating} / 5.0</Text>
                </View>

                <View style={styles.bioContainer}>
                    <ThemedText type="defaultSemiBold">About</ThemedText>
                    <Text style={styles.bioText}>{doctor.bio}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleBooking}>
                    <Text style={styles.buttonText}>Book Consultation</Text>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    doctorImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    doctorName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    doctorSpecialty: {
        fontSize: 18,
        color: '#666',
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 16,
        color: '#888',
    },
    bioContainer: {
        flex: 1,
    },
    bioText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginTop: 8,
    },
    button: {
        backgroundColor: '#007AFF',
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
