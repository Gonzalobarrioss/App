import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { getIdAlumno, inscripcionMesaExamen } from '../api'
import { useIsFocused } from '@react-navigation/core'


const MesaExamen = ({mesa, alumno}) => {

    const focus = useIsFocused()
    const [alumnoID, setAlumnoID] = useState("")

    const handleIdAlumno = async() => {
        const data = await getIdAlumno(alumno)
        return setAlumnoID(data.id)
    }

    useEffect(() => {
        handleIdAlumno();         
    }, [focus])
    
    const finalizarInscripcion = (mesaID) => {
        const inscripcion = {mesaID: mesaID, alumnoID: alumnoID}
        Alert.alert(
            `Atencion`,
            `Si continua se inscribirá en la mesa.`,
            [
                {
                    text: "Inscribirse",
                    onPress: async () => {
                        //console.log(inscripcion)
                        try {
                            const result = await inscripcionMesaExamen(inscripcion)
                            Alert.alert("Inscripcion exitosa")
                            //console.log(result) 
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la inscripcion")
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
                <Text style={styles.itemDescripcion}>MESA: {mesa.id}</Text>
                <Text style={styles.itemDescripcion}>MATERIA: {mesa.descripcion}</Text>
                <Text style={styles.itemDescripcion}>REGIMEN: {mesa.regimen}</Text>
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
