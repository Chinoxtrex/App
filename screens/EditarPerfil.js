import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const EditarPerfil = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    fotoPerfil: '',
    fotoPortada: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const userId = auth.currentUser.uid;
        const q = query(collection(db, 'usuarios'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const { nombre, apellido, nombreUsuario, fotoPerfil, fotoPortada } = doc.data();
            setUsuario({
              nombre,
              apellido,
              nombreUsuario,
              fotoPerfil,
              fotoPortada,
            });
          });
        } else {
          console.log('No se encontraron datos para el usuario con el userId:', userId);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error.message);
      }
    };

    obtenerDatosUsuario();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const guardarCambios = async () => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'usuarios', userId);
      await updateDoc(userDocRef, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        nombreUsuario: usuario.nombreUsuario,
        fotoPerfil: usuario.fotoPerfil,
        fotoPortada: usuario.fotoPortada,
      });

      alert('Cambios guardados correctamente');
    } catch (error) {
      console.error('Error al guardar cambios', error.message);
    }
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const seleccionarFotoPerfil = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permiso para acceder a la galería de fotos denegado');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (!pickerResult.canceled) {
        subirFotoPerfil(pickerResult.assets[0].uri || pickerResult.assets[0]?.file?.uri);
      }

      cerrarModal();
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  };

  const tomarFotoPerfil = async () => {
    try {
      if (!cameraPermission) {
        alert('Permiso para acceder a la cámara denegado');
        return;
      }

      const foto = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!foto.canceled) {
        subirFotoPerfil(foto.uri);
      }

      cerrarModal();
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  };

  const subirFotoPerfil = async (uri) => {
    try {
      const storage = getStorage();
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const storageRef = ref(storage, `fotosPerfil/${userId}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      const db = getFirestore();
      const userDocRef = doc(db, 'usuarios', userId);
      await updateDoc(userDocRef, { fotoPerfil: url });
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        fotoPerfil: url,
      }));
    } catch (error) {
      console.error('Error al subir la foto de perfil', error.message);
    }
  };

  const seleccionarFotoPortada = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permiso para acceder a la galería de fotos denegado');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (!pickerResult.canceled) {
        subirFotoPortada(pickerResult.assets[0].uri || pickerResult.assets[0]?.file?.uri);
      }

      cerrarModal();
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  };

  const tomarFotoPortada = async () => {
    try {
      if (!cameraPermission) {
        alert('Permiso para acceder a la cámara denegado');
        return;
      }

      const foto = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!foto.canceled) {
        subirFotoPortada(foto.uri);
      }

      cerrarModal();
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  };

  const subirFotoPortada = async (uri) => {
    try {
      const storage = getStorage();
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const storageRef = ref(storage, `fotosPortada/${userId}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = uploadBytesResumable(storageRef, blob);
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      const db = getFirestore();
      const userDocRef = doc(db, 'usuarios', userId);
      await updateDoc(userDocRef, { fotoPortada: url });
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        fotoPortada: url,
      }));
    } catch (error) {
      console.error('Error al subir la foto de portada', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={abrirModal}>
        <View style={styles.fotoPortadaContainer}>
          {usuario.fotoPortada ? (
            <Image source={{ uri: usuario.fotoPortada }} style={styles.fotoPortada} />
          ) : (
            <Text>Subir foto de portada</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={abrirModal}>
        <View style={styles.fotoPerfilContainer}>
          {usuario.fotoPerfil ? (
            <Image source={{ uri: usuario.fotoPerfil }} style={styles.fotoPerfil} />
          ) : (
            <Text>Subir foto de perfil</Text>
          )}
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Edita tu Perfil</Text>
      <TextInput
        placeholder="Nombre"
        value={usuario.nombre}
        onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={usuario.apellido}
        onChangeText={(text) => setUsuario({ ...usuario, apellido: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre de usuario"
        value={usuario.nombreUsuario}
        onChangeText={(text) => setUsuario({ ...usuario, nombreUsuario: text })}
        style={styles.input}
      />
      <Button title="Guardar Cambios" onPress={guardarCambios} />

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={tomarFotoPerfil}>
              <Text style={styles.modalOption}>Tomar foto de perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={seleccionarFotoPerfil}>
              <Text style={styles.modalOption}>Seleccionar foto de perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={tomarFotoPortada}>
              <Text style={styles.modalOption}>Tomar foto de portada</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={seleccionarFotoPortada}>
              <Text style={styles.modalOption}>Seleccionar foto de portada</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cerrarModal}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFf',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  fotoPerfilContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Coloca la foto de perfil encima de la foto de portada
  },
  fotoPerfil: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    marginBottom:.5,

  },
  fotoPortadaContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFf',

    marginBottom:370,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,

  },
  fotoPortada: {
    marginRight:373,
    width: '112%',
    height: '100%',
    marginBottom:370,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
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
});

export default EditarPerfil;
