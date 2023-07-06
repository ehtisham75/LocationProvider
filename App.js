
import React, { useEffect } from 'react'
import { enableLatestRenderer } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// --------------------SCREENS-----------------------
import SplashScreen from './Source/Views/Welcome/SplashScreen';
import BottamTab from './Source/Views/BottomTab/BottomTab';

const App = () => {
  const Stack = createStackNavigator();

  useEffect(() => {
    enableLatestRenderer();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="BottamTab" component={BottamTab} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}


export default App
