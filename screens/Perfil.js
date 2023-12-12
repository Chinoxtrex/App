// Perfil.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Perfil = ({ route, navigation }) => {
    const { nombre, apellido, numero } = route.params || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{nombre}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Apellido:</Text>
                <Text style={styles.value}>{apellido}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Número:</Text>
                <Text style={styles.value}>{numero}</Text>
            </View>
            <Text
                onPress={() => navigation.navigate('Configuracion')}
            >
                Ir a Configuración
            </Text>
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
