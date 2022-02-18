import React, { useEffect, useState } from 'react'
import { FlatList,View,Text, StyleSheet, Alert } from 'react-native'

import { getCalificaciones } from '../api'

import CalificacionesItem from './CalificacionesItem'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
//import { editCalificaciones } from '../redux/actions/CalificacionesAction'
import { isLoading } from '../redux/actions/LoadingAction';


const CalificacionesList = () => {

  
    const examen = useSelector(state => state.CalificacionesReducer.descripcion)
    const fecha = useSelector(state => state.CalificacionesReducer.fecha)
    const id_curso = useSelector(state => state.alumnosCursoReducer.cursoId)
    const [calificaciones, setCalificaciones] = useState([])
    const [message, setMessage] = useState(null)

   
    

    useEffect(() => {
        store.dispatch(isLoading(true))
        let controller = new AbortController()

        const loadCalificaciones = async () => {

                const datos={
                    descripcion: examen,
                    fecha:fecha,
                    curso: id_curso
                }
                const data = await getCalificaciones(datos,{
                    signal: controller.signal
                })
                .finally(() => {
                    store.dispatch(isLoading(false))
                });
                if (data){
                    console.log("data", data)
                    setCalificaciones(data) 
                }            
                controller = null
        }
        loadCalificaciones()
        return () => controller?.abort()
    }, [examen,fecha,id_curso]);

    const renderItem = ({item}) => {
        return (
            <CalificacionesItem calificaciones={item} />
        )
    }


    return (
        <View style={{width: "100%"}}>
            <Text style={styles.textInfo}> {message ? message : null} </Text>
            <FlatList
                data={calificaciones}
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

export default CalificacionesList