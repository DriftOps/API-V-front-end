import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Reembolso {
  data: string;
  valor: string;
  km: string;
  estabelecimento: string;
  tipo: string;
  descricao: string;
}

interface Props {
  item: Reembolso;
  index: number;
}

const ReembolsoItem: React.FC<Props> = ({ item, index }) => {
  return (
    <View style={styles.previewItem}>
      <Text style={styles.previewText}>
        #{index + 1} • {item.data} • R${item.valor} • {item.km}km • {item.estabelecimento}
      </Text>
      <Text style={[styles.previewText, { fontSize: 12 }]}>
        Tipo: {item.tipo} | {item.descricao}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  previewItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReembolsoItem;
