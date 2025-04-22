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

const TransporteScreen = () => {
  const navigation = useNavigation(); // Para navegação
  const [form, setForm] = useState({ data: '', valor: '', km: '', estabelecimento: '' });
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

  const handleSubmit = () => {
    Alert.alert("Dados Enviados", `Data: ${form.data}\nValor: ${form.valor}\nKm: ${form.km}\nEstabelecimento: ${form.estabelecimento}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Transporte</Text>
      
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
          <TouchableOpacity style={styles.iconOverlay} onPress={() => setShowDatePicker(true)}>
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
        
        <Text style={styles.label}>Km Rodado:</Text>
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

      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>

      {/* Camera Button */}
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
    marginBottom: 20,
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
});

export default TransporteScreen;
