import { ThemedView } from '@/components/themed-view';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_HISTORY = [
    {
        id: '1',
        doctor: 'Dr. John Doe',
        date: '2026-01-10',
        note: 'Patient presented with mild symptoms of a common cold. Advised rest and hydration.',
        prescription: { drug: 'Ibuprofen', dosage: '200mg', frequency: 'As needed for pain' },
    },
    {
        id: '2',
        doctor: 'Dr. Maryanne Okoro',
        date: '2025-12-15',
        note: 'Annual check-up. All vitals are normal. Discussed diet and exercise.',
        prescription: null,
    },
];

export default function MedicalHistoryScreen() {

    const handleDownload = (item: any) => {
        Alert.alert('Download PDF', `Simulating download for consultation with ${item.doctor} on ${item.date}.`);
    };

    const renderHistoryItem = ({ item }: { item: typeof MOCK_HISTORY[0] }) => (
        <View style={styles.historyCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.doctorName}>{item.doctor}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.sectionTitle}>Consultation Notes</Text>
            <Text style={styles.noteText}>{item.note}</Text>
            
            {item.prescription && (
                <>
                    <Text style={styles.sectionTitle}>Prescription</Text>
                    <Text style={styles.prescriptionText}>
                        {item.prescription.drug} ({item.prescription.dosage}) - {item.prescription.frequency}
                    </Text>
                </>
            )}

            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(item)}>
                <Ionicons name="cloud-download-outline" size={20} color="#007AFF" />
                <Text style={styles.downloadText}>Download PDF</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={MOCK_HISTORY}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 16,
    },
    historyCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        borderBottomWidth: 1,
        paddingBottom: 8,
        borderBottomColor: '#f0f0f0',
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
        marginBottom: 4,
    },
    noteText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    prescriptionText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#333',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        paddingVertical: 10,
        backgroundColor: '#f0f8ff',
        borderRadius: 8,
    },
    downloadText: {
        marginLeft: 8,
        color: '#007AFF',
        fontWeight: '600',
    }
});
