import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Total({ cartItems, discountRate }) {
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = cartTotal * (1 - discountRate);

  return (
    <View style={styles.summary}>
      <Text style={styles.text}>Subtotal: <Text style={styles.amount}>${cartTotal.toFixed(2)}</Text></Text>
      <Text style={styles.text}>Discount: <Text style={styles.discount}>{(discountRate * 100).toFixed(0)}%</Text></Text>
      <Text style={styles.total}>Total: <Text style={styles.amount}>${finalTotal.toFixed(2)}</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    padding: 20,
    backgroundColor: '#2e2f3e', // Slightly darkened shade for modern look
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#555',
    elevation: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#e0e0e0',
    marginBottom: 6,
  },
  amount: {
    fontWeight: '700',
    color: '#fff',
  },
  discount: {
    color: '#ff4081',
    fontWeight: '600',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa726',
    marginTop: 10,
  },
});
