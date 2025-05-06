import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState(""); // Nome de usuário
  const [senha, setSenha] = useState(""); // Senha

  // Função para realizar o login
  const handleLogin = async () => {
    if (!user || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      // Envia a requisição para o backend de autenticação
      const response = await fetch('http://192.168.0.90:3000/auth/login', {  // Substitua pelo IP da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password: senha }), // Envia 'user'
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenando token e userId no AsyncStorage
        await AsyncStorage.setItem('token', data.body.token); // Armazena o token
        await AsyncStorage.setItem('userId', data.body.user.id); // Armazena o userId

        // Navega para a próxima tela (home ou perfil)
        router.replace("/(tabs)/home"); // Altere para a tela de sua escolha
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
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Image source={require('../assets/images/gswlogo.png')} />

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Usuário:
        </Text>

        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            height: 50,
            width: 250,
          }}
          value={user}
          onChangeText={(text) => setUser(text)}
        />
      </View>

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Senha:
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{
            backgroundColor: "white",
            borderRadius: 30,
            height: 50,
            width: 250,
          }}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
      </View>

      <TouchableOpacity
        onPress={handleLogin} // Chama a função handleLogin
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
