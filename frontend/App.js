import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen  from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
//import TaskFormScreen from './screens/TaskFormScreen'

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      
      <Stack.Navigator>
        
          <Stack.Screen 
            name="AuthScreen"
            component = {AuthScreen}
            options = {({navigation}) => ({
              title: "SAMSA",
              headerStyle: { backgroundColor: "#222f3e" },
              headerTitleStyle: { color: "#ffffff" }

            })}
          
          
          />
        


        <Stack.Screen 
          name="HomeScreen" 
          component ={HomeScreen}
          options = {({navigation})=>({
            title: "Rutas",
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
