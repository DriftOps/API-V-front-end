import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, Alert } from 'react-native';

// Tipo para a notificação
interface Notification {
  id: number;
  userName: string;
  userImage: string;
  status: string;
}

const NotificationScreen: React.FC = () => {
  // Lista de notificações simuladas
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

  // Função para aprovar reembolso
  const approveRefund = (id: number) => {
    setNotifications((prevState) =>
      prevState.map((notification) =>
        notification.id === id
          ? { ...notification, status: 'Aprovado' }
          : notification
      )
    );
    Alert.alert('Sucesso', `Reembolso ${id} aprovado!`);
  };

  // Função para reprovar reembolso
  const rejectRefund = (id: number) => {
    setNotifications((prevState) =>
      prevState.map((notification) =>
        notification.id === id
          ? { ...notification, status: 'Reprovado' }
          : notification
      )
    );
    Alert.alert('Sucesso', `Reembolso ${id} reprovado!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações de Reembolso</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Image source={{ uri: item.userImage }} style={styles.profilePic} />
            <View style={styles.notificationInfo}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.message}>Solicitou um reembolso</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
              <View style={styles.actions}>
                <Button title="Aprovar" onPress={() => approveRefund(item.id)} />
                <Button title="Reprovar" onPress={() => rejectRefund(item.id)} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notification: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#555',
  },
  status: {
    marginVertical: 8,
    fontStyle: 'italic',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default NotificationScreen;
