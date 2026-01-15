import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['Morning (8am-12pm)', 'Afternoon (1pm-5pm)', 'Evening (6pm-9pm)'];

// Mock initial state
const initialAvailability = {
  Monday: { 'Morning (8am-12pm)': true, 'Afternoon (1pm-5pm)': true, 'Evening (6pm-9pm)': false },
  Tuesday: { 'Morning (8am-12pm)': true, 'Afternoon (1pm-5pm)': true, 'Evening (6pm-9pm)': false },
  Wednesday: { 'Morning (8am-12pm)': false, 'Afternoon (1pm-5pm)': true, 'Evening (6pm-9pm)': false },
  Thursday: { 'Morning (8am-12pm)': true, 'Afternoon (1pm-5pm)': true, 'Evening (6pm-9pm)': false },
  Friday: { 'Morning (8am-12pm)': true, 'Afternoon (1pm-5pm)': false, 'Evening (6pm-9pm)': true },
  Saturday: { 'Morning (8am-12pm)': true, 'Afternoon (1pm-5pm)': false, 'Evening (6pm-9pm)': false },
  Sunday: { 'Morning (8am-12pm)': false, 'Afternoon (1pm-5pm)': false, 'Evening (6pm-9pm)': false },
};

export default function AvailabilityScreen() {
  const [availability, setAvailability] = useState(initialAvailability);

  const toggleAvailability = (day: string, slot: string, value: boolean) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [slot]: value,
      },
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {DAYS.map(day => (
          <View key={day} style={styles.dayContainer}>
            <ThemedText type="subtitle">{day}</ThemedText>
            {TIME_SLOTS.map(slot => (
              <View key={slot} style={styles.slotContainer}>
                <Text style={styles.slotText}>{slot}</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={availability[day as keyof typeof availability][slot] ? '#007AFF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => toggleAvailability(day, slot, value)}
                  value={availability[day as keyof typeof availability][slot]}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  slotText: {
    fontSize: 16,
  },
});
