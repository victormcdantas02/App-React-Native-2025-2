import { useEffect, useState } from 'react';
import { useFeriadosStore } from '@/store/feriadosStore';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';

export default function FeriadosScreen() {
  const { feriados, loading, error, currentYear, fetchFeriados } = useFeriadosStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFeriados(currentYear);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFeriados(currentYear);
    setRefreshing(false);
  };

  const changeYear = async (delta: number) => {
    const newYear = currentYear + delta;
    await fetchFeriados(newYear);
  };

  const goToCurrentYear = async () => {
    const now = new Date().getFullYear();
    if (now !== currentYear) {
      await fetchFeriados(now);
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'national':
        return { label: 'Nacional', icon: 'flag', color: '#4CAF50' };
      case 'optional':
        return { label: 'Facultativo', icon: 'alert-circle', color: '#FF9800' };
      default:
        return { label: type, icon: 'calendar', color: '#999' };
    }
  };

  const isPast = (dateStr: string) => {
    const feriadoDate = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return feriadoDate < today;
  };

  const isToday = (dateStr: string) => {
    const feriadoDate = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    return (
      feriadoDate.getDate() === today.getDate() &&
      feriadoDate.getMonth() === today.getMonth() &&
      feriadoDate.getFullYear() === today.getFullYear()
    );
  };

  const renderFeriado = ({ item }: { item: any }) => {
    const typeInfo = getTypeInfo(item.type);
    const past = isPast(item.date);
    const today = isToday(item.date);

    return (
      <View style={[
        styles.feriadoCard,
        past && styles.pastFeriado,
        today && styles.todayFeriado,
      ]}>
        <View style={styles.feriadoHeader}>
          <View style={[styles.typeIcon, { backgroundColor: typeInfo.color }]}>
            <Ionicons name={typeInfo.icon as any} size={20} color="#fff" />
          </View>
          <View style={styles.feriadoInfo}>
            <Text style={[styles.feriadoName, past && styles.pastText]}>
              {item.name}
            </Text>
            <Text style={[styles.feriadoDate, past && styles.pastText]}>
              {formatDate(item.date)}
            </Text>
          </View>
          {today && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayBadgeText}>HOJE</Text>
            </View>
          )}
        </View>
        <View style={[styles.typeBadge, { backgroundColor: typeInfo.color }]}>
          <Text style={styles.typeText}>{typeInfo.label}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.yearButton}
          onPress={() => changeYear(-1)}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToCurrentYear} style={styles.yearInfo}>
          <Text style={styles.yearText}>{currentYear}</Text>
          <Text style={styles.yearSubtext}>
            {currentYear === new Date().getFullYear() ? 'Ano Atual' : 'Toque para ir ao ano atual'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.yearButton}
          onPress={() => changeYear(1)}
        >
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {!loading && feriados.length > 0 && (
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{feriados.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4CAF50' }]}>
              {feriados.filter((f) => f.type === 'national').length}
            </Text>
            <Text style={styles.statLabel}>Nacionais</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF9800' }]}>
              {feriados.filter((f) => f.type === 'optional').length}
            </Text>
            <Text style={styles.statLabel}>Facultativos</Text>
          </View>
        </View>
      )}

      {/* Conteúdo */}
      {loading && feriados.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Carregando feriados...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={60} color="#f44336" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={feriados}
          keyExtractor={(item) => item.date}
          renderItem={renderFeriado}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="calendar-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>Nenhum feriado encontrado</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2196F3',
  },
  yearButton: {
    padding: 10,
  },
  yearInfo: {
    alignItems: 'center',
  },
  yearText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  yearSubtext: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.8,
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  list: {
    padding: 15,
  },
  feriadoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pastFeriado: {
    opacity: 0.5,
    backgroundColor: '#f9f9f9',
  },
  todayFeriado: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  feriadoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  feriadoInfo: {
    flex: 1,
  },
  feriadoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  feriadoDate: {
    fontSize: 13,
    color: '#666',
    textTransform: 'capitalize',
  },
  pastText: {
    color: '#999',
  },
  todayBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  todayBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  typeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
  },
});