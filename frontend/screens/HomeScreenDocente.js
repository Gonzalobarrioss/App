import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
//import { getRutasLecturista } from '../api'
//import RouteList from '../components/RouteList'
import Layout from '../components/Layout'
import {store} from '../redux/store'
import { useSelector } from 'react-redux'
import { addIdDocente, addNombreDocente } from '../redux/actions/PersonaAction'

const HomeScreenDocente = ({route, navigation}) => {

   // console.log("ID Docente", route.params.id)
   // console.log("Nombre Docente",route.params.nombre)

        const id = route.params.id
        const nombre = route.params.nombre
        const rol = route.params.rol
    

    try {
       // console.log("id es", id)
       // console.log("nombre es", nombre)
        store.dispatch(addIdDocente(id))
        store.dispatch(addNombreDocente(nombre))
    } catch (error) {
        console.log("dispatch", error)
        const nombre = useSelector(state => state.PersonaReducer.DocenteReducer.nombre)
        //console.log("Nuevo nombre:",nombre)
    }
    //console.log("params", params)
    /*
    const [routes, setRoutes] = useState([])

    const loadRoutes = async () => {
        const data = await getRutasLecturista(params);
        setRoutes(data)
    }
*/
    useEffect(() => {
        //loadRoutes();
        console.log(store.getState().PersonaReducer.DocenteReducer.nombre)
    }, [])



    return (
        <Layout>
            <Text style={{color:"#ffffff"}}>Welcome, eres un {rol}</Text>
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
