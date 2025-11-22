import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tarefas',
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📝</Text>
          ),
        }}
      />
      
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendário',
          tabBarLabel: 'Calendário',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>📅</Text>
          ),
        }}
      />
      
      <Tabs.Screen
        name="add"
        options={{
          title: 'Nova Tarefa',
          tabBarLabel: 'Adicionar',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>➕</Text>
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Configurações',
          tabBarLabel: 'Config',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>⚙️</Text>
          ),
        }}
      />
    </Tabs>
  );
}