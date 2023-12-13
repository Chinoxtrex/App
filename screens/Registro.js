import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebaseConfig';

const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firestore = getFirestore(firebaseApp);

  const handleRegistro = async () => {
    const auth = getAuth(firebaseApp);

    try {
      // Registrar usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Guardar datos del usuario en Firestore
      await addDoc(collection(firestore, 'usuarios'), {
        userId,
        nombre,
        apellido,
        numero,
        email,
      });

      console.log('Usuario registrado con éxito');

      // Después de un registro exitoso, navega al HomeScreen pasando solo el userId
      navigation.navigate('Home', { screen: 'Perfil', params: { userId } });
    } catch (error) {
      console.error('Error al registrar el usuario', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={(text) => setApellido(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Número"
        value={numero}
        onChangeText={(text) => setNumero(text)}
        style={styles.input}
      />
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
      <Button title="Registrar" onPress={handleRegistro} />

      <Text style={styles.loginText}>
        ¿Ya tienes una cuenta?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('InicioSesion')}
        >
          Inicia sesión
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  loginText: {
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
  },
});

export default Registro;
