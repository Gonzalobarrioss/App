import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { inscripcionMesaExamen } from '../api'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { render } from '../redux/actions/RenderAction'

const MesaExamen = ({ mesa }) => {

    const nombreAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.nombre)
    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const finalizarInscripcion = (mesaID) => {
        const inscripcion = {mesaID: mesaID, alumnoID: idAlumno}
        Alert.alert(
            `Atencion ${nombreAlumno}`,
            `Esta a punto de inscribirse en la siguiente mesa:

            Materia: ${mesa.materia}
            Descripcion: ${mesa.descripcion}
            Fecha: ${mesa.fecha.slice(0,10)}
            Llamado: ${mesa.llamado}
                `,
            [
                {
                    text: "Inscribirme",
                    onPress: async () => {
                        try {
                            await inscripcionMesaExamen(inscripcion)
                            store.dispatch(render(true))
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
                <Text style={styles.itemDescripcion}>ID: {mesa.id}</Text>
                <Text style={styles.itemDescripcion}>MESA: {mesa.descripcion}</Text>
                <Text style={styles.itemDescripcion}>MATERIA: {mesa.materia}</Text>
                <Text style={styles.itemDescripcion}>REGIMEN: {mesa.regimen}</Text>
                <Text style={styles.itemDescripcion}>FECHA: { mesa.fecha.slice(0,10) }</Text>
                <Text style={styles.itemDescripcion}>LLAMADO: {mesa.llamado}</Text>
                <Text style={styles.itemDescripcion}>EXAMINADOR 1: {mesa.examinador1}</Text>
                <Text style={styles.itemDescripcion}>EXAMINADOR 2: {mesa.examinador2}</Text>
                <Text style={styles.itemDescripcion}>EXAMINADOR 3: {mesa.examinador3}</Text>
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
        color: "#ffffff"
    }
})

export default MesaExamen
