import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Layout from '../components/Layout'

const HomeScreenDocente = ({ navigation}) => {

    return (

        <Layout>
            <Text style={{color:"#ffffff"}}>Welcome</Text>
            <TouchableOpacity
                style = { styles.btn }
                onPress = { () => navigation.navigate("TomarAsistenciaScreen")}
            >
                <Text style = { styles.txt }>Tomar Asistencia</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = { styles.btn }
                onPress = { () => navigation.navigate("CalificarScreen")}
            >
                <Text style = { styles.txt }>Calificar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = { styles.btn }
                onPress = { () => navigation.navigate("SancionarScreen")}
            >
                <Text style = { styles.txt }>Sancionar</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    btn: {
        padding: 7,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        width: "70%",
        marginVertical: 8
    },
    txt: {
        textAlign: 'center'
    }
})

export default HomeScreenDocente
