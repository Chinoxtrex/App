import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Billetera = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a tu Billetera</Text>
      {/* Puedes agregar más contenido aquí */}
      <Button
        title="Volver a la pantalla principal"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Agrega más estilos según sea necesario
});

export default Billetera;
