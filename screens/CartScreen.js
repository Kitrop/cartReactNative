import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Button, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ route }) {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    async function loadCart() {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    }
    loadCart();
  }, []);

  useEffect(() => {
    async function saveCart() {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart', error);
      }
    }
    saveCart();
  }, [cartItems]);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return (total * (1 - discount)).toFixed(2);
  };

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(0.1);
      Alert.alert('Promo Code Applied', 'You received a 10% discount!');
    } else {
      setDiscount(0);
      Alert.alert('Invalid Promo Code', 'Please try again.');
    }
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Button
              title="Remove"
              onPress={() => removeItem(item.id)}
              color="#d9534f"
            />
          </View>
        )}
      />
      <View style={styles.promoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter promo code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <Button title="Apply Promo Code" onPress={applyPromoCode} />
      </View>
      <View style={styles.summary}>
        <Text style={styles.total}>Total: ${calculateTotal()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  promoContainer: { marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  summary: {
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});
