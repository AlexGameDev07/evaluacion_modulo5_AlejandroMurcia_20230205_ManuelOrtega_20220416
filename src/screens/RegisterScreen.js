import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';


export default function RegisterScreen({ navigation }) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [age, setAge] = useState('');
const [specialty, setSpecialty] = useState('');


const handleRegister = async () => {
if (!name || !email || !password) return Alert.alert('Error', 'Completa los campos');
try {
const userCred = await createUserWithEmailAndPassword(auth, email, password);
const uid = userCred.user.uid;
// Guardar datos en Firestore
await setDoc(doc(db, 'users', uid), {
name,
email,
age: age || null,
specialty: specialty || null,
createdAt: new Date().toISOString(),
});
navigation.replace('Home');
} catch (error) {
Alert.alert('Error', error.message);
}
};


return (
<View style={styles.container}>
<Text style={styles.title}>Registro</Text>
<TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
<TextInput placeholder="Correo" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
<TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
<TextInput placeholder="Edad" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
<TextInput placeholder="Especialidad" value={specialty} onChangeText={setSpecialty} style={styles.input} />
<TouchableOpacity style={styles.btn} onPress={handleRegister}><Text style={{color:'#fff'}}>Registrar</Text></TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('Login')} style={{marginTop:12}}>
<Text>¿Ya tienes cuenta? Inicia sesión</Text>
</TouchableOpacity>
</View>
);
}


const styles = StyleSheet.create({
container: { flex:1, padding:20, justifyContent:'center' },
title:{ fontSize:26, marginBottom:20, textAlign:'center' },
input:{ borderWidth:1, padding:10, marginBottom:12, borderRadius:6 },
btn:{ backgroundColor:'#0066cc', padding:12, alignItems:'center', borderRadius:6 }
});