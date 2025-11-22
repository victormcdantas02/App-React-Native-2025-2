import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header com botão voltar */}
        <View style={styles.headerBar}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Sobre</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
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

          <View style={styles.features}>
            <Text style={styles.featuresTitle}>Funcionalidades:</Text>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.featureText}>Adicionar novas tarefas</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.featureText}>Marcar como concluídas</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.featureText}>Filtrar por status</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.featureText}>Excluir tarefas</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
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
    paddingHorizontal: 10,
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