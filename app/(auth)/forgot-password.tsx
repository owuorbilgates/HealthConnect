import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    // Mock password reset logic
    console.log('Password reset requested for email:', email);
    Alert.alert('Success', 'A password reset link has been sent to your email.');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Forgot Password
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your email address below to receive a password reset link.
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
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Back to Login</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.light.primaryText,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
    color: Colors.light.secondaryText,
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
  linkText: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 16,
  },
});
