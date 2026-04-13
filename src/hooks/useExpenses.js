import { useExpenses } from '../context/ExpenseContext';

// Este é um hook customizado que apenas re-exporta o useExpenses do contexto
// Para facilitar o uso em outros componentes

export function useExpensesHook() {
  const { expenses, addExpense, deleteExpense, updateExpense, getSummary, isLoading } = useExpenses();
  
  return {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getSummary,
    isLoading
  };
}