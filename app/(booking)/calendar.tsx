import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Simple component to generate a basic calendar for the current month
const MiniCalendar = ({ onDateSelect }: { onDateSelect: (date: Date) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelectDate = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
    onDateSelect(newSelectedDate);
  };

  const renderDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Weekday headers
    for (let i = 0; i < weekdays.length; i++) {
      days.push(
        <View key={`wd-${i}`} style={styles.dayContainer}>
          <Text style={styles.weekdayText}>{weekdays[i]}</Text>
        </View>
      );
    }

    // Blank days for the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`blank-${i}`} style={styles.dayContainer} />);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      days.push(
        <TouchableOpacity key={day} style={styles.dayContainer} onPress={() => handleSelectDate(day)}>
          <View style={[styles.day, isSelected && styles.selectedDay]}>
            <Text style={isSelected ? styles.selectedDayText : styles.dayText}>{day}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return days;
  };

  return (
    <View style={styles.calendarContainer}>
      <ThemedText type="subtitle" style={styles.monthTitle}>{monthName} {year}</ThemedText>
      <View style={styles.daysGrid}>{renderDays()}</View>
    </View>
  );
};


export default function CalendarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { doctorId, doctorName, doctorSpecialty } = params;

  const handleDateSelect = (date: Date) => {
    router.push({
      pathname: '/(booking)/time',
      params: { 
        ...params,
        selectedDate: date.toISOString(),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold">Booking for:</ThemedText>
        <ThemedText type="title" style={styles.doctorName}>{doctorName}</ThemedText>
        <ThemedText type="subtitle" style={{color: '#666'}}>{doctorSpecialty}</ThemedText>
      </View>
      <MiniCalendar onDateSelect={handleDateSelect} />
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
  doctorName: {
    fontSize: 28,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: `${100 / 7}%`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    height: 40,
  },
  day: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  dayText: {
    fontSize: 16,
  },
  weekdayText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  selectedDayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
