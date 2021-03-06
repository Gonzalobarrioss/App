import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import { ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import MateriasList from '../components/materias/MateriasList'
import ClasePorMateriaList from '../components/clases/ClasePorMateriaList'
import AlumnosPorCursoTableAsistencia from '../components/asistencias/AlumnosPorCursoTableAsistencia'

import { useSelector } from 'react-redux'
import { store } from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { addIdClase } from '../redux/actions/ClaseAction'

import { useIsFocused } from '@react-navigation/native'

const TomarAsistenciaScreen = ({navigation}) => {

    const materia = useSelector(state => state.MateriasReducer.id)
    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)
    const isLoading = useSelector(state => state.LoadingReducer.loading)

    const [loading, setLoading] = useState(false)

    const isFocused = useIsFocused();

    useEffect(() => {
        let controller = new AbortController()
        setLoading(isLoading)
        controller = null
        return () => {
            controller?.abort()    
        };
    }, [isLoading]);
    

    React.useLayoutEffect(() => {
        let controller = new AbortController()
        const handleAsistencia = () => {
            store.dispatch(addIdMateria(0))
            store.dispatch(addIdClase(0))
            controller = null
            navigation.navigate("Ver Asistencias")
        }

        navigation.setOptions({
            headerRight: () => (           
                <TouchableOpacity
                    onPress = { 
                        () => {handleAsistencia()}
                    }
                    style = { styles.btnVerAsistencias}
                >                        
                    <Text style = { styles.txtVerAsistencias }>Ver asistencia</Text>                        
                </TouchableOpacity>                         
            )
        })
        return () => controller?.abort()
    }, [])                           
                 

                
    return (
        <ScrollView style={styles.container}>
            <Layout>
                { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

                { isFocused ? <MateriasList /> : null }
                { materia  ? <ClasePorMateriaList/> : null}
                { curso ? <AlumnosPorCursoTableAsistencia navigation={navigation}/> : null}
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor: "#222f3e"
    },
    btnVerAsistencias: {
        backgroundColor: "#10ac84",
        padding: 7,
        borderRadius: 5
    },
    txtVerAsistencias: {
        color: "#ffffff",
        fontSize: 20,

    }
})

export default TomarAsistenciaScreen
