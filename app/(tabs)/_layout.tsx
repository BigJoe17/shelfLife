import { Tabs } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';

type TabBarIconProps = {
  color: string;
  size: number;
};

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
        tabBarInactiveTintColor: isDarkMode ? '#666' : '#999',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
          borderTopColor: isDarkMode ? '#333' : '#ddd',
        },
        headerStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        headerTintColor: isDarkMode ? '#fff' : '#000',
      }}
    >
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <FontAwesome name="shopping-basket" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <FontAwesome name="barcode" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="impact"
        options={{
          title: 'Impact',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <FontAwesome name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 