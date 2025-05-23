import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Navtab from '@/components/Navtab';
import { Swipeable } from 'react-native-gesture-handler';

interface Notification {
  id: number;
  userName: string;
  userImage: string;
  status: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      userName: 'Projeto A',
      userImage: 'https://example.com/profile1.jpg',
      status: 'Pendente',
    },
    {
      id: 2,
      userName: 'Projeto X',
      userImage: 'https://example.com/profile2.jpg',
      status: 'Pendente',
    },
    {
      id: 3,
      userName: 'Projeto B',
      userImage: 'https://example.com/profile3.jpg',
      status: 'Pendente',
    },
  ]);

  const approveRefund = (id: number) => {
    setNotifications((prevState) =>
      prevState.map((notification) =>
        notification.id === id ? { ...notification, status: 'Aprovado' } : notification
      )
    );
  
    setTimeout(() => {
      Alert.alert(
        'Sucesso',
        `Reembolso ${id} aprovado!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setNotifications((prevState) => prevState.filter((n) => n.id !== id));
            }
          }
        ]
      );
    }, 100); // pequeno delay para garantir que o React re-renderize primeiro
  };
  
  const rejectRefund = (id: number) => {
    setNotifications((prevState) =>
      prevState.map((notification) =>
        notification.id === id ? { ...notification, status: 'Reprovado' } : notification
      )
    );
  
    setTimeout(() => {
      Alert.alert(
        'Sucesso',
        `Reembolso ${id} reprovado!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setNotifications((prevState) => prevState.filter((n) => n.id !== id));
            }
          }
        ]
      );
    }, 100);
  };
  
  

  return (

    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>
      
      {/* Conteúdo */}
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationItem 
              item={item} 
              approveRefund={approveRefund} 
              rejectRefund={rejectRefund} 
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Barra de Navegação */}
      <Navtab />
    </SafeAreaView>
  );
};

// Componente para Notificação Individual
const NotificationItem = ({ item, approveRefund, rejectRefund }: any) => {
  const approveScale = useSharedValue(1);
  const rejectScale = useSharedValue(1);

  const approveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: approveScale.value }],
  }));

  const rejectAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rejectScale.value }],
  }));

  const handleApprove = () => {
    approveScale.value = withSpring(1.2, {}, () => {
      approveScale.value = withSpring(1);
    });
    approveRefund(item.id);
  };

  const handleReject = () => {
    rejectScale.value = withSpring(1.2, {}, () => {
      rejectScale.value = withSpring(1);
    });
    rejectRefund(item.id);
  };

  return (
    <View style={styles.notification}>
      <Image source={{ uri: item.userImage }} style={styles.profilePic} />
      <View style={styles.notificationInfo}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.message}>Solicitou um reembolso</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          Status: {item.status}
        </Text>
        <View style={styles.actions}>
          <Animated.View style={[styles.button, styles.approve, approveAnimatedStyle]}>
            <TouchableOpacity onPress={handleApprove}>
              <Text style={styles.buttonText}>Aprovar</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.button, styles.reject, rejectAnimatedStyle]}>
            <TouchableOpacity onPress={handleReject}>
              <Text style={styles.buttonText}>Reprovar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#002963', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002963', 
    padding: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    left: 120
  },
  container: {
    flex: 1,
    padding: 16,
  },
  notification: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  notificationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#333',
  },
  message: {
    color: '#666',
    fontSize: 14,
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  approve: {
    backgroundColor: '#3275a8',
  },
  reject: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

// Função auxiliar
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aprovado':
      return '#4CAF50';
    case 'Reprovado':
      return '#F44336';
    default:
      return '#FFA500';
  }
};

export default NotificationScreen;
