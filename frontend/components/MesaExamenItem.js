import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const MesaExamen = ({mesa}) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress = {()=>console.log("MESA NUMERO", mesa.id)}
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
