import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import FavoritesScreen from './screens/FavoriteScreen'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#6200ee' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Products" component={ProductScreen} options={{ title: 'Товары' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Корзина' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Избранное' }} />
    </Stack.Navigator>
  );
}
