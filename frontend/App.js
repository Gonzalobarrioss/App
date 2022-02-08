import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartScreen } from './screens';
import AuthScreen  from './screens/AuthScreen'
import HomeScreenAlumno from './screens/HomeScreenAlumno'
import HomeScreenDocente from './screens/HomeScreenDocente';
import TomarAsistenciaScreen from './screens/TomarAsistenciaScreen';
import CalificarScreen from './screens/CalificarScreen';
import SancionarScreen from './screens/SancionarScreen';
import AsistenciasScreen from './screens/VerAsistenciasScreen';
import CalificacionesScreen from './screens/VerCalificacionesScreen';

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
                options = {() => ({
                  title: "TESIS APP",
                  headerStyle: { backgroundColor: "#222f3e" },
                  headerTitleStyle: { color: "#ffffff" }
                })}
              />

              <Stack.Screen 
                name="AuthScreen"
                component = {AuthScreen}
                options = {() => ({
                  title: "INGRESO",
                  headerStyle: { backgroundColor: "#222f3e" },
                  headerTitleStyle: { color: "#ffffff" },
                  headerBackVisible: false
                })}
              
              
              />

            <Stack.Screen 
              name="HomeScreenAlumno" 
              component ={HomeScreenAlumno}
              options = {()=>({
                title: "INICIO ALUMNO",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerBackVisible: false
              })}  
            />

            <Stack.Screen 
              name="HomeScreenDocente" 
              component ={HomeScreenDocente}
              options = {()=>({
                title: "INICIO DOCENTE",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerBackVisible: false
              })}  
            />
            <Stack.Screen 
              name="TomarAsistenciaScreen" 
              component ={TomarAsistenciaScreen}
              options = {()=>({
                title: "ASISTENCIA",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerBackVisible: false
              })}  
            />
            <Stack.Screen 
              name="CalificarScreen" 
              component ={CalificarScreen}
              options = {()=>({
                title: "CALIFICAR",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerTintColor: "#ffffff",
                headerBackVisible: false
              })}  
            />
            <Stack.Screen 
              name="SancionarScreen" 
              component ={SancionarScreen}
              options = {()=>({
                title: "SANCIONES",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerBackVisible: false
              })}  
            />
            <Stack.Screen 
              name="Ver Asistencias" 
              component ={AsistenciasScreen}
              options = {()=>({
                title: "ASISTENCIAS",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerBackVisible: false
              })}  
            />
            <Stack.Screen 
              name="Ver Calificaciones" 
              component ={CalificacionesScreen}
              options = {()=>({
                title: "CALIFICACIONES",
                headerStyle: { backgroundColor: "#222f3e" },
                headerTitleStyle: { color: "#ffffff" },
                headerBackVisible: false
              })}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );

};


export default App
