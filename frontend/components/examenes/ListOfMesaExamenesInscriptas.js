import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import Layout from '../Layout'
import { getMesaExamenInscriptas } from '../../api'

import MesaExamenInscriptasItem from './MesaExamenInscriptasItem'

import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import { isLoading } from '../../redux/actions/LoadingAction'

const ListOfMesaExamenesInscriptas = () => {

    const id_alumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

    const [mesasExamenesInscriptas, setMesasExamenesInscriptas] = useState([])

    const loading = useSelector(state => state.LoadingReducer.loading)
    
    useEffect(() => {
        let controller = new AbortController()
        store.dispatch(isLoading(true))
        const loadMesasExamenesInscriptas = async () => {
            await getMesaExamenInscriptas(id_alumno)
            .then((data) => {
                setMesasExamenesInscriptas(data)
                controller = null
            })
            .finally(()=>{
                store.dispatch(isLoading(false))
            })
            .catch((error)=> {
                console.log(error)
            })
        }
        
        loadMesasExamenesInscriptas()

        return () => { controller?.abort() }

    }, [])

    const renderItemMesasInscriptas = ({item}) => {
        return (
            <MesaExamenInscriptasItem mesa={item} />
        )
    }

    return (
        <>
            {
                loading 
                ? 
                    <Layout>
                        <ActivityIndicator color="#fff" size="large" style={{backgroundColor:"#222f3e"}}  /> 
                    </Layout>
                :
                    <FlatList
                        data={mesasExamenesInscriptas}
                        style= {{backgroundColor: "#222f3e"}}
                        keyExtractor = {(item) => item.id + ''}
                        renderItem={renderItemMesasInscriptas}
                    />
            }
        </>    
    )
}

export default ListOfMesaExamenesInscriptas