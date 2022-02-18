import React, { useEffect, useState } from 'react'
import { FlatList,View,Text, StyleSheet } from 'react-native'

import { getMesaExamen, getMesaExamenInscriptas } from '../api'

import MesaExamenItem from './MesaExamenItem'
import MesaExamenInscriptasItem from './MesaExamenInscriptasItem'

import { useSelector } from 'react-redux'
import { store } from '../redux/store'
import { isLoading } from '../redux/actions/LoadingAction'

const MesaExamenes = () => {

    const id_alumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const [mesasExamenes, setMesasExamenes] = useState([])
    const [mesasExamenesInscriptas, setMesasExamenesInscriptas] = useState([])

    const loading = useSelector(state => state.LoadingReducer.loading)
    //const render = useSelector(state => state.RenderReducer)
    useEffect(() => {
        let controller = new AbortController()

        const loadMesasExamenes = async () => {
            const data = await getMesaExamen(id_alumno);
            setMesasExamenes(data)
            controller = null 
        }
        const loadMesasExamenesInscriptas = async () => {
            const data = await getMesaExamenInscriptas(id_alumno);
            setMesasExamenesInscriptas(data)
            controller = null 
        }
        
        loadMesasExamenes()
        loadMesasExamenesInscriptas()
        return () => controller?.abort()
    }, [loading])

   

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