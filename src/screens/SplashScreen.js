import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthListener } from '../hooks/useAuthListener';
import { auth } from '../../firebaseConfig';

export default function SplashScreen({ navigation }) {
  useAuthListener(auth, (user) => {
    setTimeout(() => {
      if (user) navigation.replace('Home');
      else navigation.replace('Login');
    }, 1200);
  });

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460', '#ffd700']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.centered}>
        <View style={styles.glass}>
          <Image
            source={require('../../assets/splash-icon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>¡Bienvenido a la App!</Text>
          <Text style={styles.subtitle}>Evaluación Módulo 5</Text>
          <ActivityIndicator size="large" color="#ffd700" style={{ marginTop: 30 }} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  glass: {
    width: 340,
    padding: 36,
    borderRadius: 36,
    backgroundColor: 'rgba(30,30,40,0.65)',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffd700',
    // backdropFilter solo funciona en web, pero da idea de glass
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 28,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ffd700',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 16,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#0f3460',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 16,
    marginBottom: 12,
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 12,
    fontStyle: 'italic',
    opacity: 0.85,
    textShadowColor: '#ffd700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
});