import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function SummaryCard({ summary }) {
  const progressPercentage = Math.min(summary.percentageUsed, 100);
  const remaining = summary.totalBudget - summary.totalExpenses;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Saldo Atual</Text>
        <Text style={styles.amount}>
          R$ {remaining.toFixed(2)}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            {
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage > 80 ? '#ff4444' : '#0a7ea4',
            }
          ]} />
        </View>
        <Text style={styles.progressText}>
          {summary.percentageUsed.toFixed(0)}% do orcamento
        </Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Gastos</Text>
          <Text style={styles.footerValue}>
            R$ {summary.totalExpenses.toFixed(2)}
          </Text>
        </View>
        <View>
          <Text style={styles.footerLabel}>Orcamento</Text>
          <Text style={styles.footerValue}>
            R$ {summary.totalBudget.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a7ea4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});