import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TelaReembolso = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({ data: '', valor: '', km: '', estabelecimento: '' });
  const [reembolsos, setReembolsos] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const showDate = () => setShowDatePicker(true);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString('pt-BR');
      handleChange('data', formatted);
    }
  };

  const formatCurrency = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const numericValue = (parseInt(cleaned || '0', 10) / 100).toFixed(2);
    return numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleCurrencyChange = (text) => {
    const masked = formatCurrency(text);
    handleChange('valor', masked);
  };

  const handleAddToPacote = () => {
    if (!form.data || !form.valor || !form.km || !form.estabelecimento) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setReembolsos([...reembolsos, form]);
    setForm({ data: '', valor: '', km: '', estabelecimento: '' });
  };

  const handleEnviarPacote = () => {
    if (reembolsos.length === 0) {
      Alert.alert("Pacote vazio", "Adicione pelo menos um reembolso.");
      return;
    }

    Alert.alert("Pacote Enviado", JSON.stringify(reembolsos, null, 2));
    setReembolsos([]);
  };

  const renderReembolso = ({ item, index }) => (
    <View key={index} style={styles.previewItem}>
      <Text style={styles.previewText}>#{index + 1} • {item.data} • R${item.valor} • {item.km}km • {item.estabelecimento}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Reembolso</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data:</Text>
        <TouchableOpacity style={styles.input} onPress={showDate}>
          <Text style={{ color: form.data ? '#000' : '#ccc', fontSize: 16 }}>
            {form.data || 'Selecionar data'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            locale="pt-BR"
          />
        )}

        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={form.valor}
          onChangeText={handleCurrencyChange}
        />

        <Text style={styles.label}>Km Rodado (se aplicável):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite os Km rodados"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={form.km}
          onChangeText={(text) => handleChange('km', text)}
        />

        <Text style={styles.label}>Estabelecimento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o estabelecimento"
          placeholderTextColor="#ccc"
          value={form.estabelecimento}
          onChangeText={(text) => handleChange('estabelecimento', text)}
        />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleAddToPacote}>
        <Text style={styles.sendButtonText}>Adicionar ao Pacote</Text>
      </TouchableOpacity>

      {reembolsos.length > 0 && (
        <>
          <Text style={[styles.label, { marginTop: 20 }]}>Reembolsos:</Text>
          <FlatList
            data={reembolsos}
            renderItem={renderReembolso}
            keyExtractor={(_, index) => index.toString()}
            style={{ width: '100%', marginBottom: 15 }}
          />

          <TouchableOpacity style={[styles.sendButton, { backgroundColor: '#00C851' }]} onPress={handleEnviarPacote}>
            <Text style={[styles.sendButtonText, { color: 'white' }]}>Enviar</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.cameraButton}>
        <Ionicons name="camera" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00245D',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#EAF5F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#00245D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraButton: {
    display: 'none',
    position: 'absolute',
    bottom: 90,
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: '#333',
  },
});

export default TelaReembolso;