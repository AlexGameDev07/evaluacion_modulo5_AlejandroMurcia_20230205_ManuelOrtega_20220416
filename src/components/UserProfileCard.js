//hecho por manuel ortega
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfileCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.placeholder}>__________</Text>

      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.placeholder}>__________</Text>

      <Text style={styles.label}>Contraseña:</Text>
      <Text style={styles.placeholder}>__________</Text>

      <Text style={styles.label}>Edad:</Text>
      <Text style={styles.placeholder}>__________</Text>

      <Text style={styles.label}>Especialidad:</Text>
      <Text style={styles.placeholder}>__________</Text>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  placeholder: {
    fontSize: 18,
    color: '#ccc',
    fontStyle: 'italic',
  },
});
