import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Navtab from '@/components/Navtab';
import { router } from "expo-router";

const TelaPerfil = () => {
  const [userData, setUserData] = useState<{
    user: string;
    fullName: string;
    dataRegistro: string;
    reembolso: number;
    pendente: number;
    reprovado: number;
  } | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.0.104:3000/users"); // Seu IP
        const json = await response.json();

        if (json.body && json.body.length > 0) {
          const user = json.body[0];

          setUserData({
            user: user.user || "Desconhecido",
            fullName: user.fullName,
            dataRegistro: user.dataRegistro?.$date?.$numberLong
              ? new Date(Number(user.dataRegistro.$date.$numberLong)).toISOString()
              : "",
            reembolso: user.reembolso ?? 0,
            pendente: user.pendente ?? 0,
            reprovado: user.reprovado ?? 0,
          });
        } else {
          console.warn("Nenhum usuário encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert("Permissão negada", "Você precisa permitir o acesso à câmera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openImagePickerOptions = () => {
    const buttons = [
      { text: "Tirar Foto", onPress: takePhoto },
      { text: "Escolher da Galeria", onPress: pickImage },
    ];

    if (selectedImage) {
      buttons.push({
        text: "Remover Foto",
        onPress: () => setSelectedImage(null),
        style: "destructive" as const,
      });
    }

    buttons.push({
      text: "Cancelar",
      style: "cancel" as const,
    });

    Alert.alert("Selecionar Imagem", "Escolha uma opção", buttons, { cancelable: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={() => router.replace("/")}
          >
            <Ionicons name="log-out-outline" size={30} color="#002963" />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil</Text>
          <Image 
            source={require('../../assets/images/gswlogo.png')} 
            style={styles.logo} 
          />
        </View>

        {/* Conteúdo do perfil */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={openImagePickerOptions}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person-circle-outline" size={160} color="#002D62" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={openImagePickerOptions}>
              <Ionicons 
                name="camera-outline" 
                size={30} 
                color="#fff" 
                style={styles.cameraIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nome:</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              {userData?.fullName ?? "Carregando..."}
            </Text>
          </View>

          <Text style={styles.label}>Data Registro:</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              22/03/2025
            </Text>
          </View>

          <Text style={styles.reembolsoLabel}>Valor Reembolsado:</Text>
          <Text style={styles.reembolsoPositivo}>
            {userData ? `R$${userData.reembolso.toFixed(2)}` : "Carregando..."}
          </Text>

          <Text style={styles.reembolsoLabel}>Valor Pendente:</Text>
          <Text style={styles.reembolsoPendente}>
            {userData ? `R$${userData.pendente.toFixed(2)}` : "Carregando..."}
          </Text>

          <Text style={styles.reembolsoLabel}>Valor Reprovado:</Text>
          <Text style={styles.reembolsoNegativo}>
            {userData ? `R$${userData.reprovado.toFixed(2)}` : "Carregando..."}
          </Text>
        </View>
      </ScrollView>

      {/* Navegação fixa */}
      <Navtab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFFFF" 
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 100,
  },
  header: { 
    backgroundColor: "#002D62", 
    width: "100%", 
    height: 140, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  title: { 
    color: "#FFF", 
    fontSize: 18, 
    fontWeight: "bold", 
    top: 30 
  },
  logo: { 
    marginTop: 45 
  },
  profileContainer: { 
    marginTop: 10, 
    width: "90%", 
    padding: 20 
  },
  label: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333" 
  },
  infoBox: { 
    backgroundColor: "#002D62", 
    borderRadius: 30, 
    padding: 15, 
    marginTop: 9, 
    alignItems: "center", 
    marginBottom: 25 
  },
  infoText: { 
    color: "#FFF", 
    fontSize: 20 
  },
  logoutButton: {
    position: "absolute",
    top: 55,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 160,
    height: 160,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: '#002D62',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    left: 40,
    backgroundColor: '#002D62',
    padding: 5,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },
  reembolsoLabel: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  reembolsoPositivo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  reembolsoPendente: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  reembolsoNegativo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default TelaPerfil;
