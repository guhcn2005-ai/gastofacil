import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useExpenses } from '../src/context/ExpenseContext';

export default function SettingsScreen() {
  const { expenses } = useExpenses();
  const [budget, setBudget] = useState('2000');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveBudget = async () => {
    await AsyncStorage.setItem('@gastofacil_budget', budget);
    alert('Orcamento salvo com sucesso!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orcamento Mensal</Text>
        <TextInput
          style={styles.input}
          placeholder="R$ 2000,00"
          value={budget}
          onChangeText={setBudget}
          keyboardType="decimal-pad"
        />
        <Pressable style={styles.button} onPress={handleSaveBudget}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notificacoes</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81c784' }}
            thumbColor={notificationsEnabled ? '#0a7ea4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <Text style={styles.infoText}>Total de Gastos: {expenses.length}</Text>
        <Text style={styles.infoText}>Versão: 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#11181C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#11181C',
  },
  infoText: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 8,
  },
});