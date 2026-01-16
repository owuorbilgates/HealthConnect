import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useState } from 'react'; // Import useState

export default function PatientDashboard() {
  const [hasAppointment, setHasAppointment] = useState(false); // For conditional rendering
  const router = useRouter();

  // Brand Colors
  const navyBlue = '#0F172A';
  const kenyanGreen = '#166534';
  const softCloudBlue = '#F8FAFC';
  const lighterBlue = '#1E293B'; // For gradient

  return (
    <ThemedView style={[styles.container, { backgroundColor: softCloudBlue }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Section 1: Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/profile')} style={styles.userInfo}>
              {/* Avatar Placeholder */}
              <View style={styles.avatar}>
                <ThemedText style={styles.avatarText}>JD</ThemedText>
              </View>
              <View>
                <ThemedText style={{ color: 'gray', fontSize: 14 }}>Welcome back,</ThemedText>
                <ThemedText style={{ color: navyBlue, fontSize: 20, fontWeight: 'bold' }}>John Doe</ThemedText>
              </View>
            </TouchableOpacity>
            {/* Notification Bell */}
            <View style={styles.notificationBellContainer}>
              <Ionicons name="notifications-outline" size={24} color={navyBlue} />
              <View style={styles.activeDot} />
            </View>
          </View>

          {/* Section A: The "Action Status" Card (The Hero) */}
          {hasAppointment ? (
            <View style={[styles.card, styles.heroCardAppointment]}>
              <View style={styles.leftBorderStrip} />
              <View style={{ paddingLeft: 20 }}>
                <ThemedText style={{ fontSize: 16, marginBottom: 5 }}>10:30 AM - Dr. Emily White</ThemedText>
                <View style={[styles.findDoctorButton, { backgroundColor: kenyanGreen }]}>
                  <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>Join Video Room</ThemedText>
                </View>
              </View>
            </View>
          ) : (
            <LinearGradient
              colors={[navyBlue, lighterBlue]}
              style={[styles.card, styles.heroCardNoAppointment]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>No upcoming consultations.</ThemedText>
              <View style={styles.findDoctorButton}>
                <ThemedText style={{ color: navyBlue, fontWeight: 'bold' }}>Find a Doctor</ThemedText>
              </View>
            </LinearGradient>
          )}

          {/* Section B: Client Portal Grid (The Core Navigation) */}
          <View style={styles.gridContainer}>
            {/* Card 1: Find a Specialist */}
            <View style={[styles.gridItem, styles.primaryGridItem]}>
              <Ionicons name="search-outline" size={30} color={navyBlue} />
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', color: navyBlue, marginTop: 10 }}>Find a Specialist</ThemedText>
              <ThemedText style={{ fontSize: 12, color: 'gray', textAlign: 'center' }}>Book a video consultation.</ThemedText>
            </View>
            {/* Card 2: My Profile */}
            <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/profile')}>
              <Ionicons name="person-outline" size={30} color="gray" />
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>My Profile</ThemedText>
              <ThemedText style={{ fontSize: 12, color: 'gray', textAlign: 'center' }}>Update details & password.</ThemedText>
            </TouchableOpacity>
            {/* Card 3: Medical Records */}
            <View style={styles.gridItem}>
              <Ionicons name="document-text-outline" size={30} color={kenyanGreen} />
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Medical Records</ThemedText>
              <ThemedText style={{ fontSize: 12, color: 'gray', textAlign: 'center' }}>View prescriptions & notes.</ThemedText>
            </View>
            {/* Card 4: Wallet & Payments */}
            <View style={styles.gridItem}>
              <Ionicons name="wallet-outline" size={30} color={kenyanGreen} />
              <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Wallet & Payments</ThemedText>
              <ThemedText style={{ fontSize: 12, color: 'gray', textAlign: 'center' }}>Manage top-ups & history.</ThemedText>
            </View>
          </View>

          {/* Section C: Quick Account Settings (Horizontal List) */}
          <View style={styles.accountSettingsContainer}>
            <ThemedText style={styles.sectionTitle}>Account Management</ThemedText>
            <View style={styles.settingItem}>
              <ThemedText>Change Password</ThemedText>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </View>
            <View style={styles.settingItem}>
              <ThemedText>Notification Preferences</ThemedText>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </View>
            <View style={styles.settingItem}>
              <ThemedText style={{ borderBottomWidth: 0 }}>Privacy Settings</ThemedText>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Section D: Bottom Navigation Bar (Mobile View) */}
      <View style={styles.bottomNavBar}>
        <View style={styles.navItem}>
          <Ionicons name="home" size={24} color={navyBlue} />
          <ThemedText style={[styles.navText, { color: navyBlue }]}>Home</ThemedText>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="gray" />
          <ThemedText style={styles.navText}>Appointments</ThemedText>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="gray" />
          <ThemedText style={styles.navText}>Chat</ThemedText>
        </View>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={24} color="gray" />
          <ThemedText style={styles.navText}>Profile</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // To make space for the bottom nav bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D1D5DB', // Light gray for placeholder
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationBellContainer: {
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#166534', // Kenyan Green
    borderWidth: 2,
    borderColor: '#F8FAFC', // Soft Cloud Blue
  },
  card: {
    borderRadius: 16,
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
  heroCardNoAppointment: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 120,
  },
  heroCardAppointment: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  leftBorderStrip: {
    width: 8,
    height: '100%',
    backgroundColor: '#166534', // Kenyan Green
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    marginRight: 10,
  },
  findDoctorButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '48%', // Roughly 2 items per row, with space between
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    aspectRatio: 1, // Make cards square
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  primaryGridItem: {
    backgroundColor: '#F8FAFC', // Soft Cloud Blue for distinct background
    borderWidth: 2,
    borderColor: '#0F172A', // Navy Blue border
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A', // Navy Blue
    marginBottom: 10,
  },
  accountSettingsContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', // Light gray border
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20, // To account for safe area in iOS
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});