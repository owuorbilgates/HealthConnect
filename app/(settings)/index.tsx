import { ThemedView } from '@/components/themed-view';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SettingsItemProps = {
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
};

const SettingsItem = ({ title, icon, onPress }: SettingsItemProps) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <Ionicons name={icon} size={24} color="#666" />
        <Text style={styles.itemText}>{title}</Text>
        <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const router = useRouter();
    // In a real app, role would come from auth context
    const { role } = useLocalSearchParams<{ role?: string }>(); 
    const isPatient = role !== 'doctor'; // Default to patient view

    return (
        <ThemedView style={styles.container}>
            <SettingsItem 
                title="My Appointments" 
                icon="calendar-outline"
                onPress={() => router.push({ pathname: '/(settings)/appointments', params: { role }})}
            />
            {isPatient && (
                <SettingsItem 
                    title="Medical History" 
                    icon="document-text-outline"
                    onPress={() => router.push({ pathname: '/(settings)/history', params: { role }})}
                />
            )}
            <SettingsItem 
                title="Edit Profile" 
                icon="person-outline"
                onPress={() => router.push({ pathname: '/(settings)/profile', params: { role }})}
            />
            <View style={styles.separator} />
            <SettingsItem 
                title="Logout" 
                icon="log-out-outline"
                onPress={() => router.replace('/')} // Navigate to welcome screen
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemText: {
        flex: 1,
        fontSize: 18,
        marginLeft: 16,
    },
    separator: {
        height: 32,
    }
});
