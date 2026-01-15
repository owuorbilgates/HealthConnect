import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

// Mock available time slots - in a real app, this would come from the doctor's availability
const MOCK_TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
];

export default function TimeSlotScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedDate } = params;
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const formattedDate = new Date(selectedDate as string).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    router.push({
      pathname: '/(booking)/confirm',
      params: { ...params, selectedTime: time },
    });
  };

  const renderTimeSlot = ({ item }: { item: string }) => {
    const isSelected = selectedTime === item;
    return (
      <TouchableOpacity
        style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
        onPress={() => handleTimeSelect(item)}
      >
        <Text style={isSelected ? styles.selectedTimeSlotText : styles.timeSlotText}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Available slots for:</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.dateText}>{formattedDate}</ThemedText>
      </View>
      <FlatList
        data={MOCK_TIME_SLOTS}
        renderItem={renderTimeSlot}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  dateText: {
    fontSize: 18,
  },
  grid: {
    alignItems: 'center',
  },
  timeSlot: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    margin: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  timeSlotText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
