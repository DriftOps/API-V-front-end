import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function Navtab() {
  const navigation = useNavigation();

  const scaleNotification = useSharedValue(1);
  const scaleHome = useSharedValue(1);
  const scaleProfile = useSharedValue(1);

  const animatedNotification = useAnimatedStyle(() => ({
    transform: [{ scale: scaleNotification.value }],
  }));

  const animatedHome = useAnimatedStyle(() => ({
    transform: [{ scale: scaleHome.value }],
  }));

  const animatedProfile = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProfile.value }],
  }));

  const handlePress = (scaleRef: any, route: string) => {
    scaleRef.value = withSpring(1.2, {}, () => {
      scaleRef.value = withSpring(1);
    });
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Botão Notificações */}
      <Animated.View style={[styles.largeButton, animatedNotification]}>
        <TouchableOpacity onPress={() => handlePress(scaleNotification, 'notificacao')}>
          <Ionicons name="notifications-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Botão Home */}
      <Animated.View style={[styles.smallButton, animatedHome]}>
        <TouchableOpacity onPress={() => handlePress(scaleHome, 'home')}>
          <Ionicons name="home-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* Botão Perfil */}
      <Animated.View style={[styles.largeButton, animatedProfile]}>
        <TouchableOpacity onPress={() => handlePress(scaleProfile, 'telaUsuario')}>
          <Ionicons name="person-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  smallButton: {
    backgroundColor: '#002b64',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    backgroundColor: '#002b64',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
