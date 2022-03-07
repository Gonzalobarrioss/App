import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { editCalificaciones, inscripcionMesaExamen } from '../api'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { addIdClase } from '../redux/actions/ClaseAction'
import { isLoading } from '../redux/actions/LoadingAction'


const CalificacionesItem = ({ calificaciones }) => {

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress = { 
                    () => console.log(console.log(calificaciones))
                }
            >
                <Text style={styles.itemDescripcion}>{calificaciones.apellido}, {calificaciones.nombre}</Text>
                <Text style={styles.itemDescripcion}>Nota: {calificaciones.nota}</Text>
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

export default CalificacionesItem
