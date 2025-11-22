import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Notificações</Text>
          <Text style={styles.itemArrow}>›</Text>
        </Pressable>
        
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Tema</Text>
          <Text style={styles.itemArrow}>›</Text>
        </Pressable>
        
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Sobre</Text>
          <Text style={styles.itemArrow}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemText: {
    fontSize: 16,
    color: '#1f2937',
  },
  itemArrow: {
    fontSize: 24,
    color: '#6b7280',
  },
});