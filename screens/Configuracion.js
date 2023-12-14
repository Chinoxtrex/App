import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';

const Configuracion = ({ navigation }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    fotoPerfil: '',
    saldo: '$0.00',
  });

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        // Obtén la instancia de la autenticación y la base de datos
        const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);

        // Obtén el ID del usuario actual
        const userId = auth.currentUser.uid;

        // Realiza una consulta para obtener el documento del usuario actual
        const q = query(collection(db, 'usuarios'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        // Verifica si se encontraron resultados y actualiza el estado
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const { nombre, fotoPerfil, saldoUsuario } = doc.data();
            setUsuario({
              nombre,
              fotoPerfil,
              saldo: `$${saldoUsuario.toFixed(2)}`,
            });
          });
        } else {
          console.log('No se encontraron datos para el usuario con el userId:', userId);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error.message);
      }
    };

    // Llama a la función para obtener los datos del usuario cuando el componente se monta
    obtenerDatosUsuario();
  }, []);

  const opciones = [
    { id: '1', texto: 'Billetera', icono: 'money', pantalla: 'Billetera' },
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
        source={{ uri: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697414400&semt=ais' }}
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
        <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')}>
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
    marginTop: -10, // Ajusta según tus necesidades
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Ajusta el color y la opacidad según tus necesidades
    padding: 5, // Ajusta según tus necesidades
    borderRadius: 15, // Ajusta según tus necesidades
  },
});

export default Configuracion;
