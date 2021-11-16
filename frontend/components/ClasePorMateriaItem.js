import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { getClaseXMateria } from '../api'
import { useIsFocused } from '@react-navigation/core'


const ClasePorMateriaItem = ({materia}) => {

    const focus = useIsFocused()
    const [clase, setClase] = useState([])

    const handleClasePorMateria = async() => {
        const data = await getClaseXMateria(materia)
        //console.log(data)
        //return data
    }

    useEffect(() => {
        handleClasePorMateria(materia)   
    }, [focus])
    
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress = { 
                    () => console.log(materia)
                }
            >
                <Text>clase por materia</Text>
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

