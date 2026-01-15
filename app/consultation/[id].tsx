import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';

// Mock data - in a real app, this would be fetched based on the consultation ID
const MOCK_APPOINTMENTS = {
  '1': { patientName: 'Alice Johnson' },
  '2': { patientName: 'Bob Williams' },
  '3': { patientName: 'Charlie Brown' },
};

const MOCK_MESSAGES = [
  { id: '1', text: 'Hello, I\'m ready for our consultation.', sender: 'patient' },
  { id: '2', text: 'Hi Alice, I\'m Dr. Okoro. How are you feeling today?', sender: 'doctor' },
];

type Message = { id: string; text: string; sender: 'patient' | 'doctor' };

export default function ConsultationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointment = MOCK_APPOINTMENTS[id as keyof typeof MOCK_APPOINTMENTS] || { patientName: 'Unknown Patient' };

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      text: inputText,
      sender: 'doctor', // Assuming the doctor is the one sending messages from this screen
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isDoctor = item.sender === 'doctor';
    return (
      <View style={[styles.messageBubble, isDoctor ? styles.doctorBubble : styles.patientBubble]}>
        <Text style={isDoctor ? styles.doctorText : styles.patientText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Chat with ${appointment.patientName}` }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={80}
      >
        <SafeAreaView style={styles.safeArea}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messageList}
            inverted
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
    maxWidth: '75%',
  },
  doctorBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  patientBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  doctorText: {
    color: '#fff',
    fontSize: 16,
  },
  patientText: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  sendButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
