import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';

type FoodItem = {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  expiryDate: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  quantity: number;
};

export default function ScanScreen() {
  const { isDarkMode } = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    try {
      const mockFoodData = {
        barcode: data,
        name: 'Sample Food Item',
        brand: 'Sample Brand',
        category: 'Dairy',
        expiryDate: new Date(Date.now() + 86400000 * 7),
        location: location ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        } : undefined,
        quantity: 1,
      };

      setFoodItem(mockFoodData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch food details');
    }
  };

  const handleAddQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (hasPermission === null) {
    return (
      <View className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#EDF2F4]'}`}>
        <Text className={`text-base ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#EDF2F4]'}`}>
        <Text className={`text-base ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
          No access to camera
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#EDF2F4]'}`}>
      {!scanned ? (
        <View className="flex-1">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />
        </View>
      ) : (
        <View className="flex-1 p-5 justify-center">
          {foodItem && (
            <>
              <View className="mb-8">
                <Text className={`text-2xl font-bold mb-2.5 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                  {foodItem.name}
                </Text>
                <Text className={`text-base mb-1 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                  Brand: {foodItem.brand}
                </Text>
                <Text className={`text-base mb-1 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                  Category: {foodItem.category}
                </Text>
                <Text className={`text-base mb-1 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                  Expiry Date: {foodItem.expiryDate.toLocaleDateString()}
                </Text>
                {foodItem.location && (
                  <Text className={`text-base mb-1 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                    Location: {foodItem.location.latitude.toFixed(4)}, {foodItem.location.longitude.toFixed(4)}
                  </Text>
                )}
              </View>

              <View className="mb-8">
                <Text className={`text-lg mb-2.5 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                  Quantity:
                </Text>
                <View className="flex-row items-center justify-center">
                  <TouchableOpacity
                    className={`w-10 h-10 rounded-full items-center justify-center mx-2.5 ${isDarkMode ? 'bg-[#2B2D42]' : 'bg-[#8D99AE]'}`}
                    onPress={handleSubtractQuantity}
                  >
                    <FontAwesome name="minus" size={20} color={isDarkMode ? '#EDF2F4' : '#2B2D42'} />
                  </TouchableOpacity>
                  <Text className={`text-2xl mx-5 ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    className={`w-10 h-10 rounded-full items-center justify-center mx-2.5 ${isDarkMode ? 'bg-[#2B2D42]' : 'bg-[#8D99AE]'}`}
                    onPress={handleAddQuantity}
                  >
                    <FontAwesome name="plus" size={20} color={isDarkMode ? '#EDF2F4' : '#2B2D42'} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className={`bg-[#EF233C] p-4 rounded-lg items-center`}
                onPress={() => {
                  setScanned(false);
                  setFoodItem(null);
                  setQuantity(1);
                }}
              >
                <Text className="text-[#EDF2F4] text-base font-bold">
                  Add to Donation
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {scanned && (
        <TouchableOpacity
          className={`absolute bottom-5 left-5 right-5 ${isDarkMode ? 'bg-[#2B2D42]' : 'bg-[#8D99AE]'} p-4 rounded-lg items-center`}
          onPress={() => {
            setScanned(false);
            setFoodItem(null);
            setQuantity(1);
          }}
        >
          <Text className={`text-base font-bold ${isDarkMode ? 'text-[#EDF2F4]' : 'text-[#2B2D42]'}`}>
            Scan Again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
} 