import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OpcoesScreen = () => {
  const navigation = useNavigation(); // Obtém a navegação

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Alimentação</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data:</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#ccc" />
        
        <Text style={styles.label}>Valor:</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#ccc" keyboardType="numeric" />
        
        <Text style={styles.label}>Estabelecimento:</Text>
        <TextInput style={styles.input} placeholder="" placeholderTextColor="#ccc" />
      </View>
      
      {/* Botão de câmera */}
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
  cameraButton: {
    position: 'absolute',
    bottom: 20,
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
