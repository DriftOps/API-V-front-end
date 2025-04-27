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
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navtab from '@/components/Navtab';
import DocumentPicker from 'react-native-document-picker'; // Importação do Document Picker

const TelaReembolso = () => {
  const navigation = useNavigation();

  type Comprovante = {
    uri: string;
    name: string;
    [key: string]: any;
  };

  const [form, setForm] = useState<{
    data: string;
    valor: string;
    km: string;
    estabelecimento: string;
    tipo: string;
    descricao: string;
    comprovante: Comprovante | null;
  }>({
    data: '',
    valor: '',
    km: '',
    estabelecimento: '',
    tipo: '',
    descricao: '',
    comprovante: null,
  });

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

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: DocumentPicker.types.images, // Seleciona apenas imagens
      });
  
      if (result) {
        const file = {
          uri: result.uri,
          name: result.name,
          mimeType: result.type || '', // Pode ser vazio se não detectado
        };
        handleChange('comprovante', file);  // Atualiza o estado com a imagem selecionada
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // O usuário cancelou a seleção do arquivo
        console.log('Usuário cancelou a seleção de arquivo');
      } else {
        console.log('Erro ao selecionar comprovante:', error);
      }
    }
  };  

  const handleRemoveComprovante = () => {
    handleChange('comprovante', null);
  };

  const handleAddToPacote = () => {
    if (!form.data || !form.valor || !form.km || !form.estabelecimento || !form.tipo || !form.descricao) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const formToSave = { ...form };

    setReembolsos(prev => [...prev, formToSave]);
    setForm({ data: '', valor: '', km: '', estabelecimento: '', tipo: '', descricao: '', comprovante: null });
  };

  const handleEnviarPacote = () => {
    if (reembolsos.length === 0) {
      Alert.alert("Pacote vazio", "Adicione pelo menos um reembolso.");
      return;
    }

    Alert.alert("Solicitação enviada", JSON.stringify(reembolsos, null, 2));
    setReembolsos([]);
  };

  const renderReembolso = ({ item, index }) => (
    <View key={index} style={styles.previewItem}>
      <Text style={styles.previewText}>#{index + 1} • {item.data} • R${item.valor} • {item.km}km • {item.estabelecimento}</Text>
      <Text style={[styles.previewText, { fontSize: 12 }]}>Tipo: {item.tipo} | {item.descricao}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Reembolso</Text>

        <View style={styles.inputContainer}>
          {/* Campo Data */}
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

          {/* Campo Valor */}
          <Text style={styles.label}>Valor:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o valor"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={form.valor}
            onChangeText={handleCurrencyChange}
          />

          <Text style={styles.label}>Tipo:</Text>
          <View style={styles.tipoContainer}>
            <TouchableOpacity
              style={[styles.tipoButton, form.tipo === 'Geral' && styles.tipoButtonSelected]}
              onPress={() => handleChange('tipo', 'Geral')}
            >
              <Text style={[styles.tipoButtonText, form.tipo === 'Geral' && styles.tipoButtonTextSelected]}>Geral</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tipoButton, form.tipo === 'Transporte' && styles.tipoButtonSelected]}
              onPress={() => handleChange('tipo', 'Transporte')}
            >
              <Text style={[styles.tipoButtonText, form.tipo === 'Transporte' && styles.tipoButtonTextSelected]}>Transporte</Text>
            </TouchableOpacity>
          </View>

          {/* Campo Km */}
          <Text style={styles.label}>Km Rodado (se aplicável):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite os Km rodados"
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={form.km}
            onChangeText={(text) => handleChange('km', text)}
          />

          {/* Campo Estabelecimento */}
          <Text style={styles.label}>Estabelecimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o estabelecimento"
            placeholderTextColor="#ccc"
            value={form.estabelecimento}
            onChangeText={(text) => handleChange('estabelecimento', text)}
          />

          {/* Campo Descrição */}
          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Digite a descrição"
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={4}
            value={form.descricao}
            onChangeText={(text) => handleChange('descricao', text)}
          />

          {/* Campo Comprovante */}
          <Text style={styles.label}>Comprovante:</Text>

          <TouchableOpacity style={styles.pickButton} onPress={handlePickDocument}>
            <Text style={styles.pickButtonText}>Selecionar Comprovante</Text>
          </TouchableOpacity>
          {form.comprovante && (
            <View style={styles.comprovanteContainer}>
              {form.comprovante.mimeType.startsWith('image/') ? (
                <Image source={{ uri: form.comprovante.uri }} style={styles.comprovanteImage} />
              ) : (
                <Ionicons name="document-text" size={40} color="#00245D" style={{ marginRight: 10 }} />
              )}
              <Text style={styles.comprovanteText}>{form.comprovante.name}</Text>
              <TouchableOpacity onPress={handleRemoveComprovante}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}

          {/* Botão Adicionar ao Pacote */}
          <TouchableOpacity style={styles.sendButton} onPress={handleAddToPacote}>
            <Text style={styles.sendButtonText}>Adicionar ao Pacote</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Reembolsos */}
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
    bottom: -26
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
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

  comprovanteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF5F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  comprovanteImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  comprovanteText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  pickButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  pickButtonText: {
    color: '#00245D',
    fontSize: 16,
  },
});

export default TelaReembolso;
