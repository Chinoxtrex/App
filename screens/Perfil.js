import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';

const Perfil = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        // Obtén la instancia de la base de datos
        const db = getFirestore(firebaseApp);

        // Realiza una consulta para obtener el documento que coincide con el userId del usuario
        const q = query(collection(db, 'usuarios'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        // Verifica si se encontraron resultados y actualiza el estado
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
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
  }, [userId]);

  const handleEditarPerfil = () => {
    // Navegar a la pantalla de Edición de Perfil
    navigation.navigate('EditarPerfil', { userId });
  };

  const handleConfiguracion = () => {
    // Navegar a la pantalla de Configuración
    navigation.navigate('Configuracion', { userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{userData.nombre}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Apellido:</Text>
        <Text style={styles.value}>{userData.apellido}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Número:</Text>
        <Text style={styles.value}>{userData.numero}</Text>
      </View>

      {/* Botones para navegar a Editar Perfil y Configuración */}
      <Button title="Editar Perfil" onPress={handleEditarPerfil} />
      <Button title="Configuración" onPress={handleConfiguracion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
});

export default Perfil;
