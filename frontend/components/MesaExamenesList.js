import React, { useEffect, useState } from 'react'
import { FlatList,View,Text, StyleSheet } from 'react-native'

import { getMesaExamen, getMesaExamenInscriptas } from '../api'

import MesaExamenItem from './MesaExamenItem'
import MesaExamenInscriptasItem from './MesaExamenInscriptasItem'

import { useSelector } from 'react-redux'

const MesaExamenes = () => {

    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const [mesasExamenes, setMesasExamenes] = useState([])
    const [mesasExamenesInscriptas, setMesasExamenesInscriptas] = useState([])

    const render = useSelector(state => state.RenderReducer)
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
    }, [render])

   

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
            <Text style={styles.textInfo}>MESA DE EXAMENES</Text>
            <FlatList
                style={{width: "100%", height: "50%"}} 
                data={mesasExamenes}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItem}
            />
            <Text style={styles.textInfo}>MESAS INSCRIPTAS</Text>
            <FlatList
                style={{width: "100%", height: "50%"}} 
                data={mesasExamenesInscriptas}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItemMesasInscriptas}
            />   
        </View>         
    )
}

const styles = StyleSheet.create({
    textInfo:{
        marginVertical: 3,
        color:"#fff",
        textAlign: 'center',
        fontSize: 18
    }
})

export default MesaExamenes