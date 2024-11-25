import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
