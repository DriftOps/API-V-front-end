import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Navtab from '@/components/Navtab';


const TelaPerfil = () => {
  const [reembolso, setReembolso] = useState<number>(0);
  const [nome, setNome] = useState<string>(''); 

  const userId = "ID_DO_USUARIO"; // depois você pega dinâmico

  useEffect(() => {
    async function carregarDados() {
      const total = await fetchTotalRefund(userId);
      setReembolso(total);
      setNome("Luiz Henrique Souza Silva"); // futuramente também puxa do backend
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Image source={require('../../assets/images/gswlogo.png')} style={styles.logo} ></Image>
      </View>
      
      <ProfileContainer>
        <Avatar>
          <Ionicons name="person-circle-outline" size={200} color="#002D62" />
        </Avatar>
        
        <Text style={styles.label}>Nome</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Luiz Henrique Souza Silva</Text>
        </View>
        
        <Label>Data Registro</Label>
        <InfoBox>
          <InfoText>04/04/2025</InfoText>
        </InfoBox>
        
        <ReembolsoLabel>Quant. De Reembolso</ReembolsoLabel>
        <ReembolsoValor>R${reembolso.toFixed(2)}</ReembolsoValor>
      </ProfileContainer>

      <Navtab />
    


    </View>
    

    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" },
  header: { backgroundColor: "#002D62", width: "100%", height: 190, alignItems: "center", justifyContent: "center" },
  title: { color: "#FFF", fontSize: 18, fontWeight: "bold", top: 30,  },
  logo: {marginTop: 50},
  profileContainer: {marginTop: 10, width: "90%", padding: 20 },
  avatar: { marginBottom: 10, alignItems: "center" },
  label: { fontSize: 18, fontWeight: "bold", color: "#333"},
  infoBox: { backgroundColor: "#002D62", borderRadius: 30, padding: 15, marginTop: 9, alignItems: "center" },
  infoText: { color: "#FFF", fontSize: 20, alignItems: "center" },
  reembolsoLabel: { marginTop: 50, fontSize: 14,fontWeight: "bold", color: "#333", textAlign: "center" },
  reembolsoValor: { fontSize: 20, fontWeight: "bold", color: "#002D62", textAlign: "center" },
  footer: { flexDirection: "row", borderTopWidth: 5, borderTopColor: "#002D62" , padding: 15 , justifyContent: "space-around", width: "100%", position: "absolute", bottom: 20 }
});

export default TelaPerfil;
