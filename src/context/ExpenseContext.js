import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = '@gastofacil_expenses';
  const DEFAULT_BUDGET = 2000;

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setExpenses(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar gastos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveExpenses = async (newExpenses) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
      setExpenses(newExpenses);
    } catch (error) {
      console.error('Erro ao salvar gastos:', error);
      throw error;
    }
  };

  const addExpense = async (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    const updated = [...expenses, newExpense];
    await saveExpenses(updated);
    return newExpense;
  };

  const deleteExpense = async (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    await saveExpenses(filtered);
  };

  const updateExpense = async (id, updatedData) => {
    const updated = expenses.map((exp) =>
      exp.id === id ? { ...exp, ...updatedData } : exp
    );
    await saveExpenses(updated);
  };

  const getSummary = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const percentageUsed = (totalExpenses / DEFAULT_BUDGET) * 100;
    const byCategory = {};
    expenses.forEach((exp) => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });
    return {
      totalExpenses,
      totalBudget: DEFAULT_BUDGET,
      percentageUsed,
      byCategory,
    };
  };

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getSummary,
    isLoading,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpenseProvider');
  }
  return context;
}