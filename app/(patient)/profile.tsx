import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navyBlue = '#0F172A';
  const kenyanGreen = '#166534';
  const softCloudBlue = '#F8FAFC'; // Canvas background

  // Form states
  const [fullName, setFullName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('+254712345678');
  const [email, setEmail] = useState('john.doe@example.com');
  const [dob, setDob] = useState('1990-01-01');
  const [location, setLocation] = useState('Nairobi');

  // Security toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  // Determine if any field has been edited
  const isEdited =
    fullName !== 'John Doe' ||
    phoneNumber !== '+254712345678' ||
    email !== 'john.doe@example.com' ||
    dob !== '1990-01-01' ||
    location !== 'Nairobi';

  const renderInputField = (label: string, value: string, setter: (text: string) => void, keyboardType: any = 'default') => (
    <View style={styles.inputContainer}>
      <ThemedText style={styles.inputLabel}>{label}</ThemedText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setter}
        keyboardType={keyboardType}
        placeholderTextColor="#9CA3AF" // Gray placeholder
      />
    </View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: softCloudBlue }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust as needed
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Header & Avatar Section */}
            <View style={[styles.headerCard, { backgroundColor: '#FFFFFF' }]}>
              <View style={styles.avatarWrapper}>
                <View style={styles.largeAvatar}>
                  <ThemedText style={styles.largeAvatarText}>JD</ThemedText>
                </View>
                <TouchableOpacity style={styles.cameraIcon}>
                  <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <ThemedText style={[styles.nameText, { color: navyBlue }]}>John Doe</ThemedText>
              <ThemedText style={styles.idText}>Patient ID: HC-88392</ThemedText>
            </View>

            {/* Personal Information Form */}
            <View style={styles.section}>
              <ThemedText style={[styles.sectionTitle, { color: navyBlue }]}>PERSONAL DETAILS</ThemedText>
              {renderInputField('Full Name', fullName, setFullName)}
              {renderInputField('Phone Number', phoneNumber, setPhoneNumber, 'phone-pad')}
              {renderInputField('Email Address', email, setEmail, 'email-address')}
              {renderInputField('Date of Birth', dob, setDob, 'numbers-and-punctuation')}
              {renderInputField('Location/County', location, setLocation)}
            </View>

            {/* Security & Account */}
            <View style={styles.section}>
              <ThemedText style={[styles.sectionTitle, { color: navyBlue }]}>SECURITY</ThemedText>
              <TouchableOpacity style={styles.securityItem}>
                <ThemedText>Change Password</ThemedText>
                <Ionicons name="chevron-forward-outline" size={20} color="gray" />
              </TouchableOpacity>
              <View style={styles.securityItem}>
                <ThemedText>Two-Factor Authentication</ThemedText>
                <Switch
                  trackColor={{ false: '#767577', true: kenyanGreen }}
                  thumbColor={twoFactorEnabled ? '#FFFFFF' : '#F4F3F4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  value={twoFactorEnabled}
                />
              </View>
              <View style={styles.securityItem}>
                <ThemedText>Biometric Login (FaceID/TouchID)</ThemedText>
                <Switch
                  trackColor={{ false: '#767577', true: kenyanGreen }}
                  thumbColor={biometricEnabled ? '#FFFFFF' : '#F4F3F4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setBiometricEnabled(!biometricEnabled)}
                  value={biometricEnabled}
                />
              </View>
            </View>
          </ScrollView>

          {/* The "Save" Action */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              { backgroundColor: isEdited ? kenyanGreen : '#D1D5DB' }, // Gray when disabled
            ]}
            disabled={!isEdited}
            onPress={() => alert('Changes Saved!')} // Placeholder for save action
          >
            <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for sticky button
  },
  headerCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D1D5DB', // Light gray for placeholder
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeAvatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#166534', // Kenyan Green
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  idText: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 1, // Small caps effect
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB', // Light gray border
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#0F172A', // Navy Blue for text input
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', // Light gray border
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20, // Offset from bottom edge
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
