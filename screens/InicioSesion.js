// InicioSesion.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';

const InicioSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInicioSesion = async () => {
    const auth = getAuth(firebaseApp);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      navigation.navigate('Home', { screen: 'Perfil', params: { nombre, apellido, numero } });
    } catch (error) {
      console.error('Error al iniciar sesión', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Inicio de Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button title="Iniciar Sesión" onPress={handleInicioSesion} />

      <Text style={styles.registerText}>
        ¿No tienes una cuenta?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate('Registro')}
        >
          Regístrate
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  registerText: {
    marginTop: 20,
  },
  registerLink: {
    color: 'blue',
  },
});

export default InicioSesion;
