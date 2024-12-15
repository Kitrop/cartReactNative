import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, Alert } from 'react-native';
import { getOrders, deleteOrder } from '../services/orderService';

export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      Alert.alert('Success', 'Order deleted.');
      fetchOrders();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete order.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.description}</Text>
            <Text>{new Date(item.created_at).toLocaleString()}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteOrder(item.id)}
              color="#ff4081"
            />
          </View>
        )}
      />
      <Button title="Back" onPress={() => navigation.goBack()} color="#757575" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
})