import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import Home from './page/Home';
import SchoolModification from './page/SchoolModification';
import AcademicCalendar from './page/AcademicCalendar';

import toastConfig from './components/Toast';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SchoolModification" component={SchoolModification} />
          <Stack.Screen name="AcademicCalendar" component={AcademicCalendar} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig}  visibilityTime={1500} />
    </>
  );
}

export default App;
