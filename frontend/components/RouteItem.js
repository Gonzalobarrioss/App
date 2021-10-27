import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


const RouteItem = ({route}) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemDescripcion}>{route.descripcion}</Text>
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

export default RouteItem
