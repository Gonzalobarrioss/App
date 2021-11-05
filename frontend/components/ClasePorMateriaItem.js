import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { getClaseXMateria } from '../api'
import { useIsFocused } from '@react-navigation/core'


const ClasePorMateriaItem = ({materia}) => {

    const focus = useIsFocused()
    const [clase, setClase] = useState([])

    const handleClasePorMateria = async() => {
        const data = await getClaseXMateria(materia)
        console.log(data)
        //return data
    }

    useEffect(() => {
        handleClasePorMateria(materia)   
    }, [focus])
    /*
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
                            const result = await inscripcionClasePorMateria(inscripcion)
                            Alert.alert("Inscripcion exitosa")
                            console.log(result) 
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
 
*/
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress = { 
                    () => console.log(materia)
                }
            >
                <Text></Text>
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

export default ClasePorMateriaItem

