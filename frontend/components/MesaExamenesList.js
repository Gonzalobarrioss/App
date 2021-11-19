import React, { useEffect, useState } from 'react'
import { FlatList,View } from 'react-native'

import { getMesaExamen, getMesaExamenInscriptas } from '../api'

import MesaExamenItem from './MesaExamenItem'
import MesaExamenInscriptasItem from './MesaExamenInscriptasItem'

import { useSelector } from 'react-redux'

const MesaExamenes = () => {

    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const [mesasExamenes, setMesasExamenes] = useState([])
    const [mesasExamenesInscriptas, setMesasExamenesInscriptas] = useState([])

    useEffect(() => {
        const loadMesasExamenes = async () => {
            const data = await getMesaExamen(idAlumno);
            setMesasExamenes(data)
        }
        const loadMesasExamenesInscriptas = async () => {
            const data = await getMesaExamenInscriptas(idAlumno);
            setMesasExamenesInscriptas(data)
        }
        loadMesasExamenes()
        loadMesasExamenesInscriptas()
    }, [])

    /*const render = useSelector(state => state.RenderReducer)
    useEffect(() => {
        
    }, [render])*/

    const renderItem = ({item}) => {
        return (
            <MesaExamenItem mesa={item} />
        )
    }

    const renderItemMesasInscriptas = ({item}) => {
        return (
            <MesaExamenInscriptasItem mesa={item} />
        )
    }

    return (
        <View style={{width: "100%", height: "100%"}}>
            <FlatList
                style={{width: "100%", height: "50%"}} 
                data={mesasExamenes}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItem}
            />
            <FlatList
                style={{width: "100%", height: "50%"}} 
                data={mesasExamenesInscriptas}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItemMesasInscriptas}
            />   
        </View>         
    )
}

export default MesaExamenes