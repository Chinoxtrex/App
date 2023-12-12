import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Configuracion = ({ navigation }) => {
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
          {/* Sección de foto de portada */}
          <Image
            source={{ uri: 'data:image/jpeg;base64,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' }}
            style={styles.fotoPortada}
          />
          {/* Resto del contenido */}
          <View style={styles.saldoContainer}>
            <Icon name="money" size={20} color="#000" style={styles.saldoIcono} />
            <Text style={styles.saldoValor}>{usuario.saldo}</Text>
          </View>
          <View style={styles.perfilContainer}>
            <Image source={{ uri: usuario.fotoPerfil }} style={styles.fotoPerfil} />
            <Text style={styles.nombreUsuario}>{usuario.nombre}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Editarperfil')}>
              <Text style={styles.editarPerfilTexto}>(Editar Perfil)</Text>
            </TouchableOpacity>
          </View>
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
      fotoPortada: {
        width: '100%', // O ajusta según tus necesidades
        height: 200, // O ajusta según tus necesidades
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
      },
      perfilContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10, // Ajusta según tus necesidades
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
        color: '#000000', // Cambia el color según tu diseño
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Ajusta el color y la opacidad según tus necesidades
        padding: 5, // Ajusta según tus necesidades
        borderRadius: 15, // Ajusta según tus necesidades
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
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Ajusta el color y la opacidad según tus necesidades
        padding: 10, // Ajusta según tus necesidades
        borderRadius: 10, // Ajusta según tus necesidades
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
    
    export default Configuracion;