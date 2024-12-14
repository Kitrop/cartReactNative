import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
