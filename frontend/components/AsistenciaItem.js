import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { editAsistencias, inscripcionMesaExamen } from '../api'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { render } from '../redux/actions/RenderAction'
import { addIdClase } from '../redux/actions/ClaseAction'


const AsistenciaItem = ({ asistencias }) => {


    const claseId = useSelector(state => state.ClasesReducer.id)

    const refreshList = () => {
        store.dispatch(addIdClase(0))
        store.dispatch(addIdClase(claseId))
    }

    const handleEditAsistencia = (value) => {
        Alert.alert(
            `Alumno: ${value.nombre}`,
            `Insertar estado del alumno`,
            [
                {
                    text: "Retraso",
                    onPress: async () => {

                        try {
                           await editAsistencias({estado: "Retraso", id: value.id})
                            .finally(() =>{
                                refreshList()
                            })
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo editar la asistencia")
                        }
                        
                    }
                },
                {
                    text: "Presente",
                    onPress: async () => {

                        try {
                            await editAsistencias({estado: "Presente", id: value.id})
                            .finally(() =>{
                                refreshList()
                            })
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo editar la asistencia")
                        }
                        
                    }
                },
                {
                    text: "Ausente",
                    onPress: async () => {
                        try {
                            await editAsistencias({estado: "Ausente", id: value.id})
                            .finally(() =>{
                                refreshList()
                            })
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo editar la asistencia")
                        }
                    },
                    style: "cancel"
                }              
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress = { 
                    () => handleEditAsistencia({id: asistencias.id, nombre:asistencias.nombre})
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
