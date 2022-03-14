import React, { useEffect, useState } from 'react'
import { FlatList,View,Text, StyleSheet } from 'react-native'

import { getCalificaciones } from '../api'

import CalificacionesItem from './CalificacionesItem'

import { useSelector } from 'react-redux'

import { store } from '../redux/store'
import { isLoading } from '../redux/actions/LoadingAction';


const CalificacionesList = () => {

  
    const examen = useSelector(state => state.CalificacionesReducer.descripcion)
    const fecha = useSelector(state => state.CalificacionesReducer.fecha)
    const id_curso = useSelector(state => state.alumnosCursoReducer.cursoId)
    const etapa = useSelector(state => state.CalificacionesReducer.etapa)
    const [calificaciones, setCalificaciones] = useState([])
    

    useEffect(() => {
        let controller = new AbortController()
        let isMounted = true
        const loadCalificaciones = async () => {
            store.dispatch(isLoading(true))

                const datos={
                    descripcion: examen,
                    fecha:fecha,
                    curso: id_curso
                }
                console.log(datos)
                await getCalificaciones(datos,{
                    signal: controller.signal
                })
                .then((data)=> {
                    if (isMounted){
                        setCalificaciones(data) 
                        controller = null
                    }
                    
                })
                .catch((error) => {
                    console.log("error: ", error)
                })
                .finally(() => {
                    store.dispatch(isLoading(false))
                });
                   
        }
        loadCalificaciones()
        return () => { isMounted = false }
        //return () => controller?.abort()
    }, [examen,fecha,id_curso,etapa]);

    const renderItem = ({item}) => {
        return (
            <CalificacionesItem calificaciones={item} />
        )
    }


    return (
        <View style={{width: "100%"}}>
            { calificaciones.length ? <Text style={{marginVertical:3,textAlign:"center",fontSize:18,color:"#fff", marginTop: 10, textDecorationLine: "underline"}}>Calificaciones</Text> : null }
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