import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'

import { getMesaExamen } from '../../api'

import MesaExamenItem from './MesaExamenItem'

import { useSelector } from 'react-redux'

import { isLoading } from '../../redux/actions/LoadingAction'
import { store } from '../../redux/store'

import Layout from '../Layout'

const ListOfMesaExamenes = () => {

    const id_alumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const [mesasExamenes, setMesasExamenes] = useState([])

    const loading = useSelector(state => state.LoadingReducer.loading)
    useEffect(() => {
        let controller = new AbortController()
        store.dispatch(isLoading(true))
        const loadMesasExamenes = async () => {
            await getMesaExamen(id_alumno)
            .then((data) => {
                setMesasExamenes(data)
                controller = null 
            })
            .finally(() => {
                store.dispatch(isLoading(false))
            })
            .catch((error) => {
                console.log("error: ", error)
            })  
        }
        
        loadMesasExamenes()

        return () => { controller?.abort() }

    }, [])

    const renderItem = ({item}) => {
        return (
            <MesaExamenItem mesa={item} />
        )
    }
    
    return (
        <>
            {
                loading ? 
                    <Layout>
                        <ActivityIndicator color="#fff" size="large" style={{backgroundColor:"#222f3e"}}  /> 
                    </Layout>
                    
                :
                    <FlatList
                        data={mesasExamenes}
                        style= {{backgroundColor: "#222f3e"}}
                        keyExtractor = {(item) => item.id + ''}
                        renderItem={renderItem}
                    />
            }
        </>
          
    )
}

export default ListOfMesaExamenes