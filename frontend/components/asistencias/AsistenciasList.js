import React, { useEffect, useState } from 'react'
import { FlatList,View,Text, StyleSheet } from 'react-native'

import { getAsistencias } from '../../api'

import AsistenciaItem from './AsistenciaItem'

import { useSelector } from 'react-redux'

import { store } from '../../redux/store'
import { isLoading } from '../../redux/actions/LoadingAction';


const AsistenciasList = () => {

    const claseId = useSelector(state => state.ClasesReducer.id)
    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    const [asistencias, setAsistencias] = useState([])
    const [message, setMessage] = useState(null)

   
    

    useEffect(() => {
        let controller = new AbortController()
        let isMounted = true
        const loadAsistencias = async () => {
            store.dispatch(isLoading(true))

            const date = new Date()

            const year = date.getFullYear()
            const month = date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1 
            const day = date.getDate() < 10 ? "0"+(date.getDate()) : date.getDate()
            
            const fecha = year + "-" + month + "-" + day
            
            const datos = {
                claseId : claseId,
                fecha: fecha,
                docente: id_docente
            }

            await getAsistencias(datos,{
                signal: controller.signal
            })
            .then((data)=>{
                if(isMounted){
                    setAsistencias(data) 
                    data.length ? setMessage('Listado de Asistencias de la fecha:') : setMessage("No se registró asistencias el dia de hoy")
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
        claseId ? loadAsistencias() : setMessage('')

        return () => { isMounted = false }
        //return () => controller?.abort()

    }, [claseId]);

    const renderItem = ({item}) => {
        return (
            <AsistenciaItem asistencias={item} />
        )
    }


    return (
        <View style={{width: "100%", height: "100%"}}>
            <Text style={styles.textInfo}>{message ? message : null}</Text>
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
        fontSize: 18,
        textDecorationLine: "underline"
    }
})

export default AsistenciasList