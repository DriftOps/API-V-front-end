import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PacoteViagem = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Pacote de Viagem</Text>

      {/* Nome fictício da viagem */}
      <Text style={styles.subtitle}>Viagem: Fortaleza - CE</Text>

      <View style={styles.card}>
        {/* Alimentação */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.replace("/(tabs)/alimentacao")}
        >
          <Image
            source={require("../../assets/images/food.png")}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Alimentação</Text>
        </TouchableOpacity>

        {/* Transporte */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.replace("/(tabs)/transporte")}
        >
          <Image
            source={require("../../assets/images/transport.png")}
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Transporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PacoteViagem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002963",
    alignItems: "center",
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#34bdeb",
    padding: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "70%",
  },
  option: {
    alignItems: "center",
    marginVertical: 15,
  },
  optionIcon: {
    width: 80,
    height: 80,
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#002963",
  },
});
