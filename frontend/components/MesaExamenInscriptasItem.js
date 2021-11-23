import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MesaExamen = ({ mesa }) => {

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemDescripcion}>ID: {mesa.id}</Text>
            <Text style={styles.itemDescripcion}>MESA: {mesa.descripcion}</Text>
            <Text style={styles.itemDescripcion}>MATERIA: {mesa.materia}</Text>
            <Text style={styles.itemDescripcion}>REGIMEN: {mesa.regimen}</Text>
            <Text style={styles.itemDescripcion}>FECHA: { mesa.fecha.slice(0,10) }</Text>
            <Text style={styles.itemDescripcion}>LLAMADO: {mesa.llamado}</Text>
            <Text style={styles.itemDescripcion}>EXAMINADOR 1: {mesa.examinador1}</Text>
            <Text style={styles.itemDescripcion}>EXAMINADOR 2: {mesa.examinador2}</Text>
            <Text style={styles.itemDescripcion}>EXAMINADOR 3: {mesa.examinador3}</Text>
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
        color: "#ffffff"
    }
})

export default MesaExamen
