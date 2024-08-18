import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import Home from './page/Home';
import SchoolModification from './page/SchoolModification';

const Stack = createNativeStackNavigator();
import toastConfig from './components/ToastConfig';


function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SchoolModification" component={SchoolModification} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig}  visibilityTime={1800} />
    </>
  );
}

export default App;
