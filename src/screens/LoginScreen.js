import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../../firebaseConfig';
import { useLogin } from '../hooks/useLogin';

export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const login = useLogin(auth);


const handleLogin = async () => {
try {
await login({ email, password });
navigation.replace('Home');
} catch (error) {
Alert.alert('Error', error.message);
}
};


return (
<View style={styles.container}>
<Text style={styles.title}>Iniciar sesión</Text>
<TextInput placeholder="Correo" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
<TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
<TouchableOpacity style={styles.btn} onPress={handleLogin}><Text style={{color:'#fff'}}>Entrar</Text></TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('Register')} style={{marginTop:12}}>
<Text>¿No tienes cuenta? Regístrate</Text>
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