import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Navtab from '@/components/Navtab';


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
      userName: 'Usuário1',
      userImage: 'https://example.com/profile1.jpg',
      status: 'Pendente',
    },
    {
      id: 2,
      userName: 'Usuário2',
      userImage: 'https://example.com/profile2.jpg',
      status: 'Pendente',
    },
    {
      id: 3,
      userName: 'Usuário3',
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
    Alert.alert('Sucesso', `Reembolso ${id} aprovado!`);
  };

  const rejectRefund = (id: number) => {
    setNotifications((prevState) =>
      prevState.map((notification) =>
        notification.id === id ? { ...notification, status: 'Reprovado' } : notification
      )
    );
    Alert.alert('Sucesso', `Reembolso ${id} reprovado!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return '#4CAF50'; // Verde
      case 'Reprovado':
        return '#F44336'; // Vermelho
      default:
        return '#FFA500'; // Laranja (pendente)
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Notificações de Reembolso</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NotificationItem item={item} approveRefund={approveRefund} rejectRefund={rejectRefund} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
      <Navtab />
    </View>
  );
};

// Componente separado para a notificação individual
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
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#002b64',
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
    backgroundColor: '#4CAF50',
  },
  reject: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotificationScreen;

// Função auxiliar fora do componente (opcionalmente você pode mover para utils se quiser)
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aprovado':
      return '#4CAF50'; // Verde
    case 'Reprovado':
      return '#F44336'; // Vermelho
    default:
      return '#FFA500'; // Laranja
  }
};
