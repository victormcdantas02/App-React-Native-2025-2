import { useTodoStore } from '@/store/todoStore';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';


export default function CalendarioScreen() {
  const { todos, fetchTodos, loading } = useTodoStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    fetchTodos();
  }, []);

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const previousMonth = () =>
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  
  const nextMonth = () =>
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  
  const goToToday = () => {
    const today = new Date();
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const sameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const hasTasksOnDate = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return todos.some((todo) => sameDay(todo.data, dayDate));
  };

  const getTaskCountForDate = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return todos.filter((todo) => sameDay(todo.data, dayDate)).length;
  };

  const areAllTasksCompleted = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    const dayTodos = todos.filter((todo) => sameDay(todo.data, dayDate));
    return dayTodos.length > 0 && dayTodos.every((todo) => todo.isCompleted);
  };

  const getTodosForSelectedDate = () => {
    return todos.filter((todo) => sameDay(todo.data, selectedDate));
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Espaços vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(currentYear, currentMonth, day);
      const isSelected = sameDay(selectedDate, dayDate);
      const hasTasks = hasTasksOnDate(day);
      const allCompleted = areAllTasksCompleted(day);
      const isToday = sameDay(new Date(), dayDate);
      const taskCount = getTaskCountForDate(day);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.day,
            isSelected && styles.selectedDay,
            isToday && styles.today,
            hasTasks && !allCompleted && styles.dayWithTasks,
            allCompleted && styles.dayCompleted,
          ]}
          onPress={() => setSelectedDate(dayDate)}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isToday && !isSelected && styles.todayText,
            ]}
          >
            {day}
          </Text>
          {taskCount > 0 && (
            <View style={[
              styles.taskBadge,
              allCompleted && styles.taskBadgeCompleted
            ]}>
              <Text style={styles.taskBadgeText}>{taskCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const selectedTodos = getTodosForSelectedDate();
  const monthStats = todos.filter((todo) => {
    return todo.data.getMonth() === currentMonth && 
           todo.data.getFullYear() === currentYear;
  });

  if (loading && todos.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com navegação */}
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.monthInfo}>
          <Text style={styles.monthTitle}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          {monthStats.length > 0 && (
            <Text style={styles.monthSubtitle}>
              {monthStats.length} {monthStats.length === 1 ? 'tarefa' : 'tarefas'}
            </Text>
          )}
        </View>
        
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={goToToday} style={styles.todayButton}>
        <Ionicons name="today-outline" size={16} color="#2196F3" />
        <Text style={styles.todayButtonText}>Hoje</Text>
      </TouchableOpacity>

      <ScrollView>
        {/* Legenda */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.legendText}>Selecionado</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFF3E0' }]} />
            <Text style={styles.legendText}>Com tarefas</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E8F5E9' }]} />
            <Text style={styles.legendText}>Concluídas</Text>
          </View>
        </View>

        {/* Dias da semana */}
        <View style={styles.weekdays}>
          {weekDays.map((day) => (
            <Text key={day} style={styles.weekday}>
              {day}
            </Text>
          ))}
        </View>

        {/* Grid de dias */}
        <View style={styles.calendar}>{renderDays()}</View>

        {/* Tarefas do dia selecionado */}
        <View style={styles.selectedDaySection}>
          <View style={styles.selectedDayHeader}>
            <Ionicons name="calendar-outline" size={20} color="#2196F3" />
            <Text style={styles.selectedDayTitle}>
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </Text>
          </View>
          
          {selectedTodos.length === 0 ? (
            <View style={styles.noTasks}>
              <Ionicons name="checkmark-circle-outline" size={40} color="#ccc" />
              <Text style={styles.noTasksText}>Nenhuma tarefa neste dia</Text>
            </View>
          ) : (
            selectedTodos.map((todo) => (
              <View key={todo.id} style={styles.todoItem}>
                <View style={styles.todoHeader}>
                  <Ionicons 
                    name={todo.isCompleted ? "checkmark-circle" : "ellipse-outline"} 
                    size={20} 
                    color={todo.isCompleted ? "#4CAF50" : "#999"} 
                  />
                  <Text
                    style={[
                      styles.todoText,
                      todo.isCompleted && styles.completedTodo,
                    ]}
                  >
                    {todo.text}
                  </Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{todo.category}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2196F3',
  },
  navButton: {
    padding: 10,
  },
  monthInfo: {
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  monthSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#E3F2FD',
    gap: 5,
  },
  todayButtonText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 11,
    color: '#666',
  },
  weekdays: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
    color: '#666',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  emptyDay: {
    width: '14.28%',
    aspectRatio: 1,
  },
  day: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  selectedDay: {
    backgroundColor: '#2196F3',
  },
  dayWithTasks: {
    backgroundColor: '#FFF3E0',
  },
  dayCompleted: {
    backgroundColor: '#E8F5E9',
  },
  today: {
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todayText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  taskBadge: {
    position: 'absolute',
    bottom: 2,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  taskBadgeCompleted: {
    backgroundColor: '#4CAF50',
  },
  taskBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedDaySection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
  },
  selectedDayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  selectedDayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  noTasks: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  noTasksText: {
    color: '#999',
    fontSize: 14,
    marginTop: 10,
  },
  todoItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  todoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  todoText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    color: '#2196F3',
    fontWeight: '600',
  },
});