
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// --------------------SCREENS-----------------------
import SplashScreen from './Source/Views/Welcome/SplashScreen';
import BottamTab from './Source/Views/BottomTab/BottomTab';

const App = () => {
  const Stack = createStackNavigator();

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
