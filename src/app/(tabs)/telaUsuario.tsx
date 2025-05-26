import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Navtab from '@/components/Navtab';
import { router } from "expo-router";

const TelaPerfil = () => {

  const [userData, setUserData] = useState<{
    user: string;
    dataRegistro: string;
    reembolso: number;
  } | null>(null);

   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/users");
        const json = await response.json();

        if (json.body && json.body.length > 0) {
          const user = json.body[0];

          setUserData({
            user: user.user,
            dataRegistro: user.dataRegistro,
            reembolso: user.reembolso,
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
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
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
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
    {
      text: "Tirar Foto",
      onPress: takePhoto,
    },
    {
      text: "Escolher da Galeria",
      onPress: pickImage,
    },
  ];

  if (selectedImage) {
    buttons.push({
      text: "Remover Foto",
      onPress: async () => setSelectedImage(null),
      style: "destructive" as const,
    });
  }


  buttons.push({
    text: "Cancelar",
    style: "cancel" as const,
  });

  Alert.alert(
    "Selecionar Imagem",
    "Escolha uma opção",
    buttons,
    { cancelable: true }
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={30} color="#002963" />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil</Text>
        <Image source={require('../../assets/images/gswlogo.png')} style={styles.logo} />
      </View>

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
            {userData?.user ?? "Carregando..."}
          </Text>
        </View>

        <Text style={styles.label}>Data Registro:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {userData?.dataRegistro
              ? new Date(userData.dataRegistro).toLocaleDateString("pt-BR")
              : "Carregando..."}
          </Text>
        </View>

        <Text style={styles.reembolsoLabel}>Valor Reembolsado:</Text>
        <Text style={styles.reembolsoPositivo}>R$1.893,00</Text>

        <Text style={styles.reembolsoLabel}>Valor Pendente:</Text>
        <Text style={styles.reembolsoPendente}>R$500,00</Text>

        <Text style={styles.reembolsoLabel}>Valor Reprovado:</Text>
        <Text style={styles.reembolsoNegativo}>-R$750,00</Text>

        </View>

      <Navtab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" },
  header: { backgroundColor: "#002D62", width: "100%", height: 140, alignItems: "center", justifyContent: "center" },
  title: { color: "#FFF", fontSize: 18, fontWeight: "bold", top: 30,  },
  logo: {marginTop: 45},
  profileContainer: {marginTop: 10, width: "90%", padding: 20 },
  avatar: { marginBottom: 10, alignItems: "center" },
  label: { fontSize: 18, fontWeight: "bold", color: "#333"},
  infoBox: { backgroundColor: "#002D62", borderRadius: 30, padding: 15, marginTop: 9, alignItems: "center", marginBottom: 25 },
  infoText: { color: "#FFF", fontSize: 20, alignItems: "center" },
reembolsoLabel: { 
  fontSize: 17,
  fontWeight: "bold",
  color: "#333",
  textAlign: "center" 
},
footer: { flexDirection: "row", borderTopWidth: 5, borderTopColor: "#002D62" , padding: 15 , justifyContent: "space-around", width: "100%", position: "absolute", bottom: 20 },
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

avatarTouchable: {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
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
