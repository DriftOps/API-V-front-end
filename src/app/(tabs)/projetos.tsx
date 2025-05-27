import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Navtab from '@/components/Navtab';

const TelaProjetos = () => {
  const navigation = useNavigation();

  const [usuarios, setUsuarios] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [reembolsos, setReembolsos] = useState([]);

  const [nomeProjeto, setNomeProjeto] = useState('');
  const [limite, setLimite] = useState('');
  const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);

  const usuarioAtualId = '662adf6e457a4d8375c4e4b1'; // Substitua pelo ID real do usuário

  // Funções para buscar dados
  const buscarUsuarios = async () => {
    try {
      const response = await fetch('http://172.27.208.1:3000/users');
      const data = await response.json();
      setUsuarios(data.body);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  const buscarProjetos = async () => {
    try {
      const response = await fetch('http://172.27.208.1:3000/projects');
      const data = await response.json();
      setProjetos(data.body);
    } catch (error) {
      console.error('Erro ao buscar projetos', error);
    }
  };

  const buscarReembolsos = async () => {
    try {
      const response = await fetch('http://172.27.208.1:3000/refunds');
      const data = await response.json();
      setReembolsos(data.body);
    } catch (error) {
      console.error('Erro ao buscar reembolsos', error);
    }
  };

  // Criar projeto
  const criarProjeto = async () => {
    if (!nomeProjeto || !limite) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeProjeto,
          limite_reembolso: parseFloat(limite.replace(',', '.')),
          usuarios: [...usuariosSelecionados, usuarioAtualId],
          criado_por: usuarioAtualId,
        }),
      });

      if (!response.ok) throw new Error('Erro ao criar projeto');

      Alert.alert('Sucesso', 'Projeto criado com sucesso!');
      setNomeProjeto('');
      setLimite('');
      setUsuariosSelecionados([]);
      buscarProjetos();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar o projeto');
    }
  };

  // Calcular total utilizado
  const calcularTotalUtilizado = (projetoId) => {
    const utilizados = reembolsos
      .filter((r) => r.projeto === projetoId)
      .reduce((total, r) => total + r.valor, 0);
    return utilizados;
  };

  const getNomeUsuario = (id) => {
    const user = usuarios.find((u) => u._id === id);
    return user ? user.fullName : 'Desconhecido';
  };

  useEffect(() => {
    buscarUsuarios();
    buscarProjetos();
    buscarReembolsos();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Projetos</Text>

        {/* Formulário */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Projeto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            value={nomeProjeto}
            onChangeText={setNomeProjeto}
          />

          <Text style={styles.label}>Limite de Reembolso (R$):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o limite"
            value={limite}
            keyboardType="numeric"
            onChangeText={setLimite}
          />

          <Text style={styles.label}>Usuários:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={null}
              onValueChange={(itemValue) => {
                if (itemValue && !usuariosSelecionados.includes(itemValue)) {
                  setUsuariosSelecionados([...usuariosSelecionados, itemValue]);
                }
              }}
            >
              <Picker.Item label="Selecione um usuário" value={null} />
              {usuarios
                .filter((u) => u._id !== usuarioAtualId)
                .map((user) => (
                  <Picker.Item key={user._id} label={user.fullName} value={user._id} />
                ))}
            </Picker>
          </View>

          {usuariosSelecionados.length > 0 && (
            <View style={{ marginVertical: 5 }}>
              {usuariosSelecionados.map((id) => (
                <View key={id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{getNomeUsuario(id)}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      setUsuariosSelecionados(usuariosSelecionados.filter((i) => i !== id))
                    }
                  >
                    <Ionicons name="close-circle" size={20} color="red" style={{ marginLeft: 5 }} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.sendButton} onPress={criarProjeto}>
            <Text style={styles.sendButtonText}>Criar Projeto</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de projetos */}
        {projetos.map((proj) => {
          const totalUtilizado = calcularTotalUtilizado(proj._id);
          const percentual = Math.min(
            (totalUtilizado / proj.limite_reembolso) * 100,
            100
          );

          return (
            <View key={proj._id} style={styles.projetoCard}>
              <Text style={styles.projetoNome}>{proj.nome}</Text>
              <Text style={styles.projetoInfo}>
                Limite: R$ {proj.limite_reembolso.toFixed(2)}
              </Text>
              <Text style={styles.projetoInfo}>
                Criado por: {getNomeUsuario(proj.criado_por)}
              </Text>
              <Text style={styles.projetoInfo}>Usuários:</Text>
              {proj.usuarios.map((id) => (
                <Text key={id} style={styles.usuarioItem}>
                  - {getNomeUsuario(id)}
                </Text>
              ))}

              <Text style={styles.projetoInfo}>
                Utilizado: R$ {totalUtilizado.toFixed(2)} de R$ {proj.limite_reembolso.toFixed(2)}
              </Text>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentual}%`,
                      backgroundColor: percentual < 80 ? '#FFD700' : 'red',
                    },
                  ]}
                />
              </View>
              <Text style={styles.projetoInfo}>
                {percentual.toFixed(0)}% do limite utilizado
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <Navtab />
    </View>
  );
};

export default TelaProjetos;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00245D',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    top: 25,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 30,
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
  pickerContainer: {
    backgroundColor: '#EAF5F8',
    borderRadius: 10,
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  sendButtonText: {
    color: '#00245D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  projetoCard: {
    backgroundColor: '#335da1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  projetoNome: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projetoInfo: {
    color: 'white',
    fontSize: 14,
    marginBottom: 3,
  },
  usuarioItem: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginTop: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
});
