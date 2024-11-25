import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CartItem({ item, setCartItems }) {
  const updateQuantity = (operation) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity:
                operation === 'increase'
                  ? cartItem.quantity + 1
                  : Math.max(cartItem.quantity - 1, 1),
            }
          : cartItem
      )
    );
  };

  const removeItem = () => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
  };

  return (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Button title="+" onPress={() => updateQuantity('increase')} />
      <Button title="-" onPress={() => updateQuantity('decrease')} />
      <Button title="Remove" onPress={removeItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: { marginBottom: 16 },
});
