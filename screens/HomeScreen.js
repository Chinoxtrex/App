import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a la Billetera"
        onPress={() => navigation.navigate('Billetera')}
      />

<Button
        title="Configuracion"
        onPress={() => navigation.navigate('Configuracion')}
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
});

export default HomeScreen;
