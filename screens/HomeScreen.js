// Home.js
import React from 'react';
import { View, Button, Text } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const { userData } = route.params || {};

  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
};

export default HomeScreen;
