import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="checkmark-done-circle" size={80} color="#007AFF" />
        <Text style={styles.title}>Suas Tarefas</Text>
      </View>

      <Text style={styles.description}>
        Um aplicativo com uma proposta clássica e eficaz: Nele você poderá 
        deixar suas atividades diárias organizadas, uma versão nova para sua agenda!
      </Text>

      <View style={styles.divider} />

      <View style={styles.info}>
        <Text style={styles.infoText}>📱 Versão 1.0.0</Text>
        <Text style={styles.infoText}>⚛️ React Native</Text>
        <Text style={styles.infoText}>🚀 Expo Router</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  infoText: {
    fontSize: 15,
    color: '#666',
  },
  footer: {
    fontSize: 14,
    color: '#999',
    marginTop: 40,
  },
});