import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            HealthConnect Kenya
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Your Health, Your Time, Your Doctor.
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.patientButton]}
            onPress={() => router.push('/(auth)/login?role=patient')}
          >
            <Text style={styles.buttonText}>I'm a Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.doctorButton]}
            onPress={() => router.push('/(auth)/login?role=doctor')}
          >
            <Text style={styles.buttonText}>I'm a Doctor</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  buttonContainer: {
    paddingBottom: 32,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  patientButton: {
    backgroundColor: '#007AFF', // A professional blue
  },
  doctorButton: {
    backgroundColor: '#34C759', // A professional green
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
