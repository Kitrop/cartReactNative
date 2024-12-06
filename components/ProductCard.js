import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function ProductCard({ product, addToCart, toggleFavorite }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image || 'https://via.placeholder.com/150' }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <View style={styles.buttons}>
        <Button title="Add to Cart" onPress={() => addToCart(product)} color="#4caf50" />
        <Button title="♥" onPress={() => toggleFavorite(product)} color="#ff4081" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
