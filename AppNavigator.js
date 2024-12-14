import { createStackNavigator } from "@react-navigation/native/src/__stubs__/createStackNavigator"
import ProductListScreen from "./screens/ProductListScreen"
import ShoppingCartScreen from "./screens/ShoppingCartScreen"
import FavoritesScreen from "./screens/FavoriteScreen"
import OrderHistoryScreen from "./screens/OrderHistoryScreen"


const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: '#6200ee' }, headerTintColor: '#fff' }}
      id={'1'}>
      <Stack.Screen name="Products" component={ProductListScreen} options={{ title: 'Products' }} />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ title: 'Shopping Cart' }}
      />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="WishList" component={FavoritesScreen} options={{ title: 'Wish List' }} />
    </Stack.Navigator>
  )
}