import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
//import { getRutasLecturista } from '../api'
//import RouteList from '../components/RouteList'
import Layout from '../components/Layout'

const HomeScreenDocente = ({route, navigation}) => {
    const nombre = route.params.nombre
    const rol = route.params.rol
    //console.log("params", params)
    /*
    const [routes, setRoutes] = useState([])

    const loadRoutes = async () => {
        const data = await getRutasLecturista(params);
        setRoutes(data)
    }

    useEffect(() => {
        loadRoutes();
    }, [])*/

    return (
        <Layout>
            <Text style={{color:"#ffffff"}}>Welcome {nombre}, eres un {rol}</Text>
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
        /*
        <Layout>
            <RouteList routes={routes}/>
        </Layout>
        */
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
