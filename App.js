import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Billetera from './screens/billetera';
import RecargaSaldo from './screens/RecargaSaldo';
import Configuracion from './screens/Configuracion';
import Registro from './screens/Registro';
import InicioSesion from './screens/InicioSesion';
import Perfil from './screens/Perfil';
import SearchScreen from './screens/SearchScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registro">
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />

        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name="InicioSesion" component={InicioSesion} options={{ headerShown: false }} />
        <Stack.Screen name="Billetera" component={Billetera} />
        <Stack.Screen name="RecargaSaldo" component={RecargaSaldo} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Configuracion" component={Configuracion} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />


        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />

    </Tab.Navigator>
  );
};

export default App;
