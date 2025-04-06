import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();

  if (!user) {
    return (
      <View className={`flex-1 p-4 items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <Text className={`text-lg ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Please log in to view your profile
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className={`flex-1 p-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <View className="items-center mb-6">
        <View className={`w-24 h-24 rounded-full ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
        } items-center justify-center mb-4`}>
          <FontAwesome
            name="user"
            size={40}
            color={isDarkMode ? '#fff' : '#666'}
          />
        </View>
        <Text className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {user.name}
        </Text>
        <Text className={`text-lg ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {user.email}
        </Text>
        <Text className={`text-sm ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Text>
      </View>

      <View className="space-y-4">
        <View className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Text className={`text-lg font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Account Information
          </Text>
          {user.phoneNumber && (
            <Text className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Phone: {user.phoneNumber}
            </Text>
          )}
          {user.address && (
            <Text className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Address: {user.address}
            </Text>
          )}
        </View>

        <View className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <Text className={`text-lg font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Activity History
          </Text>
          <Text className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            No recent activity
          </Text>
        </View>

        <TouchableOpacity
          className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-red-600' : 'bg-red-500'
          }`}
          onPress={logout}
        >
          <Text className="text-white text-center font-bold">
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} 