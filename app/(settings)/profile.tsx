import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';

// Mock user data
const MOCK_USER = {
    name: 'Meshack Mbuyi',
    email: 'meshackmbuyi@example.com',
    phone: '0712345678',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export default function ProfileEditorScreen() {
    const [name, setName] = useState(MOCK_USER.name);
    const [email, setEmail] = useState(MOCK_USER.email);
    const [phone, setPhone] = useState(MOCK_USER.phone);

    const handleSaveChanges = () => {
        Alert.alert('Profile Saved', 'Your changes have been saved successfully.');
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
                    <TouchableOpacity>
                        <Text style={styles.changeAvatarText}>Change Photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
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
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarText: {
        color: '#007AFF',
        marginTop: 8,
        fontWeight: '600',
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
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
