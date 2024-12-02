import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProductCard from '../components/ProductCard'

export default function ProductScreen({ navigation }) {
	const [products] = useState([
		{ id: '1', name: 'Product 1', description: 'Description 1', price: 100 },
		{ id: '2', name: 'Product 2', description: 'Description 2', price: 150 },
	])

	const [cart, setCart] = useState([])
	const [favorites, setFavorites] = useState([])

	useEffect(() => {
		async function loadData() {
			try {
				const savedCart = await AsyncStorage.getItem('cart')
				const savedFavorites = await AsyncStorage.getItem('favorites')
				if (savedCart) setCart(JSON.parse(savedCart))
				if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
			} catch (error) {
				console.error('Ошибка загрузки данных', error)
			}
		}
		loadData()
	}, [])

	const saveData = async (key, data) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(data))
		} catch (error) {
			console.error(`Ошибка сохранения ${key}`, error)
		}
	}

	useEffect(() => {
		async function saveCart() {
			try {
				await AsyncStorage.setItem('cart', JSON.stringify(cart))
			} catch (error) {
				console.error('Ошибка загрузки корзины: ', error)
			}
		}
		saveCart()
	}, [cart])

	useEffect(() => {
		async function saveFavorites() {
			try {
				await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
			} catch (error) {
				console.error('Ошибка загрузки избранного: ', error)
			}
		}
		saveFavorites()
	}, [favorites])

	const addToCart = product => {
		setCart(prev => {
			const existingItem = prev.find(item => item.id === product.id)
			if (existingItem) {
				return prev.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			} else {
				return [...prev, { ...product, quantity: 1 }]
			}
		})
	}

	useEffect(() => {
		saveData('cart', cart)
	}, [cart])

	useEffect(() => {
		saveData('favorites', favorites)
	}, [favorites])

	const toggleFavorite = product => {
		if (!product.id) {
			console.error('Товар должен иметь id')
			return
		}

		const isFavorite = favorites.some(item => item.id === product.id)
		if (isFavorite) {
			setFavorites(prev => prev.filter(item => item.id !== product.id))
		} else {
			setFavorites(prev => [...prev, product])
		}
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<ProductCard
						product={item}
						addToCart={addToCart}
						toggleFavorite={toggleFavorite}
					/>
				)}
			/>
			<View style={styles.navButtons}>
				<Button
					title='Go to Cart'
					onPress={() => navigation.navigate('Cart', { cart })}
				/>
				<Button
					title='Go to Favorites'
					onPress={() => navigation.navigate('Favorites', { favorites })}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	navButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16,
	},
})
