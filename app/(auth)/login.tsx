import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        </View>
        <ThemedText type="title" style={styles.title}>
          {roleTitle} Login
        </ThemedText>

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
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundTop,
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
    color: Colors.light.primaryText,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: Colors.light.white,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  linkText: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 16,
  },
});
