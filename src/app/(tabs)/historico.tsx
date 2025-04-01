import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const expenses = [
  { id: '1', category: 'Jantar', date: '18:27 - Abril 30', amount: '+R$25,00', icon: 'restaurant' },
  { id: '2', category: 'Transporte - 23km', date: '15:00 - Abril 24', amount: '+R$46,00', icon: 'car' },
  { id: '3', category: 'Transporte - 12km', date: '12:30 - Abril 15', amount: '+R$24,00', icon: 'car' },
  { id: '4', category: 'Café Da Manhã', date: '08:10 - Abril 08', amount: '+R$12,00', icon: 'cafe' },
  { id: '5', category: 'Jantar', date: '20:50 - Março 31', amount: '+R$27,20', icon: 'restaurant' },
];

const ExpenseScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ backgroundColor: '#002f6c', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Histórico</Text>
        <Ionicons name="settings" size={24} color="#fff" />
      </View>
      
      <View style={{ backgroundColor: '#004aad', padding: 20, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>Total Gasto</Text>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>R$7.783,00</Text>
      </View>
      
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 }}>
            <Ionicons name={item.icon} size={24} color="#007AFF" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.category}</Text>
              <Text style={{ color: 'gray' }}>{item.date}</Text>
            </View>
            <Text style={{ fontSize: 16, color: '#007AFF', fontWeight: 'bold' }}>{item.amount}</Text>
          </View>
        )}
      />
      
      <TouchableOpacity style={{ backgroundColor: '#00a86b', padding: 15, borderRadius: 10, alignItems: 'center', margin: 20 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Adicionar Despesa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseScreen;
