import React from "react";
import { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
  if (!user || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  try {
    const response = await fetch('http://10.0.2.2:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password: senha }),
    });

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem('token', data.body.token);
      router.replace("/(tabs)/home");
    } else {
      alert(data.body.text || "Erro ao fazer login");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro ao tentar fazer login. Tente novamente.");
  }
};

  

  return (
    <View
      style={{
        backgroundColor: "#002963",
        flex: 2,
        justifyContent: "flex-start",  // ou "center"
        alignItems: "center",
        paddingTop: 120, 
        gap: 40          
      }}
    >

      <Image source={require('../assets/images/gswlogo.png')}></Image>

      <View>

      <Text 
      style={{
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
      }}>Usuário:</Text>

      <TextInput    
      style={{
        backgroundColor: "white",
        borderRadius: 30,
        height: 50,
        width: 250,
        padding: 15
      }}
      value={user}
      onChangeText={(text) => setUser(text)}>
      </TextInput>
      </View>

      <View>
      <Text 
      style={{
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
      }}>Senha:</Text>

      <TextInput
      secureTextEntry={true}    
      style={{
        backgroundColor: "white",
        borderRadius: 30,
        height: 50,
        width: 250,
        padding: 15
      }}
      value={senha}
      onChangeText={(text) =>setSenha(text)}>

      </TextInput>
      </View>

      <TouchableOpacity
      onPress={handleLogin}
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            height: 50,
            width: 250, 
            justifyContent: "center",
            alignItems: "center", 
            marginTop: 40,
          }}
        >
          <Text
            style={{
              color: "black", 
              fontSize: 18, 
              fontWeight: "bold", 
            }}>
            Efetuar Login
          </Text>
        </TouchableOpacity>
      
    </View>
  );
}