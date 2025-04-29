import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Navtab from '@/components/Navtab';

const initialPackages = [
  {
    id: '1',
    name: 'Projeto A',
    status: 'Pendente',
    date: '30 de Abril - 18:27',
    kilometers: 20,
    expenses: [
      { id: '1', category: 'Geral', amount: 52.00 },
      { id: '2', category: 'Transporte', amount: 65.00 }
    ]
  },
  {
    id: '2',
    name: 'Projeto B',
    status: 'Aprovado',
    date: '15 de Abril - 18:00',
    kilometers: 50,
    expenses: [
      { id: '3', category: 'Geral', amount: 25.00 },
      { id: '4', category: 'Transporte', amount: 46.00 }
    ]
  },
  {
    id: '3',
    name: 'Projeto X',
    status: 'Reprovado',
    date: '10 de Abril - 14:30',
    kilometers: 35,
    expenses: [
      { id: '5', category: 'Geral', amount: 30.00 },
      { id: '6', category: 'Transporte', amount: 40.00 }
    ]
  },
  {
    id: '4',
    name: 'Projeto Y',
    status: 'Aprovado',
    date: '12 de Abril - 09:15',
    kilometers: 75,
    expenses: [
      { id: '7', category: 'Geral', amount: 20.00 },
      { id: '8', category: 'Transporte', amount: 60.00 }
    ]
  },
  {
    id: '5',
    name: 'Projeto 123',
    status: 'Pendente',
    date: '20 de Abril - 16:00',
    kilometers: 120,
    expenses: [
      { id: '9', category: 'Geral', amount: 35.00 },
      { id: '10', category: 'Transporte', amount: 80.00 }
    ]
  },
  {
    id: '6',
    name: 'Projeto 456',
    status: 'Reprovado',
    date: '18 de Abril - 13:45',
    kilometers: 90,
    expenses: [
      { id: '11', category: 'Geral', amount: 50.00 },
      { id: '12', category: 'Transporte', amount: 90.00 }
    ]
  },
  {
    id: '7',
    name: 'Projeto 3',
    status: 'Aprovado',
    date: '5 de Abril - 08:00',
    kilometers: 60,
    expenses: [
      { id: '13', category: 'Geral', amount: 40.00 },
      { id: '14', category: 'Transporte', amount: 70.00 }
    ]
  },
];

const TelaHistorico = () => {
  const navigation = useNavigation();
  const [packages, setPackages] = useState(initialPackages);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const toggleExpand = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
      </View>

      {/* Lista de Pacotes */}
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={styles.packageCard}>
            {/* Nome editável */}
            <TextInput
              style={styles.packageName}
              value={item.name}
            />

            {/* Status e Data */}
            <View style={styles.statusRow}>
              <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            {/* Quilometragem */}
            <Text style={{ color: 'gray', marginBottom: 5 }}>{item.kilometers} km</Text>

            {/* Botão Ver Detalhes */}
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Text style={{ color: '#007AFF', marginBottom: 10 }}>
                {expandedPackage === item.id ? 'Ocultar detalhes' : 'Ver detalhes'}
              </Text>
            </TouchableOpacity>

            {/* Lista de despesas */}
            {expandedPackage === item.id && (
              <View>
                {item.expenses.map(expense => (
                  <View key={expense.id} style={styles.expenseItem}>
                    <Text style={{ flex: 1 }}>{expense.category}</Text>
                    <TextInput
                      style={styles.amountInput}
                      keyboardType="numeric"
                      value={expense.amount.toFixed(2)}
                      editable={false} // Torna o campo de valor não editável
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />

      <Navtab />
    </View>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Aprovado':
      return { color: 'green' };
    case 'Reprovado':
      return { color: 'red' };
    case 'Pendente':
      return { color: 'grey' };
    default:
      return { color: 'gray' };
  }
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#002f6c',
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  header: {
    backgroundColor: '#002f6c',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    left: 145
  },
  packageCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
    fontSize: 14,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amountInput: {
    width: 80,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#007AFF',
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default TelaHistorico;
