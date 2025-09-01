import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRegister } from '../hooks/useRegister';
import { auth, db } from '../../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');
  const register = useRegister(auth, db);

  const handleRegister = async () => {
    if (!name || !email || !password) return Alert.alert('Error', 'Completa los campos');
    try {
      await register({ name, email, password, age, specialty });
      navigation.replace('Home');
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
      <ScrollView contentContainerStyle={styles.centered}>
        <View style={styles.glass}>
          <Text style={styles.title}>Registro</Text>
          <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#ffd700" />
          <TextInput placeholder="Correo" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" placeholderTextColor="#ffd700" />
          <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholderTextColor="#ffd700" />
          <TextInput placeholder="Edad" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" placeholderTextColor="#ffd700" />
          <TextInput placeholder="Especialidad" value={specialty} onChangeText={setSpecialty} style={styles.input} placeholderTextColor="#ffd700" />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{marginTop:12}}>
            <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    flexGrow: 1,
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
  linkText: {
    color: '#ffd700',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: '#0f3460',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
});