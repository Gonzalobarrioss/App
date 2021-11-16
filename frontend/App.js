import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartScreen } from './screens';
import AuthScreen  from './screens/AuthScreen'
import HomeScreenAlumno from './screens/HomeScreenAlumno'
import HomeScreenDocente from './screens/HomeScreenDocente';
import TomarAsistenciaScreen from './screens/TomarAsistenciaScreen';
import CalificarScreen from './screens/CalificarScreen';
import SancionarScreen from './screens/SancionarScreen';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <NavigationContainer>
          
          <Stack.Navigator>
            
              <Stack.Screen 
                name="StartScreen"
                component = {StartScreen}
                options = {({navigation}) => ({
                  title: "TESIS APP",
                  headerStyle: { backgroundColor: "#222f3e" },
                  headerTitleStyle: { color: "#ffffff" }

                })}
              />

              <Stack.Screen 
                name="AuthScreen"
                component = {AuthScreen}
                options = {({navigation}) => ({
                  title: "INGRESO",
                  headerStyle: { backgroundColor: "#222f3e" },
                  headerTitleStyle: { color: "#ffffff" }

                })}
              
              
              />

            <Stack.Screen 
              name="HomeScreenAlumno" 
              component ={HomeScreenAlumno}
              options = {({navigation})=>({
                title: "INICIO ALUMNO",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" }
              })}  
            />

            <Stack.Screen 
              name="HomeScreenDocente" 
              component ={HomeScreenDocente}
              options = {({navigation})=>({
                title: "INICIO DOCENTE",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
              })}  
            />
            <Stack.Screen 
              name="TomarAsistenciaScreen" 
              component ={TomarAsistenciaScreen}
              options = {({navigation})=>({
                title: "ASISTENCIA",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" }
              })}  
            />
            <Stack.Screen 
              name="CalificarScreen" 
              component ={CalificarScreen}
              options = {({navigation})=>({
                title: "CALIFICAR",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerTintColor: "#ffffff"
              })}  
            />
            <Stack.Screen 
              name="SancionarScreen" 
              component ={SancionarScreen}
              options = {({navigation})=>({
                title: "SANCIONES",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" }
              })}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
