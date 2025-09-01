import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default function EditProfileScreen({ navigation, route }) {
  const currentUser = auth.currentUser;
  const uid = currentUser.uid;

  // datos iniciales que vienen desde Home
  const [name, setName] = useState(route.params?.userData?.name || '');
  const [age, setAge] = useState(route.params?.userData?.age || '');
  const [specialty, setSpecialty] = useState(route.params?.userData?.specialty || '');

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        name,
        age,
        specialty,
      });
      Alert.alert('Éxito', 'Perfil actualizado');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460', '#ffd700']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.centered}>
        <View style={styles.glass}>
          <Text style={styles.title}>Editar perfil</Text>
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#ffd700"
          />
          <TextInput
            placeholder="Edad"
            value={String(age)}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#ffd700"
          />
          <TextInput
            placeholder="Especialidad"
            value={specialty}
            onChangeText={setSpecialty}
            style={styles.input}
            placeholderTextColor="#ffd700"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffd700',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    color: '#fff',
    backgroundColor: 'rgba(20,20,30,0.45)',
    fontSize: 16,
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
