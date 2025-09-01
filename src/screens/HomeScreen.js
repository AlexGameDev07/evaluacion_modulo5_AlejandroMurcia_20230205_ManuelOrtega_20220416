import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig';
import { useUserData } from '../hooks/useUserData';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [userData, fetchUserData] = useUserData(auth, db);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.replace('Login');
      }
    });
    return () => unsub();
  }, [navigation]);

  useEffect(() => {
    if (isFocused) fetchUserData();
  }, [isFocused, fetchUserData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460', '#ffd700']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.centered}>
        <View style={styles.glass}>
          <Text style={styles.title}>Bienvenido, {userData.name}</Text>
          <Text style={styles.subtitle}>¡Has iniciado sesión!</Text>
          <Text style={styles.subtitle}>Correo: {userData.email}</Text>
          <Text style={styles.subtitle}>Edad: {userData.age || 'No especificada'}</Text>
          <Text style={styles.subtitle}>Especialidad: {userData.specialty || 'No especificada'}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile', { userData })}
          >
            <Text style={styles.buttonText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#888', marginTop: 10 }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#0f3460',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 16,
    marginBottom: 18,
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 18,
    fontStyle: 'italic',
    opacity: 0.85,
    textShadowColor: '#ffd700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  buttonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
