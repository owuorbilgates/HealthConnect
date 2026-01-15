import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Modal, PanResponder, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

// Re-using the chat component logic from the previous version inside a modal
const ChatOverlay = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    // Basic chat functionality for the overlay
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello, I\'m ready for our consultation.', sender: 'patient' },
        { id: '2', text: 'Hi, how are you feeling today?', sender: 'doctor' },
    ]);
    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <SafeAreaView style={{flex: 1, padding: 16}}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{color: '#007AFF', marginBottom: 16}}>Close Chat</Text>
                </TouchableOpacity>
                {/* A simplified list view for chat */}
                <View style={{flex: 1, backgroundColor: '#f0f0f0', borderRadius: 8}}>
                    {messages.map(m => <Text key={m.id} style={{padding: 8, alignSelf: m.sender === 'doctor' ? 'flex-end' : 'flex-start'}}>{m.text}</Text>)}
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default function VideoConsultationScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);

    // For Draggable self-view
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            // You can add snap-to-corner logic here if needed
        },
    });

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'Video Call', headerShown: false }} />

            {/* Remote Video Area */}
            <View style={styles.remoteVideo}>
                <Text style={styles.placeholderText}>Remote Video Stream</Text>
            </View>

            {/* Draggable Self View */}
            <Animated.View style={[styles.selfView, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]} {...panResponder.panHandlers}>
                <Text style={styles.placeholderText}>Self View</Text>
            </Animated.View>

            <SafeAreaView style={styles.overlay}>
                {/* In-call Action Buttons */}
                <View style={styles.topActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => setIsChatVisible(true)}>
                        <Ionicons name="chatbubbles-outline" size={28} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="document-text-outline" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Controls Toolbar */}
                <View style={styles.toolbar}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => setIsMuted(!isMuted)}>
                        <Ionicons name={isMuted ? "mic-off" : "mic"} size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={() => setIsCameraOff(!isCameraOff)}>
                        <Ionicons name={isCameraOff ? "videocam-off" : "videocam"} size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="camera-reverse" size={32} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.controlButton, styles.endCallButton]} onPress={() => router.back()}>
                        <Ionicons name="call" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ChatOverlay visible={isChatVisible} onClose={() => setIsChatVisible(false)} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    remoteVideo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    selfView: {
        position: 'absolute',
        top: 80,
        right: 20,
        width: 100,
        height: 150,
        backgroundColor: '#555',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#fff',
        fontSize: 12,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    topActions: {
        padding: 16,
        alignSelf: 'flex-start',
    },
    actionButton: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 30,
        padding: 12,
        marginBottom: 8,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    controlButton: {
        padding: 12,
    },
    endCallButton: {
        backgroundColor: '#FF3B30',
        borderRadius: 30,
    },
});