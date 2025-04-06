import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function DonateScreen() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    expiryDate: '',
    location: '',
    quantity: '',
  });

  const handleSubmit = () => {
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  if (!user) {
    return (
      <View className={`flex-1 p-4 items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <Text className={`text-lg ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Please log in to donate food items
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className={`flex-1 p-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <Text className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Donate Food
      </Text>

      <View className="space-y-4">
        <View>
          <Text className={`mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Title
          </Text>
          <TextInput
            className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            placeholder="Enter food item title"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </View>

        <View>
          <Text className={`mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Description
          </Text>
          <TextInput
            className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            placeholder="Describe the food item"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>

        <View>
          <Text className={`mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Expiry Date
          </Text>
          <TextInput
            className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
          />
        </View>

        <View>
          <Text className={`mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Location
          </Text>
          <TextInput
            className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            placeholder="Enter pickup location"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
          />
        </View>

        <View>
          <Text className={`mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Quantity
          </Text>
          <TextInput
            className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            placeholder="Enter quantity"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
            keyboardType="numeric"
            value={formData.quantity}
            onChangeText={(text) => setFormData({ ...formData, quantity: text })}
          />
        </View>

        <TouchableOpacity
          className={`p-4 rounded-lg mt-6 ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold">
            List for Donation
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} 