import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Todo {
  id: string;
  text: string;
  data: Date;
  isCompleted: boolean;
}

// Componente HomeScreen (suas tarefas)
function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Exemplo de tarefa', data: new Date(), isCompleted: false },
    { id: '2', text: 'Tarefa concluída', data: new Date(), isCompleted: true },
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
      <View style={styles.header}>
        <Ionicons name="checkmark-done-circle" size={40} color="#3b82f6" />
        <Text style={styles.headerTitle}>Suas Tarefas</Text>
      </View>

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
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={60} color="#d1d5db" />
            <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
            <Text style={styles.emptySubtext}>
              {filter === 'pending' 
                ? 'Todas as tarefas estão concluídas!' 
                : filter === 'completed' 
                ? 'Nenhuma tarefa concluída ainda'
                : 'Adicione sua primeira tarefa'
              }
            </Text>
          </View>
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
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

// Componente About (sobre o app)
function About() {
  return (
    <ScrollView contentContainerStyle={aboutStyles.container}>
      <View style={aboutStyles.header}>
        <Ionicons name="checkmark-done-circle" size={80} color="#007AFF" />
        <Text style={aboutStyles.title}>Suas Tarefas</Text>
      </View>

      <Text style={aboutStyles.description}>
        Um aplicativo com uma proposta clássica e eficaz: Nele você poderá 
        deixar suas atividades diárias organizadas, uma versão nova para sua agenda!
      </Text>

      <View style={aboutStyles.divider} />

      <View style={aboutStyles.info}>
        <Text style={aboutStyles.infoText}>📱 Versão 1.0.0</Text>
        <Text style={aboutStyles.infoText}>⚛️ React Native</Text>
        <Text style={aboutStyles.infoText}>🚀 Expo Router</Text>
      </View>

      <View style={aboutStyles.features}>
        <Text style={aboutStyles.featuresTitle}>Funcionalidades:</Text>
        <View style={aboutStyles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={aboutStyles.featureText}>Adicionar novas tarefas</Text>
        </View>
        <View style={aboutStyles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={aboutStyles.featureText}>Marcar como concluídas</Text>
        </View>
        <View style={aboutStyles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={aboutStyles.featureText}>Filtrar por status</Text>
        </View>
        <View style={aboutStyles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={aboutStyles.featureText}>Excluir tarefas</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Estilos do HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
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
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 8,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
});

// Estilos do About
const aboutStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  info: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
  },
  features: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
  },
});

export { HomeScreen, About };