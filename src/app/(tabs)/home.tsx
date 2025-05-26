import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Navtab from '@/components/Navtab';


export default function Home() {

    const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Botão de Logout no canto superior esquerdo com ícone */}

      {/* Título */}
      <Text style={styles.title}>Reembolso</Text>

      <Image source={require('../../assets/images/gswlogo.png')} ></Image>

      {/* Total Gasto */}
      <View style={styles.totalContainer}>
        <Image source={require("../../assets/images/Income.png")} />
        <Text style={styles.totalText}>Total Gasto</Text>
      </View>

      <Text style={styles.amount}>R$7.783,00</Text>

      {/* Card de Opções */}
      <View style={styles.card}>
      <TouchableOpacity 
      style={styles.option}
      onPress={() => router.replace("/(tabs)/reembolso")}
    >
      <Ionicons name="add-circle-outline" size={90} color="#002963" />
      <Text style={styles.optionText}>Solicitar reembolso</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.option}
      onPress={() => router.replace("/(tabs)/historico")}
    >
      <Ionicons name="wallet-outline" size={90} color="#002963" />
      <Text style={styles.optionText}>Histórico</Text>
    </TouchableOpacity>
    </View>
    <Navtab />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002963",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: -90
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    fontWeight: "bold",
    marginTop: 20
  },
  totalText: {
    color: "white",
    fontSize: 16,
  },
  amount: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginBottom: 35,
  },
  card: {
  backgroundColor: "white",
  padding: 10,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  marginVertical: 30,
},
  option: {
    alignItems: "center",
    marginVertical: 15,
  },
  optionIcon: {
    width: 90,
    height: 90,
  },
  optionText: {
  color: "#002963",
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 2,
},

});
