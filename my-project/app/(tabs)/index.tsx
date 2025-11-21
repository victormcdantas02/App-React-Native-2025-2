import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Text style={styles.appName}>Minhas Tarefas</Text>
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            Um aplicativo com uma proposta clássica e eficaz: Nele você poderá 
            deixar suas atividades diárias organizadas e com funcionalidades de conta, 
            integração com endereços e feriados!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Funcionalidades</Text>
          <Text style={styles.feature}>✓ Organize atividades diárias com categorias</Text>
          <Text style={styles.feature}>✓ Sistema de conta com autenticação segura</Text>
          <Text style={styles.feature}>✓ Calendário visual interativo</Text>
          <Text style={styles.feature}>✓ Consulta de feriados nacionais brasileiros</Text>
          <Text style={styles.feature}>✓ Busca de endereços por CEP</Text>
        </View>

        <Text style={styles.copyright}>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoEmoji: {
    fontSize: 60,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 15,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  version: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  descriptionBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  description: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  feature: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  techCard: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  techText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  requirement: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  footer: {
    backgroundColor: '#2196F3',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerEmoji: {
    fontSize: 40,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  footerDate: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginVertical: 20,
  },
});