import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function PrescriptionScreen() {
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');

  const handleSend = () => {
    if (!drugName || !dosage || !frequency) {
        Alert.alert('Missing Information', 'Please fill out all fields before sending.');
        return;
    }
    // In a real app, this would trigger an API call
    Alert.alert('Prescription Sent', `The prescription for ${drugName} has been sent to the patient.`);
    
    // Clear form
    setDrugName('');
    setDosage('');
    setFrequency('');
    setNotes('');
  };

  return (
    <ThemedView style={styles.container}>
        <ScrollView>
            <ThemedText type="subtitle" style={styles.prompt}>Create a new prescription</ThemedText>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Drug Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Amoxicillin"
                    value={drugName}
                    onChangeText={setDrugName}
                    placeholderTextColor="#888"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Dosage</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., 500mg"
                    value={dosage}
                    onChangeText={setDosage}
                    placeholderTextColor="#888"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Frequency</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Twice a day for 7 days"
                    value={frequency}
                    onChangeText={setFrequency}
                    placeholderTextColor="#888"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Additional Notes (Optional)</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="e.g., Take with food"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    placeholderTextColor="#888"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Send to Patient</Text>
            </TouchableOpacity>
        </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  prompt: {
    textAlign: 'center',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  multilineInput: {
      height: 100,
      textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
