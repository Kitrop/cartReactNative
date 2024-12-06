import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ShoppingCartItem({ item, updateCartItemQuantity, removeItemFromCart }) {
  const increaseQuantity = () => updateCartItemQuantity(item.id, 'increase');
  const decreaseQuantity = () => updateCartItemQuantity(item.id, 'decrease');

  return (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Button title="+" onPress={increaseQuantity} />
      <Button title="-" onPress={decreaseQuantity} />
      <Button title="Remove" onPress={() => removeItemFromCart(item.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    backgroundColor: '#27273a', // Глубокий серый
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  buttonStyle: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
  },
});
