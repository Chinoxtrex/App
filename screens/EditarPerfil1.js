import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';

const Editarperfil = ({ navigation }) => {
    const [usuario, setUsuario] = useState({
      nombre: '',
      apellido: '',
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
                  apellido,
                 
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

      const [mostrarEnGrande, setMostrarEnGrande] = useState(false);
      const [modalVisible, setModalVisible] = useState(false);
  const abrirGaleria = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permiso para acceder a la galería de fotos denegado');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (!pickerResult.canceled) {
        setFotoPortada(pickerResult.uri);
      }
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  };

  const abrirGaleria2 = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permiso para acceder a la galería de fotos denegado');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (!pickerResult.canceled) {
        setFotoPerfil(pickerResult.uri);
      }
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  };

  const abrirCamara = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
  
      if (status === 'granted') {
        const foto = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
  
        if (!foto.canceled) {
          setFotoPerfil(foto.uri);
        }
      } else {
        alert('Permiso para acceder a la cámara denegado');
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  };

  const mostrarOpcionesFotoPerfil = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const seleccionarOpcion = (opcion) => {
    cerrarModal();
    switch (opcion) {
      case 'Tomar foto':
        abrirCamara();
        break;
      case 'Subir foto':
        abrirGaleria2();
        break;
      case 'Ver foto':
        setMostrarEnGrande(true);
        break;
      default:
        console.log('Cancelar');
    }
  };

  const editarElemento = (elemento) => {
    // Navegar a la pantalla de edición según el elemento seleccionado
    navigation.navigate('EditarPerfil', { elemento });
  };

  const guardarDescripcion = () => {
    // Aquí puedes implementar la lógica para guardar la descripción en tu base de datos
    // Por ejemplo, puedes usar Firebase, Axios, etc.
  
    // Después de guardar, puedes mostrar un mensaje de éxito o realizar otras acciones.
    alert('Descripción guardada correctamente');
  };

  useEffect(() => {
    // Puedes agregar aquí la inicialización de tu componente si es necesario
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sección de foto de portada */}
      <TouchableOpacity onPress={abrirGaleria}>
       
        {/* Texto para editar foto de portada */}
        <View style={styles.editarPortadaTextoContainer}>
          <Text style={styles.editarPortadaTexto}>Editar foto de portada</Text>
        </View>
      </TouchableOpacity>
      {/* Sección de foto de perfil */}
      <View style={styles.fotoPerfilContainer}>
        <TouchableOpacity onPress={mostrarOpcionesFotoPerfil}>
         
          <Text style={styles.editarTexto}>Editar foto de perfil</Text>
        </TouchableOpacity>
      </View>
      {/* Resto del perfil */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <TouchableOpacity onPress={() => editarElemento('nombre')}>
            <Text style={styles.infoValor}>{usuario.nombre}</Text>
          </TouchableOpacity>
          <Ionicons
            name="pencil-outline"
            size={20}
            color="black"
            style={styles.iconoLapiz}
            onPress={() => editarElemento('nombre')}
          />
        </View>

        <View style={styles.lineaDivisoria}></View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Apellido</Text>
          <TouchableOpacity onPress={() => editarElemento('apellido')}>
            <Text style={styles.infoValor}>{usuario.apellido}</Text>
          </TouchableOpacity>
          <Ionicons
            name="pencil-outline"
            size={20}
            color="black"
            style={styles.iconoLapiz}
            onPress={() => editarElemento('apellido')}
          />
        </View>

        <View style={styles.lineaDivisoria}></View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>URL de perfil</Text>
          <TouchableOpacity onPress={() => editarElemento('urlPerfil')}>
            <Text style={styles.infoValor}>aun nada</Text>
          </TouchableOpacity>
          <Ionicons
            name="copy"
            size={20}
            color="black"
            style={styles.iconoLapiz}
            onPress={() => editarElemento('urlPerfil')}
          />
        </View>
        <View style={styles.lineaDivisoria}></View>
      </View>

      {/* Formulario de edición de perfil */}
      <View style={styles.formularioContainer}>
  <View style={styles.formularioItem}>
    <Text style={styles.formularioLabel}>Descripción</Text>
    <TextInput
      style={styles.formularioInput}
      multiline
      numberOfLines={4}
    />
  </View>
  <TouchableOpacity onPress={guardarDescripcion} style={styles.botonGuardar}>
    <Text style={styles.botonGuardarTexto}>Guardar</Text>
  </TouchableOpacity>
</View>

      <View style={styles.redesSocialesContainer}>
      <Text style={styles.txtsocial}>Vincular cuentas</Text>
        <Ionicons name="logo-facebook" size={40} color="#1877f2" style={styles.redSocialIcono} />
        <Ionicons name="logo-youtube" size={40} color="#ff0000" style={styles.redSocialIcono} />
        <Ionicons name="logo-instagram" size={40} color="#bc2a8d" style={styles.redSocialIcono} />
        <Ionicons name="logo-google" size={40} color="#4285f4" style={styles.redSocialIcono} />
      </View>

      {/* Modal de opciones */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => seleccionarOpcion('Tomar foto')}>
              <Text style={styles.modalOption}>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seleccionarOpcion('Subir foto')}>
              <Text style={styles.modalOption}>Subir foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seleccionarOpcion('Ver foto')}>
              <Text style={styles.modalOption}>Ver foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cerrarModal}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={false}
          visible={mostrarEnGrande}
          onRequestClose={() => setMostrarEnGrande(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           
            <TouchableOpacity
              onPress={() => setMostrarEnGrande(false)}
              style={{ position: 'absolute', top: 20, right: 20 }}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  portada: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  fotoPerfilContainer: {
    alignItems: 'center',
    marginTop: -150,
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    right: -15,
  },
  editarTexto: {
    marginTop: 5,
    color: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 5,
    right: 0,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,

  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  infoValor: {
    fontSize: 16,
    marginLeft: 8,
    
  },
  iconoLapiz: {
    marginLeft: -120,
  },
  editarPortadaTextoContainer: {
    position: 'absolute',
    bottom: 170,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 2,
    borderRadius: 6,
  },
  editarPortadaTexto: {
    color: '#000000',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalCancel: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
  formularioContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  formularioTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formularioItem: {
    marginBottom: 16,
  },
  formularioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formularioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },

  lineaDivisoria: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },

  txtsocial: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  redesSocialesContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  redSocialIcono: {
    margin: 10,
  },

  botonGuardar: {
    backgroundColor: '#3498db',
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 5,
    marginTop: 0,
  },
  botonGuardarTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  


});

export default Editarperfil;