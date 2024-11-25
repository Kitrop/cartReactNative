import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, addToCart, toggleFavorite }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>${product.price}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(product)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff9800' }]}
          onPress={() => toggleFavorite(product)}
        >
          <Text style={styles.buttonText}>Toggle Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  button: { backgroundColor: '#6200ee', padding: 8, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
});
