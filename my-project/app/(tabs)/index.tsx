import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';

interface Todo {
  id: string;
  text: string;
  data: Date;
  isCompleted: boolean;
}

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Exemplo de tarefa', data: new Date(), isCompleted: false },
  ]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Pressable 
          style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            Todas ({todos.length})
          </Text>
        </Pressable>
        
        <Pressable 
          style={[styles.filterBtn, filter === 'pending' && styles.filterBtnActive]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
            Pendentes ({todos.filter(t => !t.isCompleted).length})
          </Text>
        </Pressable>
        
        <Pressable 
          style={[styles.filterBtn, filter === 'completed' && styles.filterBtnActive]}
          onPress={() => setFilter('completed')}
        >
          <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
            Concluídas ({todos.filter(t => t.isCompleted).length})
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Pressable 
              style={styles.todoContent}
              onPress={() => toggleTodo(item.id)}
            >
              <View style={[styles.checkbox, item.isCompleted && styles.checkboxChecked]}>
                {item.isCompleted && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.todoTextContainer}>
                <Text style={[styles.todoText, item.isCompleted && styles.todoTextCompleted]}>
                  {item.text}
                </Text>
                <Text style={styles.todoDate}>
                  {item.data.toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </Pressable>
            <Pressable 
              style={styles.deleteBtn}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  filterBtnActive: {
    backgroundColor: '#3b82f6',
  },
  filterText: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
    gap: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 32,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '500',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  todoDate: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
  },
});