import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES } from '../utils/constants';
import * as Haptics from 'expo-haptics';

export function ExpenseCard({ expense }) {
  const { deleteExpense } = useExpenses();
  const category = CATEGORIES[expense.category] || {};
  const date = new Date(expense.date);
  const formattedDate = date.toLocaleDateString('pt-BR');

  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    deleteExpense(expense.id);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.categoryCircle, { backgroundColor: category.color }]}>
        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.category}>{category.label}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>- R$ {expense.amount.toFixed(2)}</Text>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Trash2 size={18} color="#ff4444" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontWeight: '600',
    color: '#11181C',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#687076',
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff4444',
  },
  deleteButton: {
    marginTop: 4,
    padding: 4,
  },
});