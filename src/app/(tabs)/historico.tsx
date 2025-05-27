import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Navtab from '@/components/Navtab';

const TelaHistorico = () => {
  const navigation = useNavigation();
  const [packages, setPackages] = useState<any[]>([]);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const toggleExpand = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  const buscarReembolsos = async () => {
    try {
      const response = await fetch('http://localhost:3000/refunds');
      const data = await response.json();

      const mappedData = data.body.map((item: any) => ({
        id: item._id,
        name: item.projeto_nome,
        status: item.status,
        date: formatDate(item.data),
        kilometers: item.refunds.reduce((acc: number, cur: any) => acc + (cur.km || 0), 0),
        expenses: item.refunds.map((r: any, index: number) => ({
          id: `${item._id}-${index}`,
          category: r.tipo,
          amount: r.valor,
        })),
      }));

      setPackages(mappedData);
    } catch (error) {
      console.error('Erro ao buscar reembolsos:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  useEffect(() => {
    buscarReembolsos();
  }, []);

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
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 120
        }}
        renderItem={({ item }) => (
          <View style={styles.packageCard}>
            <TextInput
              style={styles.packageName}
              value={item.name}
              editable={false}
            />

            <View style={styles.statusRow}>
              <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <Text style={{ color: 'gray', marginBottom: 5 }}>{item.kilometers} km</Text>

            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Text style={{ color: '#007AFF', marginBottom: 10 }}>
                {expandedPackage === item.id ? 'Ocultar detalhes' : 'Ver detalhes'}
              </Text>
            </TouchableOpacity>

            {expandedPackage === item.id && (
              <View>
                {item.expenses.map((expense: any) => (
                  <View key={expense.id} style={styles.expenseItem}>
                    <Text style={{ flex: 1 }}>{expense.category}</Text>
                    <TextInput
                      style={styles.amountInput}
                      keyboardType="numeric"
                      value={expense.amount.toFixed(2)}
                      editable={false}
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
      return { color: 'orange' };
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
