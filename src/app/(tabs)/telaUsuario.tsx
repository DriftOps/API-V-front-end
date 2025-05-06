import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Navtab from '@/components/Navtab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container, Header, Title, Logo,
  ProfileContainer, Avatar, Label,
  InfoBox, InfoText, ReembolsoLabel, ReembolsoValor
} from '../../hooks/telaUsuario.styles';

const TelaPerfil = () => {
  const [reembolso, setReembolso] = useState<number>(0);
  const [nome, setNome] = useState<string>('');
  const [dataRegistro, setDataRegistro] = useState<string>('04/04/2025'); // valor default

  function formatarData(data: string) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }


  useEffect(() => {
    async function carregarDados() {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (!id) return;
  
        const userResponse = await fetch(`http://localhost:3000/users/${id}`);
        const userData = await userResponse.json();
  
        if (userData.success) {
          setNome(userData.body.fullName);
          if (userData.body.createdAt) {
            setDataRegistro(formatarData(userData.body.createdAt));
          }
        }
  
        const total = await fetchTotalRefund(id);
        setReembolso(total);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
  
    carregarDados();
  }, []);
  
  

  async function fetchTotalRefund(userId: string) {
    try {
      const response = await fetch(`http://localhost:3000/refunds/total/${userId}`);
      const data = await response.json();
      return data.success ? data.total : 0;
    } catch (error) {
      console.error("Erro ao buscar reembolso:", error);
      return 0;
    }
  }

  async function fetchUserData(userId: string) {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await response.json();
      return data.success ? data.user : null;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    }
  }

  return (
    <Container>
      <Header>
        <Title>Perfil</Title>
        <Logo source={require('../../assets/images/gswlogo.png')} />
      </Header>

      <ProfileContainer>
        <Avatar>
          <Ionicons name="person-circle-outline" size={200} color="#002D62" />
        </Avatar>

        <Label>Nome</Label>
        <InfoBox>
          <InfoText>{nome}</InfoText>
        </InfoBox>

        <Label>Data Registro</Label>
        <InfoBox>
          <InfoText>{dataRegistro}</InfoText>
        </InfoBox>


        <ReembolsoLabel>Quant. De Reembolso</ReembolsoLabel>
        <ReembolsoValor>R${reembolso.toFixed(2)}</ReembolsoValor>
      </ProfileContainer>

      <Navtab />
    </Container>
  );
};

export default TelaPerfil;