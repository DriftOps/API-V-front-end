import React, { useState, useEffect } from 'react';
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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Navtab from '@/components/Navtab';

const TelaReembolso = () => {
  const navigation = useNavigation();

  const [data, setData] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anexos, setAnexos] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState('');

  const [reembolsos, setReembolsos] = useState([
    { tipo: '', valor: 0, km: '', estabelecimento: '', custo_dist: '' },
  ]);

  useEffect(() => {
    buscarProjetos();
  }, []);

  const buscarProjetos = async () => {
    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();
      setProjetos(json.body);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

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

  const getFileName = (uri) => uri.split('/').pop();

  const formatCurrency = (value) => {
    // Recebe número, retorna string formatada
    return value
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAddReembolso = () => {
    setReembolsos([...reembolsos, { tipo: '', valor: 0, km: '', estabelecimento: '', custo_dist: '' }]);
  };

  const handleRemoveReembolso = (index) => {
    const novos = reembolsos.filter((_, i) => i !== index);
    setReembolsos(novos);
  };

  const handleKmChange = (text, index) => {
    const novos = [...reembolsos];
    novos[index].km = text;

    const mediaKmPorLitro = 10;
    const precoLitro = 6.0;

    const distancia = parseFloat(text.replace(',', '.'));
    if (!isNaN(distancia)) {
      const litros = distancia / mediaKmPorLitro;
      const valorCalculado = litros * precoLitro;

      novos[index].custo_dist = `R$ ${formatCurrency(valorCalculado)}`;
      novos[index].valor = valorCalculado;
    } else {
      novos[index].custo_dist = '';
      novos[index].valor = 0;
    }

    setReembolsos(novos);
  };

  const handleValorChange = (text, index) => {
    const novos = [...reembolsos];
    // Remove tudo que não é número, divide por 100 para manter decimais
    const cleaned = text.replace(/\D/g, '');
    const valorNum = parseInt(cleaned || '0', 10) / 100;
    novos[index].valor = valorNum;
    setReembolsos(novos);
  };

  const calcularTotalUtilizado = () => {
    return reembolsos.reduce((total, r) => total + (r.valor || 0), 0);
  };

  const handleEnviarPacote = async () => {
    if (!data || reembolsos.length === 0) {
      Alert.alert('Erro', 'Selecione a data e adicione ao menos uma despesa.');
      return;
    }

    try {
      const response = await fetch('http://172.27.208.1:3000/refunds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: '662adf6e457a4d8375c4e4b1',
          projeto_id: projetoSelecionado,
          refunds: reembolsos.map((item) => ({
            data: `${data.split('/')[2]}-${data.split('/')[1].padStart(2, '0')}-${data.split('/')[0].padStart(2, '0')}`,
            valor: item.valor,
            km: parseFloat(item.km.replace(',', '.')) || 0,
            estabelecimento: item.estabelecimento,
            tipo: item.tipo,
            custo_dist: item.custo_dist,
            imagens: anexos.map((anexo) => getFileName(anexo.uri)),
          })),
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar o pacote');

      Alert.alert('Sucesso', 'Reembolsos enviados com sucesso!');
      setReembolsos([{ tipo: '', valor: 0, km: '', estabelecimento: '', custo_dist: '' }]);
      setAnexos([]);
      setData('');
      setProjetoSelecionado('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar o pacote.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
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

          <Text style={styles.label}>Projeto:</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={projetoSelecionado}
              onValueChange={(itemValue) => setProjetoSelecionado(itemValue)}
            >
              <Picker.Item label="Selecione um projeto" value="" />
              {projetos.map((proj) => (
                <Picker.Item key={proj._id} label={proj.nome} value={proj._id} />
              ))}
            </Picker>
          </View>

          {projetoSelecionado ? (
            <Text style={styles.projetoInfo}>
              Utilizado: R$ {calcularTotalUtilizado().toFixed(2)} de R$ {projetos.find(p => p._id === projetoSelecionado)?.limite_reembolso.toFixed(2)}
            </Text>
          ) : null}

          <Text style={[styles.label, { marginTop: 5 }]}>Despesas:</Text>

          {reembolsos.map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                backgroundColor: '#335da1',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={[styles.label, { color: 'white' }]}>#{index + 1}</Text>

              <View style={styles.tipoContainer}>
                <TouchableOpacity
                  style={[styles.tipoButton, item.tipo === 'Geral' && styles.tipoButtonSelected]}
                  onPress={() => {
                    const novos = [...reembolsos];
                    novos[index].tipo = 'Geral';
                    novos[index].km = '';
                    novos[index].custo_dist = '';
                    setReembolsos(novos);
                  }}
                >
                  <Text
                    style={[
                      styles.tipoButtonText,
                      item.tipo === 'Geral' && styles.tipoButtonTextSelected,
                    ]}
                  >
                    Geral
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tipoButton,
                    item.tipo === 'Transporte' && styles.tipoButtonSelected,
                  ]}
                  onPress={() => {
                    const novos = [...reembolsos];
                    novos[index].tipo = 'Transporte';
                    novos[index].valor = 0;
                    setReembolsos(novos);
                  }}
                >
                  <Text
                    style={[
                      styles.tipoButtonText,
                      item.tipo === 'Transporte' && styles.tipoButtonTextSelected,
                    ]}
                  >
                    Transporte
                  </Text>
                </TouchableOpacity>
              </View>

              {item.tipo === 'Geral' && (
                <TextInput
                  style={styles.input}
                  placeholder="Valor (R$)"
                  keyboardType="numeric"
                  value={item.valor ? formatCurrency(item.valor) : ''}
                  onChangeText={(text) => handleValorChange(text, index)}
                />
              )}

              {item.tipo === 'Transporte' && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Distância (km)"
                    keyboardType="numeric"
                    value={item.km}
                    onChangeText={(text) => handleKmChange(text, index)}
                  />
                  {item.custo_dist !== '' && (
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        marginTop: -10,
                        marginBottom: 10,
                      }}
                    >
                      Custo estimado: {item.custo_dist}
                    </Text>
                  )}
                </>
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

          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: '#007AFF' }]}
            onPress={handleAddReembolso}
          >
            <Text style={[styles.sendButtonText, { color: 'white' }]}>
              + Adicionar Nova Despesa
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Anexos:</Text>

          {anexos.length > 0 && (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              {anexos.map((item, index) => (
                <View
                  key={index}
                  style={{ marginBottom: 10, alignItems: 'center' }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                  />
                  <TouchableOpacity
                    onPress={() => removeAnexo(index)}
                    style={[
                      styles.sendButton,
                      { backgroundColor: '#FF4444', marginTop: 5 },
                    ]}
                  >
                    <Text style={styles.sendButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              style={[styles.sendButton, { flex: 1, marginRight: 5 }]}
              onPress={pickImage}
            >
              <Text style={styles.sendButtonText}>Selecionar Imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, { flex: 1, marginLeft: 5 }]}
              onPress={takePhoto}
            >
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
  // mantém seus estilos originais
  container: {
    flex: 1,
    backgroundColor: '#00245D',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    top: 25,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFF',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#FFF',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    justifyContent: "center"
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tipoButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  tipoButtonSelected: {
    backgroundColor: '#fff',
  },
  tipoButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tipoButtonTextSelected: {
    color: '#335da1',
  },
  projetoInfo: {
    color: '#eee',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 14,
  },
  sendButton: {
    marginTop: 5,
    borderRadius: 8,
    height: 45,
    backgroundColor: '#335da1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TelaReembolso;
