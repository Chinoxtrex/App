// RecargaSaldo.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

const RecargaSaldo = ({ route, navigation }) => {
  const [creditCard, setCreditCard] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [amount, setAmount] = useState(0);
  const [saldoTotal, setSaldoTotal] = useState(route.params?.saldoAnterior || 0);

  useEffect(() => {
    setSaldoTotal(route.params?.saldoAnterior || 0);
  }, [route.params?.saldoAnterior]);

  const handleRecargarSaldo = () => {
    if (creditCard && amount > 0) {
      const saldoRecargado = amount;
      const nuevoSaldoTotal = saldoTotal + saldoRecargado;
      Alert.alert(`Saldo recargado: $${saldoRecargado.toFixed(2)}`);
      navigation.navigate('Billetera', { nuevoSaldo: nuevoSaldoTotal });
    } else {
      Alert.alert('Completa todos los campos antes de recargar el saldo.');
    }
  };

  const handleSelectAmount = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  const handleCustomAmountChange = (text) => {
    setCustomAmount(text);
    const customAmountNumber = parseFloat(text);
    setAmount(isNaN(customAmountNumber) ? 0 : customAmountNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recarga de Saldo</Text>

      <View style={styles.amountButtonsContainer}>
        <Button
          title="$25"
          onPress={() => handleSelectAmount(25)}
          style={styles.amountButton}
        />
        {/* ... Otros botones ... */}
        
      </View>
      <TextInput
        style={styles.input}
        placeholder="Monto personalizado"
        keyboardType="numeric"
        value={customAmount}
        onChangeText={handleCustomAmountChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        onChangeText={(text) => setCreditCard(text)}
      />

      <Text style={styles.saldoTotalLabel}>Saldo Total:</Text>
      <Text style={styles.saldoTotalAmount}>${saldoTotal.toFixed(2)}</Text>

    

      <Button title="Pagar" onPress={handleRecargarSaldo} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  amountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
  saldoTotalLabel: {
    fontSize: 18,
    marginTop: 10,
  },
  saldoTotalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default RecargaSaldo;
