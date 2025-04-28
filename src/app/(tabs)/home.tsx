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
      <TouchableOpacity style={styles.logoutButton} 
      onPress={() => router.replace("/")}>
        <Ionicons name="log-out-outline" size={30} color="#002963" />
      </TouchableOpacity>

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
        <Image source={require("../../assets/images/transport.png")} style={styles.optionIcon} />
        <Text style={styles.optionText}>Solicitar reembolso</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => router.replace("/(tabs)/historico")}
      >
        <Image source={require("../../assets/images/saving.png")} style={styles.optionIcon} />
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
    marginBottom: 10,
    marginTop: 40
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
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "45%",
  },
  option: {
    alignItems: "center",
    marginVertical: 10,
  },
  optionIcon: {
    width: 90,
    height: 90,
  },
  optionText: {
    color: "#002963",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "white", 
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
