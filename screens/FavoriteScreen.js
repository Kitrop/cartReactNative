import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
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
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>Your wish list is empty!</Text>
      )}
      <Button title="Back" onPress={() => navigation.goBack()} color="#757575" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
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
  empty: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
