// Billetera.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Billetera = ({ route, navigation }) => {
  const [saldo, setSaldo] = useState(route.params?.nuevoSaldo || 0);

  useEffect(() => {
    if (route.params?.nuevoSaldo) {
      setSaldo(route.params.nuevoSaldo);
    }
  }, [route.params?.nuevoSaldo]);

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Actual:</Text>
        <Text style={styles.balanceAmount}>${saldo.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Recargar Saldo"
          onPress={() => navigation.navigate('RecargaSaldo', { saldoAnterior: saldo })}
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
