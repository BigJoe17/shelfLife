import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';

type FoodItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  expiryDate: Date;
  location: string;
  distance: number;
  donor: {
    name: string;
    rating: number;
  };
  status: 'available' | 'claimed' | 'expired';
};

const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    description: 'Assorted fresh vegetables from local farm',
    image: 'https://placehold.co/600x400',
    expiryDate: new Date(Date.now() + 86400000),
    location: 'Downtown',
    distance: 1.2,
    donor: {
      name: 'Local Farm Co.',
      rating: 4.8,
    },
    status: 'available',
  },
  {
    id: '2',
    title: 'Bakery Items',
    description: 'Fresh bread, pastries, and cakes',
    image: 'https://placehold.co/600x400',
    expiryDate: new Date(Date.now() + 172800000),
    location: 'Westside',
    distance: 2.5,
    donor: {
      name: 'Sweet Treats Bakery',
      rating: 4.9,
    },
    status: 'available',
  },
  {
    id: '3',
    title: 'Fruits Basket',
    description: 'Seasonal fruits assortment',
    image: 'https://placehold.co/600x400',
    expiryDate: new Date(Date.now() + 259200000),
    location: 'Eastside',
    distance: 3.1,
    donor: {
      name: 'Fruit Paradise',
      rating: 4.7,
    },
    status: 'claimed',
  },
  {
    id: '4',
    title: 'Dairy Products',
    description: 'Milk, cheese, and yogurt',
    image: 'https://placehold.co/600x400',
    expiryDate: new Date(Date.now() + 432000000),
    location: 'Northside',
    distance: 4.2,
    donor: {
      name: 'Dairy Delight',
      rating: 4.6,
    },
    status: 'available',
  },
  {
    id: '5',
    title: 'Meat Package',
    description: 'Assorted fresh meats',
    image: 'https://placehold.co/600x400',
    expiryDate: new Date(Date.now() + 345600000),
    location: 'Southside',
    distance: 5.0,
    donor: {
      name: 'Meat Masters',
      rating: 4.5,
    },
    status: 'available',
  },
];

export default function MarketplaceScreen() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const renderItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      className={`p-4 mb-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-2xl shadow-lg`}
      activeOpacity={0.9}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24 rounded-xl"
        />
        <View className="flex-1 ml-4">
          <Text className={`text-lg font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {item.title}
          </Text>
          <Text className={`mt-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {item.description}
          </Text>
          <View className="flex-row justify-between mt-2">
            <View className="flex-row items-center">
              <FontAwesome
                name="map-marker"
                size={14}
                color={isDarkMode ? '#666' : '#999'}
              />
              <Text className={`ml-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.distance}km
              </Text>
            </View>
            <Text className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Expires: {item.expiryDate.toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-between mt-4">
        <View className="flex-row items-center">
          <FontAwesome
            name="user"
            size={14}
            color={isDarkMode ? '#666' : '#999'}
          />
          <Text className={`ml-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {item.donor.name}
          </Text>
        </View>
        <TouchableOpacity
          className={`px-4 py-2 rounded-xl ${
            item.status === 'available' ? 'bg-green-500' : 'bg-gray-500'
          }`}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">
            {item.status === 'available' ? 'Claim' : 'Claimed'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className={`flex-1 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <View className={`p-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <Text className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Marketplace
        </Text>
        <Text className={`mt-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Find and claim surplus food items
        </Text>
      </View>

      <View className="px-4 py-2">
        <View className="flex-row gap-3">
          {['all', 'nearby', 'expiring'].map((filter) => (
            <TouchableOpacity
              key={filter}
              className={`flex-1 px-4 py-3 rounded-xl ${
                selectedFilter === filter
                  ? isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                  : isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onPress={() => setSelectedFilter(filter)}
              activeOpacity={0.8}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedFilter === filter
                    ? 'text-white'
                    : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={mockFoodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      />

      <TouchableOpacity
        className={`absolute bottom-6 right-6 w-16 h-16 gap-3 rounded-full items-center justify-center ${
          isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
        } shadow-xl`}
        activeOpacity={0.8}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
} 