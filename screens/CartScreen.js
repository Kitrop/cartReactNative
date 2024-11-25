import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

export default function CartScreen({ route }) {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    async function loadCart() {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const applyPromoCode = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const addItem = (product) => {
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  useEffect(() => {
    if (route.params?.product) {
      addItem(route.params.product);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem item={item} setCartItems={setCartItems} />
        )}
      />
      <CartSummary cartItems={cartItems} discount={discount} />
      <TextInput
        style={styles.input}
        placeholder="Enter promo code"
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <Button title="Apply Promo Code" onPress={applyPromoCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, marginVertical: 10, padding: 8 },
});
