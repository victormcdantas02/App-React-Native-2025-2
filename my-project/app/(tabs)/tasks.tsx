import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddTask = () => {
    if (!taskText.trim()) {
      Alert.alert('Erro', 'Digite uma tarefa');
      return;
    }

    Alert.alert('Sucesso', 'Tarefa adicionada!');
    setTaskText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Descrição da Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa..."
          value={taskText}
          onChangeText={setTaskText}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Data</Text>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString('pt-BR')}
        </Text>

        <Pressable style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Adicionar Tarefa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateText: {
    fontSize: 16,
    color: '#1f2937',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});