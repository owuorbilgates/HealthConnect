import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';

export default function AccountManagementScreen() {
  const navyBlue = '#0F172A';
  const kenyanGreen = '#166534';
  const softCloudBlue = '#F8FAFC'; // Canvas background

  return (
    <ThemedView style={[styles.container, { backgroundColor: softCloudBlue }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: navyBlue }]}>ACCOUNT MANAGEMENT</ThemedText>
            {/* These items will be moved from profile.tsx */}
            {/* Notification Preferences */}
            <View style={styles.securityItem}>
              <ThemedText>Notification Preferences</ThemedText>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </View>
            {/* Privacy Settings */}
            <View style={styles.securityItem}>
              <ThemedText style={{ borderBottomWidth: 0 }}>Privacy Settings</ThemedText>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </View>
          </View>
        </ScrollView>
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
    paddingBottom: 20,
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
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', // Light gray border
  },
});
