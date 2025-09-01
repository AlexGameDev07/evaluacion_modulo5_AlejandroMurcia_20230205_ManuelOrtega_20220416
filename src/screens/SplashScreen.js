import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../firebaseConfig';
import { useAuthListener } from '../hooks/useAuthListener';

export default function SplashScreen({ navigation }) {
  useAuthListener(auth, (user) => {
    setTimeout(() => {
      if (user) navigation.replace('Home');
      else navigation.replace('Login');
    }, 1200);
  });

  return (
    <LinearGradient
      colors={['#0066cc', '#00c6ff', '#fff']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>¡Bienvenido a la App!</Text>
        <Text style={styles.subtitle}>Evaluación Módulo 5</Text>
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#0066cc',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 10,
    fontStyle: 'italic',
  },
});