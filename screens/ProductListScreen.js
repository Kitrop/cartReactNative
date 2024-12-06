import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';

export default function ProductListScreen({ navigation }) {
  const [products] = useState([
    { id: '1', name: 'Смартфон', description: 'крутой телефон', price: 999, image: 'https://via.placeholder.com/150/0000FF' },
    { id: '2', name: 'Ноутбук', description: 'мощный ноутбук', price: 1999, image: 'https://via.placeholder.com/150/FF0000' },
    { id: '3', name: 'Мышка', description: 'просто мышка', price: 111, image: 'https://via.placeholder.com/150/EE3333' },
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

  useEffect(() => {
    const saveShoppingCart = async () => {
      try {
        await AsyncStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
      } catch (error) {
        console.error('Failed to save shopping cart', error);
      }
    };
    saveShoppingCart();
  }, [shoppingCart]);

  useEffect(() => {
    const saveWishList = async () => {
      try {
        await AsyncStorage.setItem('wishList', JSON.stringify(wishList));
      } catch (error) {
        console.error('Failed to save wish list', error);
      }
    };
    saveWishList();
  }, [wishList]);

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

  const toggleWishListItem = (product) => {
    const isWishListItem = wishList.some((item) => item.id === product.id);
    if (isWishListItem) {
      setWishList((prevWishList) => prevWishList.filter((item) => item.id !== product.id));
    } else {
      setWishList((prevWishList) => [...prevWishList, product]);
    }
  };

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
        <Button
          title="Cart"
          onPress={() => navigation.navigate('ShoppingCart', { shoppingCart })}
          color="#4caf50"
        />
        <Button
          title="Wishlist"
          onPress={() => navigation.navigate('WishList')}
          color="#ff4081"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
