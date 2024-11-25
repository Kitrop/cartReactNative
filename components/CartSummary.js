import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartSummary({ cartItems, discount }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountedTotal = total * (1 - discount);

  return (
    <View style={styles.summary}>
      <Text>Total: ${total.toFixed(2)}</Text>
      <Text>Discount: {discount * 100}%</Text>
      <Text>Final Total: ${discountedTotal.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { marginTop: 16, padding: 16, borderTopWidth: 1 },
});
