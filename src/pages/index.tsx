import React from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import {NavigationContainer} from '@react-navigation/native';

const gsw = require('../assets/images/gswlogo.png')

export default function Login() {
  return (
    <View
      style={{
        backgroundColor: "#002963",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <Image source={gsw}></Image>

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
            Login
          </Text>
        </TouchableOpacity>
      
    </View>
  );
}
