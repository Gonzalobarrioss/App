import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import { getMesaExamen} from '../api'
import MesaExamenesList from '../components/MesaExamenesList'
import Layout from '../components/Layout'

const HomeScreenAlumno = ({route, navigation}) => {
    const nombre = route.params.nombre
    const rol = route.params.rol
    //console.log(route.params)
    
    const [mesaExamen, setMesaExamen] = useState([])

    const loadMesaExamen = async () => {
        const data = await getMesaExamen();
        setMesaExamen(data)
    }

    useEffect(() => {
        loadMesaExamen();
    }, [])

    return (
        
        <Layout>
            <MesaExamenesList mesaExamen={mesaExamen} alumno={nombre}/>
        </Layout>
        
    )
}

const styles = StyleSheet.create({
    btnInscribirse :{
        padding: 7,
        borderRadius: 5,
        width: "90%",
        backgroundColor: "black"
    },
    txtInscribirse: {
        color: "#ffffff",
        textAlign: 'center'
    }
})

export default HomeScreenAlumno
