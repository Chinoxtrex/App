import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditarPerfil = ({ navigation }) => {
  // Datos para la lista de opciones
  const opciones = [
    { id: '1', texto: 'Billetera', icono: 'money', pantalla: 'Pantalla1' },
    { id: '2', texto: 'Información de la cuenta', icono: 'info-circle', pantalla: 'Pantalla2' },
    { id: '3', texto: 'Privacidad', icono: 'user-secret', pantalla: 'Pantalla3' },
    { id: '4', texto: 'Seguridad', icono: 'shield', pantalla: 'Pantalla4' },
    { id: '5', texto: 'Registro de actividad', icono: 'history', pantalla: 'Pantalla5' },
    { id: '6', texto: 'Idioma', icono: 'language', pantalla: 'Pantalla6' },
    { id: '7', texto: 'Requisitos de monetización', icono: 'check', pantalla: 'Pantalla7' },
    { id: '8', texto: 'Estado de cuenta', icono: 'list', pantalla: 'Pantalla8' },
    { id: '9', texto: 'Modo de vista', icono: 'eye', pantalla: 'Pantalla9' },
    { id: '10', texto: 'Estadísticas', icono: 'bar-chart', pantalla: 'Pantalla10' },
    { id: '11', texto: 'Ayuda', icono: 'question-circle', pantalla: 'Pantalla11' },
    { id: '12', texto: 'Términos y condiciones', icono: 'book', pantalla: 'Pantalla12' },
    { id: '13', texto: 'Cerrar sesión', icono: 'sign-out', pantalla: 'Pantalla13' },
  ];

  const usuario = {
    nombre: 'Alexis',
    fotoPerfil: 'https://static.wikia.nocookie.net/los-simpsom/images/4/4a/Homero-simpson-2.jpg/revision/latest?cb=20130413015655&path-prefix=es', // Puedes usar la URL de la imagen o importarla localmente
    saldo: '$10000.00', // Supongamos que el saldo es de $100.00
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.opcionContainer} onPress={() => navigation.navigate(item.pantalla)}>
      <Icon name={item.icono} size={20} color="#000" style={styles.icono} />
      <Text style={styles.opcionTexto}>{item.texto}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.saldoContainer}>
        
        
        <Icon name="money" size={20} color="#000" style={styles.saldoIcono} />
        <Text style={styles.saldoValor}>{usuario.saldo}</Text>
      </View>
      {/* Sección de foto de perfil */}
      <View style={styles.perfilContainer}>
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.fotoPerfil} />
        <Text style={styles.nombreUsuario}>{usuario.nombre}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
          <Text style={styles.editarPerfilTexto}>(Editar Perfil)</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de opciones */}
      {opciones.map((item) => renderItem({ item }))}

      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  perfilContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  opcionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
  },
  icono: {
    marginRight: 10,
  },
  opcionTexto: {
    fontSize: 16,
  },
  saldoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10, 
    right: 5,
  },
  saldoTexto: {
    fontSize: 16,
    marginRight: 5,
  },
  saldoIcono: {
    marginRight: 5,
  },
  saldoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editarPerfilTexto: {
    fontSize: 14,
    color: 'blue', 
  },
});

export default EditarPerfil;