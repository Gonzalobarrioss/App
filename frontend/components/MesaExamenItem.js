import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { inscripcionMesaExamen } from '../api'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'

import { isLoading } from '../redux/actions/LoadingAction'

const MesaExamen = ({ mesa }) => {

    const nombreAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.nombre)
    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const finalizarInscripcion = (mesaID) => {
        const inscripcion = {mesaID: mesaID, alumnoID: idAlumno}
        Alert.alert(
            `Atencion ${nombreAlumno}`,
            `Esta a punto de inscribirse en la siguiente mesa:

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
                    text: "Inscribirme",
                    onPress: async () => {
                        try {
                            store.dispatch(isLoading(true))
                            await inscripcionMesaExamen(inscripcion).finally(()=>store.dispatch(isLoading(false)))
                    
                            Alert.alert("Inscripcion exitosa.")
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la inscripcion.")
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
                onPress = { 
                    () => finalizarInscripcion(mesa.id)
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
        backgroundColor:"#ffffff",
        padding: 20,
        marginVertical: 8,
        borderRadius: 5
    },
    itemDescripcion: {
        color: "#333333",
        fontSize:20
    }
})

export default MesaExamen
