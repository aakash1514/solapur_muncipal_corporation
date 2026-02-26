import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BirthCertificateScreen from '../screens/BirthCertificateScreen';
import DeathCertificateScreen from '../screens/DeathCertificateScreen';

const Stack = createNativeStackNavigator();

/**
 * AppNavigator – Stack navigation for the three app screens.
 * Headers are hidden since each screen has its own custom header.
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BirthCertificate" component={BirthCertificateScreen} />
        <Stack.Screen name="DeathCertificate" component={DeathCertificateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
