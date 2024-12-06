import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Total({ cartItems, discountRate }) {
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = cartTotal * (1 - discountRate);

  return (
    <View style={styles.summary}>
      <Text>Subtotal: ${cartTotal.toFixed(2)}</Text>
      <Text>Discount: {discountRate * 100}%</Text>
      <Text>Total: ${finalTotal.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 20,
    backgroundColor: '#32324a', // Темный фон
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 6,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa726',
  },
});
