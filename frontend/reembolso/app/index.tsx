import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Login() {
  return (
    <View
      style={{
        backgroundColor: "#002963",
        flex: 2,
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <Image source={require('../assets/images/gswlogo.svg')}></Image>

      <View style={{
      }}>

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
