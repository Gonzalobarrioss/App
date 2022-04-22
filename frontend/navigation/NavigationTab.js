import React, {useEffect} from "react"

import { Alert, BackHandler } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelector } from "react-redux";

import ListOfMesaExamenes from "../components/examenes/ListOfMesaExamenes";
import ListOfMesaExamenesInscriptas from "../components/examenes/ListOfMesaExamenesInscriptas";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export function MesasExamenesTab({navigation}) {

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Atencion", "Si  continua se perderá la sesión", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Continuar", onPress: () => navigation.navigate("StartScreen") }
          ]);
          return true;
        };    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );    
        return () => backHandler.remove();
    }, []);

    
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Mesas de Examenes"
                component={ListOfMesaExamenes}
                options={{
                    tabBarIcon: ({ color,size }) => (
                    <MaterialCommunityIcons name="text-box-multiple-outline" color={color} size={size} />
                    ),
                }}
                
            />
            <Tab.Screen
                name="Mesas de Examenes Inscriptas"
                component={ListOfMesaExamenesInscriptas}
                options={{
                    tabBarIcon: ({ color,size }) => (
                    <MaterialCommunityIcons name="text-box-check-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}