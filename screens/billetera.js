import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';

const Billetera = ({ route, navigation }) => {
  const [saldo, setSaldo] = useState(route.params?.nuevoSaldo || 0);

  useEffect(() => {
    if (route.params?.nuevoSaldo) {
      setSaldo(route.params.nuevoSaldo);
    }
  }, [route.params?.nuevoSaldo]);

  const recargarSaldo = async () => {
    try {
      // Obtén la instancia de autenticación y la base de datos
      const auth = getAuth(firebaseApp);
      const db = getFirestore(firebaseApp);

      // Obtén el ID del usuario actual
      const userId = auth.currentUser.uid;

      // Actualiza el saldo en Firestore
      const usuarioDocRef = doc(db, 'usuarios', userId);
      await updateDoc(usuarioDocRef, {
        saldoUsuario: saldo + 100, // Supongamos que se recargan $100
      });

      // Después de actualizar el saldo, navega a la pantalla de configuración
      navigation.navigate('Configuracion');
    } catch (error) {
      console.error('Error al recargar saldo', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Actual:</Text>
        <Text style={styles.balanceAmount}>${saldo.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Recargar Saldo"
          onPress={recargarSaldo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  balanceContainer: {
    marginRight: 20,
  },
  balanceLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
});

export default Billetera;
