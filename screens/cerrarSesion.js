import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const CerrarSesion = ({ navigation }) => {
  // Definir la función antes de su uso
  const cerrarSesion = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // Reemplaza la pantalla actual con la pantalla de inicio de sesión
      navigation.replace('InicioSesion');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  // Usar la función en el efecto
  useEffect(() => {
    cerrarSesion();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Cerrando sesión...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CerrarSesion;
