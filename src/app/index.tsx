import React from "react";
import { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenar o token no AsyncStorage ou estado global, se necessário
        // Navegar para a tela de home
        router.replace("/(tabs)/home");
      } else {
        alert(data.message);  // Exibir erro se houver
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
        justifyContent: "space-evenly",
        alignItems: "center"
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
        width: 250
      }}></TextInput>
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
      style={{
        backgroundColor: "white",
        borderRadius: 30,
        height: 50,
        width: 250
      }}></TextInput>
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
          }}
        >
          <Text
            style={{
              color: "black", 
              fontSize: 18, 
              fontWeight: "bold", 
            }}
          >
            Efetuar Login
          </Text>
        </TouchableOpacity>
      
    </View>
  );
}