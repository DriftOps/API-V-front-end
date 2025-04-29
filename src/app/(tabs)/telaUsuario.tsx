import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navtab from '@/components/Navtab';


const TelaPerfil = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Image source={require('../../assets/images/gswlogo.png')} style={styles.logo} ></Image>
      </View>
      
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={200} color="#002D62" />
        </View>
        
        <Text style={styles.label}>Nome</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Luiz Henrique Souza Silva</Text>
        </View>
        
        <Text style={styles.label}>Data Registro</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>04/04/2025</Text>
        </View>
        
        <Text style={styles.reembolsoLabel}>Quant. De Reembolso</Text>
        <Text style={styles.reembolsoValor}>R$1.893,00</Text>
      </View>

     
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
