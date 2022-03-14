import React, {useEffect} from 'react'
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'

import { useIsFocused } from '@react-navigation/native'
import {store} from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { addIdClase } from '../redux/actions/ClaseAction'
import { addIdCurso } from '../redux/actions/AlumnoCursoAction'
import { addIdAlumno } from '../redux/actions/PersonaAction'
import { setEtapa } from '../redux/actions/CalificacionesAction'

import Layout from '../components/Layout'

const HomeScreenDocente = ({ navigation }) => {

    const focus = useIsFocused()
    useEffect(() => {
        let controller = new AbortController()
        store.dispatch(setEtapa(0))
        store.dispatch(addIdMateria(0))
        store.dispatch(addIdClase(0))
        store.dispatch(addIdCurso(0))
        store.dispatch(addIdAlumno(0))
        controller = null
      return () => {
        controller?.abort()
      };
    }, [focus]);

    useBackHandler(() => {

        if (navigation.getState().index == 2) {
            Alert.alert("Atencion", "Si continua se perderá la sesión", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "Continuar", onPress: () => navigation.navigate("StartScreen") }
              ]);
          return true
        }
        
        return false
    })
    
    return (

        <Layout>
            <Text style={styles.txtHeader}>Bienvenido</Text>
            <TouchableOpacity
                style = { styles.btn }
                onPress = { 
                    () => {navigation.navigate("TomarAsistenciaScreen")}
                }
            >
                <Text style = { styles.txt }>Asistencias</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = { styles.btn }
                onPress = { 
                    () => {navigation.navigate("CalificarScreen")}
                }
            >
                <Text style = { styles.txt }>Calificaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = { styles.btn }
                onPress = { 
                    () => {navigation.navigate("SancionarScreen")}
                }
            >
                <Text style = { styles.txt }>Sanciones</Text>
            </TouchableOpacity>
        </Layout>
    )  
}

const styles = StyleSheet.create({
    txtHeader:{
        color:"#fff",
        fontSize: 35
    },
    btn: {
        padding: 7,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        width: "100%",
        height: "30%",
        marginVertical: 8,
        justifyContent: "center",
        elevation: 9,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    txt: {
        
        textAlign: 'center',
        fontSize:30,
        display: "flex",
    },

  



})

export default HomeScreenDocente
