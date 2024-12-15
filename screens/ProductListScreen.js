import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

export default function ProductListScreen({ navigation }) {
  const [products] = useState([
    { id: '1', name: 'Смартфон', description: 'Крутой телефон', price: 999, image: 'https://i.imgur.com/GCU8drX.png' },
    { id: '2', name: 'Ноутбук', description: 'Мощный ноутбук', price: 1999, image: 'https://i.imgur.com/AsqgGap.png' },
    { id: '3', name: 'Мышка', description: 'Просто мышка', price: 111, image: 'https://i.imgur.com/BR5EyHG.png' },
  ]);

  const [shoppingCart, setShoppingCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const loadWishList = async () => {
    try {
      const savedWishList = await AsyncStorage.getItem('wishList');
      if (savedWishList) setWishList(JSON.parse(savedWishList));
    } catch (error) {
      console.error('Failed to load wish list', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWishList();
    }, [])
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('shoppingCart');
        if (savedCart) setShoppingCart(JSON.parse(savedCart));
        await loadWishList();
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadData();
  }, []);

  const addToShoppingCart = (product) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleWishListItem = async (product) => {
    let updatedWishList;
  
    if (wishList.some((item) => item.id === product.id)) {
      updatedWishList = wishList.filter((item) => item.id !== product.id);
    } else {
      updatedWishList = [...wishList, product];
    }
  
    setWishList(updatedWishList);
  
    try {
      await AsyncStorage.setItem('wishList', JSON.stringify(updatedWishList));
    } catch (error) {
      console.error('Failed to update wish list in storage', error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            addToCart={addToShoppingCart}
            toggleFavorite={toggleWishListItem}
          />
        )}
      />
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShoppingCart', { shoppingCart })}>
          <Text style={styles.buttonText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.buttonText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WishList')}>
          <Text style={styles.buttonText}>Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
