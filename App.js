// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Billetera from './screens/billetera';
import Configuracion from './screens/Configuracion';
import Editarperfil from './screens/Editarperfil'; // Asegúrate de importar Editarperfil

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Billetera"
          component={Billetera}
          options={{
            title: 'Billetera',
            headerStyle: {
              backgroundColor: 'green',
            },
          }}
        />
        <Stack.Screen
          name="Configuracion"
          component={Configuracion}
          options={{
            title: 'Configuración',
            headerStyle: {
              backgroundColor: 'red',
            },
          }}
        />
        <Stack.Screen
          name="Editarperfil"
          component={Editarperfil} // Agrega la pantalla Editarperfil aquí
          options={{
            title: 'Editar Perfil',
            headerStyle: {
              backgroundColor: 'red', // Puedes cambiar el color según tus preferencias
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
