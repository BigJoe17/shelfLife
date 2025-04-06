import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

type FoodItem = {
  id: string;
  title: string;
  description: string;
  expiryDate: Date;
  location: string;
  donor: {
    name: string;
    rating: number;
  };
};

const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    description: 'Assorted fresh vegetables from local farm',
    expiryDate: new Date(Date.now() + 86400000), // Tomorrow
    location: 'Downtown',
    donor: {
      name: 'Local Farm Co.',
      rating: 4.8,
    },
  },
  // Add more mock items as needed
];

export default function HomeScreen() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const renderItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      className={`p-4 mb-2 rounded-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}
    >
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
        <Text className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Expires: {item.expiryDate.toLocaleDateString()}
        </Text>
        <Text className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {item.location}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className={`flex-1 p-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <Text className={`text-2xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Available Food Items
      </Text>
      <FlatList
        data={mockFoodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
} 