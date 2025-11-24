import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '@/store/useAuthStore';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const userNameToDisplay = user?.name ? user.name.split(' ')[0] : (user?.username || 'Usuário');



  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getFormattedDate = () => {
    return currentTime.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {userNameToDisplay}! 👋</Text>
            <Text style={styles.date}>{getFormattedDate()}</Text>
          </View>
        </View> 

        
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          
          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              icon="checkmark-circle"
              iconColor="#3b82f6"
              title="Tarefas"
              subtitle="Gerenciar tarefas"
              onPress={() => router.push('/(tabs)/tasks')}
            />
            <QuickActionCard
              icon="calendar"
              iconColor="#8b5cf6"
              title="Calendário"
              subtitle="Ver agenda"
              onPress={() => router.push('/(tabs)/calendar')}
            />
          </View>

          <View style={styles.quickActionsGrid}>
            <QuickActionCard
              icon="person"
              iconColor="#10b981"
              title="Perfil"
              subtitle="Configurações"
              onPress={() => router.push('/(tabs)/profile')}
            />
            <QuickActionCard
              icon="information-circle"
              iconColor="#f59e0b"
              title="Sobre"
              subtitle="Informações do app"
              onPress={() => router.push('/about')}
            />
          </View>
        </View>

        
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Resumo</Text>
          
          <View style={styles.statsGrid}>
            <StatCard
              icon="checkmark-done"
              iconColor="#10b981"
              value="0"
              label="Concluídas"
              backgroundColor="#ecfdf5"
            />
            <StatCard
              icon="time"
              iconColor="#f59e0b"
              value="0"
              label="Pendentes"
              backgroundColor="#fffbeb"
            />
            <StatCard
              icon="calendar"
              iconColor="#8b5cf6"
              value="0"
              label="Hoje"
              backgroundColor="#f5f3ff"
            />
          </View>
        </View>

       
        <View style={styles.tipContainer}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={24} color="#f59e0b" />
            <Text style={styles.tipTitle}>Dica do dia</Text>
          </View>
          <Text style={styles.tipText}>
            Organize suas tarefas por prioridade e comece pelo mais importante!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


interface QuickActionCardProps {
  icon: any;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

function QuickActionCard({ icon, iconColor, title, subtitle, onPress }: QuickActionCardProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.quickActionCard,
        pressed && styles.quickActionCardPressed
      ]}
      onPress={onPress}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={28} color={iconColor} />
      </View>
      <View style={styles.quickActionText}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </Pressable>
  );
}


interface StatCardProps {
  icon: any;
  iconColor: string;
  value: string;
  label: string;
  backgroundColor: string;
}

function StatCard({ icon, iconColor, value, label, backgroundColor }: StatCardProps) {
  return (
    <View style={[styles.statCard, { backgroundColor }]}>
      <Ionicons name={icon} size={24} color={iconColor} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActionsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  quickActionsGrid: {
    gap: 12,
    marginBottom: 12,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  statsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  tipContainer: {
    margin: 20,
    marginTop: 10,
    padding: 16,
    backgroundColor: '#fffbeb',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
  },
  tipText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
});