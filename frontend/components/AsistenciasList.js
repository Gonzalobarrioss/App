import React, { useEffect, useState } from 'react'
import { FlatList,View,Text, StyleSheet, Alert } from 'react-native'

import { getAsistencias } from '../api'

import AsistenciaItem from './AsistenciaItem'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { editAsistencias } from '../redux/actions/AsistenciasAction'
import { isLoading } from '../redux/actions/LoadingAction';


const AsistenciasList = () => {

    const focus = useIsFocused()
    const claseId = useSelector(state => state.ClasesReducer.id)
    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    const asis = useSelector(state => state.AsistenciasReducer.asistencias)
    //console.log(fecha)
    const [asistencias, setAsistencias] = useState([])
    const [message, setMessage] = useState(null)

   
    

    useEffect(() => {
        store.dispatch(isLoading(true))
        let controller = new AbortController()

        const loadAsistencias = async () => {

            const date = new Date()

            const year = date.getFullYear()
            const month = date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1 
            const day = date.getDate() < 10 ? "0"+(date.getDate()) : date.getDate()
            
            const fecha = year + "-" + month + "-" + day
            
            
            if (claseId){
                const datos = {
                    claseId : claseId,
                    fecha: fecha,
                    docente: id_docente
                }
                const data = await getAsistencias(datos,{
                    signal: controller.signal
                })
                .finally(() => {
                    store.dispatch(isLoading(false))
                });
                if (data){
                    console.log("edita");
                    //store.dispatch(editAsistencias(data))
                    setAsistencias(data) 
                }
                data.length ? setMessage('') : setMessage("No se registró asistencias el dia de hoy.")
            
                controller = null
            }
            else{
                setMessage('')
            }
        }
        loadAsistencias()
        return () => controller?.abort()
    }, [claseId]);

    const renderItem = ({item}) => {
        return (
            <AsistenciaItem asistencias={item} />
        )
    }


    return (
        <View style={{width: "100%", height: "100%"}}>
            <Text style={styles.textInfo}> {message ? message : null} </Text>
            <FlatList
                data={asistencias}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItem}
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

export default AsistenciasList