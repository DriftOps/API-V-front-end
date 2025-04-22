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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaskInput, { Masks } from 'react-native-mask-input';

const OpcoesScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({ data: '', valor: '', estabelecimento: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formatted = `${day}/${month}/${year}`;
      setForm({ ...form, data: formatted });
    }
  };

  const isValidDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) return false;
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  };

  const formatDateForDB = (input) => {
    const [day, month, year] = input.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    if (form.data.length !== 10 || !isValidDate(form.data)) {
      Alert.alert('Erro', 'Data inválida. Use uma data real no formato DD/MM/AAAA.');
      return;
    }

    const dataFormatada = formatDateForDB(form.data);

    Alert.alert(
      'Dados Enviados',
      `Data: ${dataFormatada}\nValor: ${form.valor}\nEstabelecimento: ${form.estabelecimento}`
    );

    // Aqui você pode fazer a requisição para seu back-end com dataFormatada
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Alimentação</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data:</Text>

        <View style={styles.inputWrapper}>
          <MaskInput
            style={[styles.input, { paddingRight: 40 }]}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#ccc"
            value={form.data}
            onChangeText={(masked) => handleChange('data', masked)}
            mask={Masks.DATE_DDMMYYYY}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.iconOverlay}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={22} color="#00245D" />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={form.valor}
          onChangeText={(text) => handleChange('valor', text)}
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

      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>

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
    marginBottom: 10,
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
    fontSize: 16,
    marginBottom: 15,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconOverlay: {
    position: 'absolute',
    right: 10,
    top: 10,
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
});

export default OpcoesScreen;
