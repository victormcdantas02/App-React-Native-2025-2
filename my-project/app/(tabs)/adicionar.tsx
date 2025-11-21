import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import TodoForm from '../../../components/TodoForm';
import { useTodoStore } from '../../../store/todoStore';

export default function AdicionarScreen() {
  const router = useRouter();
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTodo = async (text: string, category: string, date: Date) => {
    await addTodo(text, category, date);
    Alert.alert(
      'Sucesso! ✅',
      'Tarefa criada com sucesso',
      [
        {
          text: 'Ver Tarefas',
          onPress: () => router.push('/(tabs)/'),
        },
        {
          text: 'Criar Outra',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TodoForm onAddTodo={handleAddTodo} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
});