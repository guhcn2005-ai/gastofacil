import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useExpenses } from '../src/context/ExpenseContext';
import { ExpenseCard } from '../src/components/ExpenseCard';

export default function HistoryScreen() {
  const { expenses } = useExpenses();
  const sortedExpenses = [...expenses].reverse();

  return (
    <View style={styles.container}>
      {sortedExpenses.length > 0 ? (
        <FlatList
          data={sortedExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExpenseCard expense={item} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum gasto registrado</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});