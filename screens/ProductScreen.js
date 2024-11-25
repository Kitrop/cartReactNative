import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import ProductCard from '../components/ProductCard'

export default function ProductScreen({ navigation }) {
  const [products] = useState([
    { id: '1', name: 'Product 1', description: 'Description 1', price: 100 },
    { id: '2', name: 'Product 2', description: 'Description 2', price: 150 },
  ])

  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
  }

  const addToFavorites = (product) => {
    setFavorites((prev) => [...prev, product])
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
          />
        )}
      />
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Cart', { cart })}>
          <Text style={styles.navButtonText}>Go to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Favorites', { favorites })}
        >
          <Text style={styles.navButtonText}>Go to Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  navButton: { backgroundColor: '#6200ee', padding: 10, borderRadius: 5 },
  navButtonText: { color: '#fff', textAlign: 'center' },
})
