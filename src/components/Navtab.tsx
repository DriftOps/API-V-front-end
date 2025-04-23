// Navtab.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Navtab() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
        <Ionicons name="home-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.centerButton}>
        <Ionicons name="add-outline" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telaUsuario')}>
        <Ionicons name="person-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0fff5',
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  button: {
    backgroundColor: '#002D72',
    borderRadius: 50,
    padding: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  centerButton: {
    backgroundColor: '#002D72',
    borderRadius: 50,
    padding: 22,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
});
