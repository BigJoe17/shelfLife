import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  const spiralAnim = new Animated.Value(0);

  useEffect(() => {
    // Spiral animation
    Animated.loop(
      Animated.timing(spiralAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navigate to auth screen after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const spin = spiralAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = spiralAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spiral,
          {
            transform: [
              { rotate: spin },
              { scale },
            ],
          },
        ]}
      >
        <View style={styles.spiralLine} />
      </Animated.View>
      <Text style={styles.title}>ShelfLife</Text>
      <Text style={styles.subtitle}>Reducing Food Waste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EDF2F4',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#8D99AE',
  },
  spiral: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spiralLine: {
    width: 2,
    height: 200,
    backgroundColor: '#EF233C',
    transform: [{ rotate: '45deg' }],
  },
}); 