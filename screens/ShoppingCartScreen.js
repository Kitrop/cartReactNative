import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createOrder } from '../services/orderService';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const PROMO_CODES = {
  "DISCOUNT10": 0.1,
  "SAVE20": 0.2,
};

export default function ShoppingCartScreen({ route, navigation }) {
  const { shoppingCart } = route.params || [];
  const [cartItems, setCartItems] = useState(shoppingCart);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState([55.751244, 37.618423]);

  const updateQuantity = (productId, change) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * (1 - discount);

  const handleCheckout = async () => {
    try {
      const order = {
        description: cartItems.map((item) => `${item.name} (x${item.quantity})`).join(', '),
        deliveryDate: selectedDate.toISOString(),
        deliveryLocation,
      };
      const result = await createOrder(order);
      Alert.alert('Order Created', `Your order ID: ${result.order_id}`);
      setCartItems([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create order.');
    }
  };

  const applyPromoCode = () => {
    if (PROMO_CODES[promoCode]) {
      setDiscount(PROMO_CODES[promoCode]);
      Alert.alert('Success', `Promo code applied! Discount: ${PROMO_CODES[promoCode] * 100}%`);
    } else {
      Alert.alert('Error', 'Invalid promo code.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.quantity}>Qty: {item.quantity}</Text>
            <View style={styles.actions}>
              <Button title="+" onPress={() => updateQuantity(item.id, 1)} color="#4caf50" />
              <Button title="-" onPress={() => updateQuantity(item.id, -1)} color="#ff4081" />
            </View>
          </View>
        )}
      />
      <View style={styles.promoSection}>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter promo code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <Button title="Apply" onPress={applyPromoCode} color="#4caf50" />
      </View>
      <Text style={styles.total}>
        Total: ${getTotalPrice().toFixed(2)} {discount > 0 && `(Discount: ${discount * 100}%)`}
      </Text>
            {/* Выбор даты */}
            <View style={styles.dateSection}>
        <Text style={styles.label}>Select Delivery Date:</Text>
        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e.target.value)}
            style={styles.webDatePicker}
          />
        ) : (
          <>
            <Button
              title={selectedDate.toLocaleDateString()}
              onPress={() => setShowDatePicker(true)}
              color="#6200ee"
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setSelectedDate(date);
                }}
              />
            )}
          </>
        )}
      </View>

      {/* Интеграция с Yandex.Maps */}
      <View style={styles.mapSection}>
        <Text style={styles.label}>Select Delivery Location:</Text>
        <YMaps>
          <Map
            defaultState={{ center: deliveryLocation, zoom: 10 }}
            width="100%"
            height={200}
            onClick={(e) => setDeliveryLocation(e.get('coords'))}
          >
            <Placemark geometry={deliveryLocation} />
          </Map>
        </YMaps>
      </View>

      <Button title="Place Order" onPress={handleCheckout} color="#4caf50" />
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
  cartItem: {
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
  price: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  dateSection: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  webDatePicker: {
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  mapSection: {
    marginVertical: 20,
  },
});