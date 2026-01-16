import { ThemedText } from '@/components/themed-text';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

const getStyles = (palette: (typeof Colors)['light' | 'dark']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.backgroundTop,
    },
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 48,
      color: palette.primaryText,
    },
    form: {
      width: '100%',
    },
    input: {
      backgroundColor: palette.white,
      borderRadius: 8,
      padding: 16,
      fontSize: 16,
      marginBottom: 16,
      color: palette.text,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: palette.white,
      fontSize: 18,
      fontWeight: '600',
    },
    footer: {
      marginTop: 24,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 16,
      color: palette.secondaryText,
    },
    linkText: {
      color: palette.tint,
      fontWeight: '600',
      fontSize: 16,
    },
  });

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const styles = getStyles(palette);

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    // Mock login logic
    console.log('Logging in as:', role, 'with email:', email);

    // Navigate to the appropriate dashboard
    if (role === 'patient') {
      router.replace('/(patient)/dashboard');
    } else if (role === 'doctor') {
      router.replace('/(doctor)/dashboard');
    }
  };

  const roleTitle = role?.charAt(0).toUpperCase() + role?.slice(1);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>{roleTitle} Login</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  role === 'patient'
                    ? palette.patientButton
                    : role === 'doctor'
                    ? palette.doctorButton
                    : palette.tint,
              },
            ]}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Link href={{ pathname: '/(auth)/signup', params: { role } }} asChild>
            <TouchableOpacity>
              <Text style={styles.footerText}>
                Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(auth)/forgot-password" asChild>
            <TouchableOpacity style={{ marginTop: 12 }}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}