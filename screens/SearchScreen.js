import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const obtenerResultadosBusqueda = async () => {
    try {
      if (search.trim() === '') {
        setSearchResults([]);
        return;
      }

      const db = getFirestore(firebaseApp);
      const q = query(
        collection(db, 'usuarios'),
        where('nombreUsuario', '>=', search.toLowerCase()),
        where('nombreUsuario', '<=', search.toLowerCase() + '\uf8ff'),
        orderBy('nombreUsuario')
      );

      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error al obtener resultados de búsqueda', error.message);
    }
  };

  useEffect(() => {
    obtenerResultadosBusqueda();
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{item.nombreUsuario}</Text>
        {item.fotoPerfil && (
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: item.fotoPerfil }} style={styles.profileImage} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar por nombre de usuario"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.userId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultText: {
    fontSize: 16,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});

export default SearchScreen;
