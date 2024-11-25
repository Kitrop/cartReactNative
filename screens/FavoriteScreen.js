import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { getData } from '../utils/storage';

export default function FavoritesScreen({ route }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getData('favorites');
      if (storedFavorites) setFavorites(storedFavorites);
    };
    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
