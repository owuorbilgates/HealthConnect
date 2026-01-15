import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const MOCK_DATA = {
    upcoming: [
        { id: '1', name: 'Dr. Jane Smith', date: '2026-01-20 at 10:30 AM', type: 'Video Call' },
    ],
    completed: [
        { id: '2', name: 'Dr. John Doe', date: '2026-01-10 at 9:00 AM', type: 'Video Call' },
        { id: '3', name: 'Dr. Maryanne Okoro', date: '2025-12-15 at 3:00 PM', type: 'Video Call' },
    ],
    cancelled: [
        { id: '4', name: 'Dr. Peter Jones', date: '2026-01-05 at 11:00 AM', type: 'Video Call' },
    ],
};

type Tab = 'upcoming' | 'completed' | 'cancelled';

export default function AppointmentsScreen() {
    const [activeTab, setActiveTab] = useState<Tab>('upcoming');

    const renderAppointment = ({ item }: { item: {id: string, name: string, date: string, type: string} }) => (
        <View style={styles.appointmentCard}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.appointmentDate}>{item.date}</Text>
            <Text style={styles.appointmentType}>{item.type}</Text>
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
                    onPress={() => setActiveTab('upcoming')}>
                    <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
                    onPress={() => setActiveTab('completed')}>
                    <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
                    onPress={() => setActiveTab('cancelled')}>
                    <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Cancelled</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_DATA[activeTab]}
                renderItem={renderAppointment}
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
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 8,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#007AFF',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    activeTabText: {
        color: '#fff',
    },
    list: {
        padding: 16,
    },
    appointmentCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    appointmentDate: {
        fontSize: 16,
        color: '#666',
        marginVertical: 4,
    },
    appointmentType: {
        fontSize: 14,
        color: '#007AFF',
    },
});
