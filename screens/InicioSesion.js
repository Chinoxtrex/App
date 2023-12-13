// InicioSesion.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';

const InicioSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInicioSesion = async () => {
    const auth = getAuth(firebaseApp);

    try {
      // Inicia sesión
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Inicio de sesión exitoso');

      // Obtén la instancia de la base de datos
      const db = getFirestore(firebaseApp);

      // Realiza una consulta para obtener el documento que coincide con el userId del usuario
      const q = query(collection(db, 'usuarios'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      // Verifica si se encontraron resultados y navega a la pantalla de perfil
      if (querySnapshot.size > 0) {
        navigation.navigate('Home', { screen: 'Perfil', params: { userId: user.uid } });

      } else {
        console.log('No se encontraron datos para el usuario con el userId:', user.uid);
      }
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
