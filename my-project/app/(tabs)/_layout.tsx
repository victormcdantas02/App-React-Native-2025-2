import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#2196F3',
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
          headerTitle: '📋 Minhas Tarefas',
        }}
      />
      
      <Tabs.Screen
        name="adicionar"
        options={{
          title: 'Adicionar',
          headerTitle: '➕ Nova Tarefa',
        }}
      />
      
      <Tabs.Screen
        name="calendario"
        options={{
          title: 'Calendário',
          headerTitle: '📅 Calendário',
        }}
      />
      
      <Tabs.Screen
        name="feriados"
        options={{
          title: 'Feriados',
          headerTitle: '🎉 Feriados',
        }}
      />
      
      <Tabs.Screen
        name="endereco"
        options={{
          title: 'Endereço',
          headerTitle: '📍 Buscar CEP',
        }}
      />
      
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          headerTitle: 'ℹ️ Sobre',
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}