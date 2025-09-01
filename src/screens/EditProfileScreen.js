import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={String(age)}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Especialidad"
        value={specialty}
        onChangeText={setSpecialty}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#999', marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#0066cc',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
