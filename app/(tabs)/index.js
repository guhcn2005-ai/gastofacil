import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, FlatList } from 'react-native';
import { useExpenses } from '../src/context/ExpenseContext';
import { ExpenseCard } from '../src/components/ExpenseCard';
import { SummaryCard } from '../src/components/SummaryCard';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const { expenses, getSummary } = useExpenses();
  const router = useRouter();
  const summary = getSummary();
  const recentExpenses = expenses.slice(-5).reverse();

  const handleAddExpense = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/add-expense');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Card de Saldo */}
        <SummaryCard summary={summary} />
        
        {/* Ultimos Gastos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ultimos Gastos</Text>
          {recentExpenses.length > 0 ? (
            <FlatList 
              data={recentExpenses} 
              keyExtractor={(item) => item.id} 
              renderItem={({ item }) => <ExpenseCard expense={item} />}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyText}>Nenhum gasto registrado</Text>
          )}
        </View>
      </ScrollView>
      
      {/* Botao Flutuante */}
      <Pressable style={styles.fab} onPress={handleAddExpense}>
        <Plus size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#11181C',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});