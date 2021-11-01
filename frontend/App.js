import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartScreen } from './screens';
import AuthScreen  from './screens/AuthScreen'
import HomeScreenAlumno from './screens/HomeScreenAlumno'
import HomeScreenDocente from './screens/HomeScreenDocente';
//import TaskFormScreen from './screens/TaskFormScreen'

const Stack = createNativeStackNavigator()

const App = () => {

  return (
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
            headerRight: () => (
              <TouchableOpacity onPress={ () => console.log("press")}> 
                <Text style={{color: "#ffffff", marginRight:20, fontSize: 15}}>New</Text>
              </TouchableOpacity>
            ),
          })}  
        />
      </Stack.Navigator>
    </NavigationContainer>
/*
    <View style={styles.container}>
      <AuthScreen />
      <StatusBar style="auto" />
    </View>*/
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
