import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TransporteScreen = () => {
  const navigation = useNavigation(); // Para navegação
  const [form, setForm] = useState({ data: '', valor: '', km: '', estabelecimento: '' });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
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
        <TextInput 
          style={styles.input} 
          placeholder="Digite a data" 
          placeholderTextColor="#ccc" 
          value={form.data}
          onChangeText={(text) => handleChange('data', text)}
        />
        
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
