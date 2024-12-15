import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WishListScreen({ navigation }) {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const loadWishList = async () => {
      try {
        const savedWishList = await AsyncStorage.getItem('wishList');
        if (savedWishList) setWishList(JSON.parse(savedWishList));
      } catch (error) {
        console.error('Failed to load wish list', error);
      }
    };

    loadWishList();
  }, []);

  const removeFromWishList = async (id) => {
    const updatedWishList = wishList.filter((item) => item.id !== id);
    setWishList(updatedWishList);

    try {
      await AsyncStorage.setItem('wishList', JSON.stringify(updatedWishList));
    } catch (error) {
      console.error('Failed to save updated wish list', error);
    }
  };

  return (
    <View style={styles.container}>
      {wishList.length > 0 ? (
        <FlatList
          data={wishList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.wishItem}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromWishList(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>Your wish list is empty!</Text>
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  wishItem: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#4caf50',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff4081',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
