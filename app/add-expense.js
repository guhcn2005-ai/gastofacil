import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Modal, FlatList } from 'react-native';
import { useExpenses } from '../src/context/ExpenseContext';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { CATEGORIES } from '../src/utils/constants';

export default function AddExpenseScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const { addExpense } = useExpenses();
  const router = useRouter();

  const handleSave = async () => {
    if (!description.trim() || !amount.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    await addExpense({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Almoço no restaurante"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Categoria</Text>
        <Pressable
          style={styles.categoryButton}
          onPress={() => setShowCategoryPicker(true)}
        >
          <Text style={styles.categoryButtonText}>
            {CATEGORIES[category]?.label || 'Selecionar'}
          </Text>
        </Pressable>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Gasto</Text>
        </Pressable>
      </View>

      {/* Modal de Seleção de Categoria */}
      <Modal
        visible={showCategoryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma Categoria</Text>
            <FlatList
              data={Object.entries(CATEGORIES)}
              keyExtractor={([key]) => key}
              renderItem={({ item: [key, value] }) => (
                <Pressable
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(key);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryItemText}>
                    {value.emoji} {value.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#11181C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#11181C',
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#11181C',
  },
});