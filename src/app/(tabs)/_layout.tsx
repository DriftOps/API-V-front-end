 import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
         headerShown: false,
        /* tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground, */
        tabBarStyle: {
            display: "none",
            /*position: 'absolute',
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 55 */
          },
      }}>

      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => 
          <IconSymbol size={28} 
          name="house.fill" 
          color={color} />,
        }}
      />

      <Tabs.Screen 
         name="telaUsuario" 
         options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="person.fill" color={color} />
    ),
  }} 
/>

    </Tabs>
  );
}

