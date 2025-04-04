import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Image source={{ uri: "https://your-logo-url.com/logo.png" }} style={styles.logo} />
      </View>
      
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={80} color="#000" />
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

      <View style={styles.footer}>
        <TouchableOpacity>
          <Ionicons name="home" size={30} color="#002D62" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={30} color="#002D62" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={30} color="#002D62" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4FFF6", alignItems: "center" },
  header: { backgroundColor: "#002D62", width: "100%", height: 100, alignItems: "center", justifyContent: "center" },
  title: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  logo: { width: 80, height: 30, position: "absolute", top: 10, right: 10 },
  profileContainer: { alignItems: "center", marginTop: -30, backgroundColor: "#E8F6EF", width: "90%", borderRadius: 10, padding: 20 },
  avatar: { marginBottom: 10 },
  label: { fontSize: 14, fontWeight: "bold", color: "#333" },
  infoBox: { backgroundColor: "#002D62", borderRadius: 10, padding: 10, marginTop: 5 },
  infoText: { color: "#FFF", fontSize: 14 },
  reembolsoLabel: { marginTop: 20, fontSize: 14, color: "#333" },
  reembolsoValor: { fontSize: 20, fontWeight: "bold", color: "#002D62" },
  footer: { flexDirection: "row", justifyContent: "space-around", width: "100%", position: "absolute", bottom: 20 }
});

export default ProfileScreen;
