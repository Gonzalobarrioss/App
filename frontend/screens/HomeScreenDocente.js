import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import Layout from '../components/Layout'

const HomeScreenDocente = ({ navigation}) => {

    return (

        <Layout>
            <Text style={styles.txtHeader}>Bienvenido</Text>
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
    txtHeader:{
        color:"#fff",
        fontSize: 20
    },
    btn: {
        padding: 7,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        width: "70%",
        height: "5%",
        marginVertical: 8,
    },
    txt: {
        flex: 1,
        textAlign: 'center',
        
        alignItems: 'center',
        fontSize:18,
        
    }
})

export default HomeScreenDocente
