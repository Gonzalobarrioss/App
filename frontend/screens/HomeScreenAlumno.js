import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { getMesaExamen } from '../api'
import MesaExamenesList from '../components/MesaExamenesList'
import Layout from '../components/Layout'

const HomeScreenAlumno = ({route, navigation}) => {
    const nombre = route.params.id
    const rol = route.params.rol
    //console.log("params", params)
    
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
            <MesaExamenesList mesaExamen={mesaExamen}/>
        </Layout>
        
    )
}

export default HomeScreenAlumno
