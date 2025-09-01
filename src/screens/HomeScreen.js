import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import { auth, db } from '../../firebaseConfig';
import { useUserData } from '../hooks/useUserData';

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
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido, {userData.name}</Text>
      <Text>Correo: {userData.email}</Text>
      <Text>Edad: {userData.age || 'No especificada'}</Text>
      <Text>Especialidad: {userData.specialty || 'No especificada'}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('EditProfile', { userData })}
      >
        <Text style={{ color: '#fff' }}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#888', marginTop: 10 }]}
        onPress={handleLogout}
      >
        <Text style={{ color: '#fff' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  welcome: { fontSize: 22, marginBottom: 12 },
  btn: {
    backgroundColor: '#0066cc',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
});
