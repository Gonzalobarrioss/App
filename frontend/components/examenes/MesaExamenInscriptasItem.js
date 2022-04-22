import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { bajaMesaExamen } from '../../api'

import { useSelector } from 'react-redux'

import { store } from '../../redux/store'

import { isLoading } from '../../redux/actions/LoadingAction'
import moment from 'moment'


const MesaExamen = ({ mesa }) => {

    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)
    const nombreAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.nombre)

    const bajaInscripcion = (mesaID) => {
        const inscripcion = {mesaID: mesaID, alumnoID: idAlumno}
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
                            store.dispatch(isLoading(true))
                            await bajaMesaExamen(inscripcion).finally(()=>store.dispatch(isLoading(false)))

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


    const isValidDate = (fecha) => {

        const fechaActual = moment().utcOffset('-03:00').format('YYYY-MM-DD')
        const anioActual = parseInt(fechaActual.slice(0,4))
        const mesActual = parseInt(fechaActual.slice(5,7))
        const diaActual = parseInt(fechaActual.slice(8,10))

        const fechaMesa = fecha.slice(0,10)
        const anioMesa = parseInt(fechaMesa.slice(0,4))
        const mesMesa = parseInt(fechaMesa.slice(5,7))
        const diaMesa = parseInt(fechaMesa.slice(8,10))

        if (anioActual == anioMesa){
            if (mesActual == mesMesa){
                if(diaActual <= diaMesa-2){
                    return true
                }
                else{
                    return false
                }
            }
            else if(mesActual < mesMesa){
                return true
            }
        }
        
    }

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={ 
                    () => isValidDate(mesa.fecha) ?bajaInscripcion(mesa.id) : Alert.alert("La baja debe realizarse 48hs antes de la mesa")
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
        backgroundColor:"#10ac84",
        padding: 15,
        marginVertical: 5,
    },
    itemDescripcion: {
        color: "#ffffff",
        fontSize: 20
    }
})

export default MesaExamen
