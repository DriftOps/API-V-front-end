import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Reembolso() {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Reembolso</Text>

      {/* Total Gasto */}
      <View style={styles.totalContainer}>
        <Image source={require("../../assets/images/Income.png")} />
        <Text style={styles.totalText}>Total Gasto</Text>
      </View>

      <Text style={styles.amount}>R$7.783,00</Text>

      {/* Card de Opções */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.option}>
          <Image source={require("../../assets/images/transport.png")} style={styles.optionIcon} />
          <Text style={styles.optionText}>Transporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require("../../assets/images/food.png")} style={styles.optionIcon} />
          <Text style={styles.optionText}>Alimentação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require("../../assets/images/saving.png")} style={styles.optionIcon} />
          <Text style={styles.optionText}>Histórico</Text>
        </TouchableOpacity>
      </View>
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
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 3,
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
    marginBottom: 60,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "65%",
    height: "59%",
    marginBottom: 5,
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
});

