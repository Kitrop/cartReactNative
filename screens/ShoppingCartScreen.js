import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createOrder } from '../services/orderService';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const PROMO_CODES = {
  DISCOUNT10: 0.1,
  SAVE20: 0.2,
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
              <TouchableOpacity
                style={[styles.button, styles.increaseButton]}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.decreaseButton]}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
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
        <TouchableOpacity style={styles.applyButton} onPress={applyPromoCode}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>
        Total: ${getTotalPrice().toFixed(2)}{' '}
        {discount > 0 && `(Discount: ${discount * 100}%)`}
      </Text>

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
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>{selectedDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
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

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Place Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 16,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666666',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  increaseButton: {
    backgroundColor: '#6200EE',
  },
  decreaseButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
  },
  dateSection: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  webDatePicker: {
    border: '1px solid #CCCCCC',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  dateButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mapSection: {
    marginVertical: 20,
  },
  checkoutButton: {
    backgroundColor: '#03A9F4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    backgroundColor: '#757575',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
