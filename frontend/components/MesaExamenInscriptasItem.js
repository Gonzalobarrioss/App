import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MesaExamen = ({ mesa }) => {

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemDescripcion}>MESA: {mesa.descripcion}</Text>
            <Text style={styles.itemDescripcion}>MATERIA: {mesa.materia}</Text>
            <Text style={styles.itemDescripcion}>FECHA: { mesa.fecha.slice(0,10) }</Text>
            <Text style={styles.itemDescripcion}>LLAMADO: {mesa.llamado}</Text>
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
