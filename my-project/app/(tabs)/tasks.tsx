import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

const STORAGE_KEY = '@tasks_storage';

export default function Tasks() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Carregar tarefas ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  // Salvar tarefas sempre que mudarem
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        // Converter strings de data de volta para objetos Date
        const tasksWithDates = parsedTasks.map((task: any) => ({
          ...task,
          date: new Date(task.date)
        }));
        setTasks(tasksWithDates);
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getTasksForSelectedDate = () => {
    return tasks.filter(task => isSameDay(task.date, selectedDate));
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      Alert.alert('Atenção', 'Digite um título para a tarefa');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      date: selectedDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setModalVisible(false);
    
    Alert.alert('Sucesso', 'Tarefa adicionada!', [{ text: 'OK' }]);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== taskId)),
        },
      ]
    );
  };

  const todayTasks = getTasksForSelectedDate();
  const completedCount = todayTasks.filter(t => t.completed).length;
  const totalCount = todayTasks.length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header com Seletor de Data */}
        <View style={styles.header}>
          <Text style={styles.dateLabel}>
            {isToday(selectedDate) ? 'Hoje' : formatDate(selectedDate)}
          </Text>

          {/* Badge de progresso */}
          {totalCount > 0 && (
            <View style={styles.progressBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text style={styles.progressText}>
                {completedCount}/{totalCount}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={22} color="#007AFF" />
            <Text style={styles.dateButtonText}>
              {formatShortDate(selectedDate)}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#007AFF" />
          </TouchableOpacity>

          {/* Navegação Rápida de Dias */}
          <View style={styles.quickNav}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => changeDate(-1)}
            >
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.todayButton, isToday(selectedDate) && styles.todayButtonDisabled]}
              onPress={() => setSelectedDate(new Date())}
              disabled={isToday(selectedDate)}
            >
              <Text style={styles.todayText}>
                Hoje
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => changeDate(1)}
            >
              <Ionicons name="chevron-forward" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              locale="pt-BR"
            />
            {Platform.OS === 'ios' && (
              <View style={styles.pickerButtons}>
                <TouchableOpacity
                  style={styles.pickerButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.pickerButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Lista de Tarefas */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {todayTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkbox-outline" size={64} color="#d1d5db" />
              <Text style={styles.emptyText}>Nenhuma tarefa para este dia</Text>
              <Text style={styles.emptySubtext}>
                Adicione uma nova tarefa usando o botão +
              </Text>
            </View>
          ) : (
            todayTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => toggleTaskComplete(task.id)}
                  hitSlop={8}
                >
                  <Ionicons 
                    name={task.completed ? "checkbox" : "square-outline"} 
                    size={24} 
                    color={task.completed ? "#007AFF" : "#666"} 
                  />
                </TouchableOpacity>
                
                <View style={styles.taskContent}>
                  <Text style={[
                    styles.taskTitle,
                    task.completed && styles.taskTitleCompleted
                  ]}>
                    {task.title}
                  </Text>
                  {task.description ? (
                    <Text style={[
                      styles.taskDescription,
                      task.completed && styles.taskDescriptionCompleted
                    ]}>
                      {task.description}
                    </Text>
                  ) : null}
                </View>

                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteTask(task.id)}
                  hitSlop={8}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        {/* Botão Adicionar Tarefa */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Modal de Criar Tarefa */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <TouchableOpacity 
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            />
            
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nova Tarefa</Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  hitSlop={8}
                >
                  <Ionicons name="close" size={28} color="#666" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Título *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o título da tarefa"
                  placeholderTextColor="#999"
                  value={newTaskTitle}
                  onChangeText={setNewTaskTitle}
                  autoFocus
                  maxLength={100}
                />

                <Text style={styles.label}>Descrição (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Adicione detalhes sobre a tarefa"
                  placeholderTextColor="#999"
                  value={newTaskDescription}
                  onChangeText={setNewTaskDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  maxLength={500}
                />

                <View style={styles.dateInfo}>
                  <Ionicons name="calendar" size={20} color="#007AFF" />
                  <Text style={styles.dateInfoText}>
                    {formatDate(selectedDate)}
                  </Text>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => {
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.saveButton,
                    !newTaskTitle.trim() && styles.saveButtonDisabled
                  ]}
                  onPress={handleAddTask}
                  disabled={!newTaskTitle.trim()}
                >
                  <Text style={styles.saveButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dateLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  dateButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  quickNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
  },
  todayButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  todayButtonDisabled: {
    opacity: 0.5,
  },
  todayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#fff',
  },
  pickerButtons: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  pickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  pickerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
    padding: 4,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskDescriptionCompleted: {
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
  },
  dateInfoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});