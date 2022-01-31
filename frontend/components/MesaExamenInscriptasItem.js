import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { bajaMesaExamen } from '../api'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { render } from '../redux/actions/RenderAction'


const MesaExamen = ({ mesa }) => {

    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)
    const nombreAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.nombre)

    const bajaInscripcion = (mesaID) => {
        const inscripcion = {mesaID: mesaID, alumnoID: idAlumno}
        //console.log(mesa)
        Alert.alert(
            `Atencion ${nombreAlumno}`,
            `Esta a punto de darse de baja en la siguiente mesa:

            ${mesa.descripcion}
            Materia: ${mesa.materia}
            Regimen: ${mesa.regimen}
            Fecha: ${mesa.fecha.slice(0,10)}
            Llamado: ${mesa.llamado}
            Docentes: 
                - ${mesa.examinador1}
                - ${mesa.examinador2}
                - ${mesa.examinador3}
                `,
            [
                {
                    text: "Baja",
                    onPress: async () => {
                        try {
                            await bajaMesaExamen(inscripcion)
                            store.dispatch(render(true))
                            Alert.alert("Baja exitosa.")
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la baja.")
                        }
                    }
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ]
        )
    }

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={ 
                    () => bajaInscripcion(mesa.id)
                }    
            >
                <Text style={styles.itemDescripcion}>MESA: {mesa.descripcion}</Text>
                <Text style={styles.itemDescripcion}>MATERIA: {mesa.materia}</Text>
                <Text style={styles.itemDescripcion}>FECHA: { mesa.fecha.slice(0,10) }</Text>
                <Text style={styles.itemDescripcion}>LLAMADO: {mesa.llamado}</Text>
            </TouchableOpacity>
        </View>     
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor:"#534887",
        padding: 20,
        marginVertical: 5,
        borderRadius: 5
    },
    itemDescripcion: {
        color: "#ffffff",
        fontSize: 20
    }
})

export default MesaExamen
