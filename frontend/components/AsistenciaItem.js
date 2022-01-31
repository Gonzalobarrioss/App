import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { inscripcionMesaExamen } from '../api'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { render } from '../redux/actions/RenderAction'

const AsistenciaItem = ({ asistencias }) => {

    //const nombreAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.nombre)
    //const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const editAsistencia = (id) => {
        console.log(id)
        
    }
 

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress = { 
                    () => editAsistencia(asistencias.id)
                }
            >
                <Text style={styles.itemDescripcion}>Alumno: {asistencias.apellido}, {asistencias.nombre}</Text>
                <Text style={styles.itemDescripcion}>Estado: {asistencias.estado}</Text>
            </TouchableOpacity>           
        </View>    
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor:"#333333",
        padding: 20,
        marginVertical: 8,
        borderRadius: 5
    },
    itemDescripcion: {
        color: "#ffffff",
        fontSize:20
    }
})

export default AsistenciaItem
