import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Image,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const getStyles = (palette: (typeof Colors)['light' | 'dark']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.backgroundTop,
    },
    safeArea: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    header: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      backgroundColor: 'transparent',
    },
    content: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: palette.primaryText,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: palette.secondaryText,
      textAlign: 'center',
      marginTop: 8,
    },
    healthText: {
      color: palette.accent,
      fontWeight: '600',
    },
    buttonContainer: {
      flex: 0.3,
      justifyContent: 'flex-end',
      width: '100%',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      borderRadius: 28,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonIcon: {
      marginRight: 12,
    },
    patientButton: {
      backgroundColor: palette.patientButton,
    },
    doctorButton: {
      backgroundColor: palette.doctorButton,
    },
    buttonText: {
      color: palette.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      color: palette.secondaryText,
      fontSize: 12,
      paddingBottom: 16,
    },
  });

export default function WelcomeScreen() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const styles = getStyles(palette);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* <View style={styles.header}>
          <Text style={styles.title}>HealthConnect Kenya</Text>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </View> */}

        <View style={styles.header}>
          
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>HealthConnect Kenya</Text>
          <Text style={styles.subtitle}>
            Your{' '}
            <Animated.Text style={{ ...styles.healthText, transform: [{ scale: pulseAnim }] }}>
              Health
            </Animated.Text>
            , Your Time, Your Doctor.
          </Text>
          
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.patientButton]}
            onPress={() => router.push('/(auth)/login?role=patient')}
          >
            <Feather name="user" size={24} color={palette.white} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>I'm a Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.doctorButton]}
            onPress={() => router.push('/(auth)/login?role=doctor')}
          >
            <Feather name="briefcase" size={24} color={palette.white} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>I'm a Doctor</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Proudly Kenyan 🇰🇪</Text>
      </SafeAreaView>
    </View>
  );
}