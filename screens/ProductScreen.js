import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function ProductScreen({ navigation }) {
  const [products] = useState([
    { id: '1', name: 'Product 1', description: 'Description 1', price: 100 },
    { id: '2', name: 'Product 2', description: 'Description 2', price: 150 },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price}</Text>
            <Button
              title="Add to Cart"
              onPress={() => navigation.navigate('Cart', { product: item })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  productCard: { marginBottom: 16 },
});
