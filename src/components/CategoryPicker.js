import React from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import { CATEGORIES } from '../utils/constants';

export function CategoryPicker({ visible, onClose, onSelectCategory, selectedCategory }) {
  const categories = Object.entries(CATEGORIES);

  const handleSelect = (categoryKey) => {
    onSelectCategory(categoryKey);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione uma Categoria</Text>
          <FlatList
            data={categories}
            keyExtractor={([key]) => key}
            renderItem={({ item: [key, value] }) => (
              <Pressable
                style={[
                  styles.categoryItem,
                  selectedCategory === key && styles.selectedCategory
                ]}
                onPress={() => handleSelect(key)}
              >
                <Text style={styles.categoryEmoji}>{value.emoji}</Text>
                <Text style={styles.categoryLabel}>{value.label}</Text>
              </Pressable>
            )}
          />
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#11181C',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  selectedCategory: {
    backgroundColor: '#e6f7f5',
  },
  categoryEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryLabel: {
    fontSize: 16,
    color: '#11181C',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});