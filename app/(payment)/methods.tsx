import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

 const mpesaLogo = require('@/assets/images/mpesa-logo.svg.webp'); // Placeholder, will need to create this

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleMpesaSelect = () => {
    router.push({
      pathname: '/(payment)/mpesa',
      params,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.prompt}>Select how you'd like to pay</ThemedText>

      <TouchableOpacity style={styles.optionButton} onPress={handleMpesaSelect}>
        {/* The Image component will not work until the image is created */}
        {/* <Image source={mpesaLogo} style={styles.logo} /> */}
        <Text style={styles.optionText}>Pay with M-Pesa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionButton, styles.disabledOption]} disabled>
        <Text style={styles.optionText}>Pay with Card</Text>
        <Text style={styles.disabledText}>(Coming Soon)</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  prompt: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 18,
  },
  optionButton: {
    backgroundColor: '#00A37D', // M-Pesa green
    borderRadius: 8,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 25,
    resizeMode: 'contain',
    marginRight: 16,
  },
  disabledOption: {
    backgroundColor: '#A9A9A9', // Greyed out
  },
  disabledText: {
      color: '#fff',
      fontSize: 12,
      marginLeft: 8,
  }
});
