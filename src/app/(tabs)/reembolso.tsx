import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Navtab from '@/components/Navtab';

const TelaReembolso = () => {
  const navigation = useNavigation();

  const [data, setData] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anexos, setAnexos] = useState([]);

  const [reembolsos, setReembolsos] = useState([
    { tipo: '', valor: '', km: '', estabelecimento: '' },
  ]);

  const showDate = () => setShowDatePicker(true);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString('pt-BR');
      setData(formatted);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setAnexos([...anexos, result.assets[0]]);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setAnexos([...anexos, result.assets[0]]);
    }
  };

  const removeAnexo = (index) => {
    const novosAnexos = anexos.filter((_, i) => i !== index);
    setAnexos(novosAnexos);
  };

  const formatCurrency = (text) => {
    const cleaned = text.replace(/\D/g, '');
    const numericValue = (parseInt(cleaned || '0', 10) / 100).toFixed(2);
    return numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAddReembolso = () => {
    setReembolsos([...reembolsos, { tipo: '', valor: '', km: '', estabelecimento: '' }]);
  };

  const handleRemoveReembolso = (index) => {
    const novos = reembolsos.filter((_, i) => i !== index);
    setReembolsos(novos);
  };

  const handleEnviarPacote = async () => {
    if (!data || reembolsos.length === 0) {
      Alert.alert('Erro', 'Selecione a data e adicione ao menos uma despesa.');
      return;
    }

    try {
      const response = await fetch('http://192.168.157.222:3000/refunds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: '662adf6e457a4d8375c4e4b1',
          refunds: reembolsos.map((item) => ({
            data: `${data.split('/')[2]}-${data.split('/')[1].padStart(2, '0')}-${data.split('/')[0].padStart(2, '0')}`,
            valor: parseFloat(item.valor.replace('.', '').replace(',', '.')),
            km: parseFloat(item.km),
            estabelecimento: item.estabelecimento,
            tipo: item.tipo,
            imagens: anexos.map((anexo) => `data:${anexo.type || 'image/jpeg'};base64,${anexo.base64}`),
          })),
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar o pacote');

      Alert.alert('Sucesso', 'Reembolsos enviados com sucesso!');
      setReembolsos([{ tipo: '', valor: '', km: '', estabelecimento: '' , custo_dist: '' }]);
      setAnexos([]);
      setData('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar o pacote.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      

      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }} showsVerticalScrollIndicator={true}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

        <Text style={styles.title}>Nova solicitação</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data:</Text>
          <TouchableOpacity style={styles.input} onPress={showDate}>
            <Text style={{ color: data ? '#000' : '#ccc', fontSize: 16 }}>
              {data || 'Selecionar data'}
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

          <Text style={[styles.label, { marginTop: 20 }]}>Despesas:</Text>

          {reembolsos.map((item, index) => (
            <View key={index} style={{ marginBottom: 20, backgroundColor: '#335da1', padding: 10, borderRadius: 10 }}>
              <Text style={[styles.label, { color: 'white' }]}>#{index + 1}</Text>

              <View style={styles.tipoContainer}>
                <TouchableOpacity
                  style={[styles.tipoButton, item.tipo === 'Geral' && styles.tipoButtonSelected]}
                  onPress={() => {
                    const novos = [...reembolsos];
                    novos[index].tipo = 'Geral';
                    setReembolsos(novos);
                  }}
                >
                  <Text style={[styles.tipoButtonText, item.tipo === 'Geral' && styles.tipoButtonTextSelected]}>Geral</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.tipoButton, item.tipo === 'Transporte' && styles.tipoButtonSelected]}
                  onPress={() => {
                    const novos = [...reembolsos];
                    novos[index].tipo = 'Transporte';
                    setReembolsos(novos);
                  }}
                >
                  <Text style={[styles.tipoButtonText, item.tipo === 'Transporte' && styles.tipoButtonTextSelected]}>Transporte</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Valor (R$)"
                keyboardType="numeric"
                value={item.valor}
                onChangeText={(text) => {
                  const novos = [...reembolsos];
                  novos[index].valor = formatCurrency(text);
                  setReembolsos(novos);
                }}
              />

      <TextInput
    style={styles.input}
    placeholder="Distância (km)"
    keyboardType="numeric"
    value={item.km}
    onChangeText={(text) => {
      const novos = [...reembolsos];
      novos[index].km = text;

      const mediaKmPorLitro = 10; // média do Brasil
      const precoLitro = 6.0;     // valor do litro

      const distancia = parseFloat(text.replace(',', '.'));
      if (!isNaN(distancia)) {
        const litros = distancia / mediaKmPorLitro;
        const valorCalculado = litros * precoLitro;
        novos[index].custo_dist = `R$ ${valorCalculado.toFixed(2).replace('.', ',')}`;
      } else {
        novos[index].custo_dist = '';
      }

      setReembolsos(novos);
    }}
  />
  {item.custo_dist !== '' && (
    <Text style={{ color: 'white', fontSize: 14, marginTop: -10, marginBottom: 10 }}>
      Custo estimado: {item.custo_dist}
    </Text>
  )}

              <TextInput
                style={styles.input}
                placeholder="Estabelecimento"
                value={item.estabelecimento}
                onChangeText={(text) => {
                  const novos = [...reembolsos];
                  novos[index].estabelecimento = text;
                  setReembolsos(novos);
                }}
              />

              {reembolsos.length > 1 && (
                <TouchableOpacity
                  style={[styles.sendButton, { backgroundColor: '#FF4444' }]}
                  onPress={() => handleRemoveReembolso(index)}
                >
                  <Text style={styles.sendButtonText}>Remover Despesa</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity style={[styles.sendButton, { backgroundColor: '#007AFF' }]} onPress={handleAddReembolso}>
            <Text style={[styles.sendButtonText, { color: 'white' }]}>+ Adicionar Nova Despesa</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Anexos:</Text>

          {anexos.length > 0 && (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              {anexos.map((item, index) => (
                <View key={index} style={{ marginBottom: 10, alignItems: 'center' }}>
                  <Image source={{ uri: item.uri }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                  <TouchableOpacity
                    onPress={() => removeAnexo(index)}
                    style={[styles.sendButton, { backgroundColor: '#FF4444', marginTop: 5 }]}
                  >
                    <Text style={styles.sendButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <TouchableOpacity style={[styles.sendButton, { flex: 1, marginRight: 5 }]} onPress={pickImage}>
              <Text style={styles.sendButtonText}>Selecionar Imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sendButton, { flex: 1, marginLeft: 5 }]} onPress={takePhoto}>
              <Text style={styles.sendButtonText}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: '#00C851' }]}
            onPress={handleEnviarPacote}
          >
            <Text style={[styles.sendButtonText, { color: 'white' }]}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Navtab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00245D',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    top: 25
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '80%',
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
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    marginBottom: 15
  },
  sendButtonText: {
    color: '#00245D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tipoButton: {
    flex: 1,
    backgroundColor: '#EAF5F8',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  tipoButtonSelected: {
    backgroundColor: '#FFD700',
  },
  tipoButtonText: {
    color: '#00245D',
    fontSize: 16,
  },
  tipoButtonTextSelected: {
    fontWeight: 'bold',
  },
});

export default TelaReembolso;
