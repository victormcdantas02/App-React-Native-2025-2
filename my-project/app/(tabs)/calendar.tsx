import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CalendarView from '@/components/CalendarView';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos] = useState([]); // Conectar com estado global depois

  return (
    <ScrollView style={styles.container}>
      <CalendarView 
        selectedDate={selectedDate}
        todos={todos}
        onDateSelect={setSelectedDate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});