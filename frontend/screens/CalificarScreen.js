import React, {useEffect, useState} from 'react'
import { Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import CursosList from '../components/CursosList'
import AlumnosPorCursoTableCalificacion from '../components/AlumnosPorCursoTableCalificacion'
import { useSelector } from 'react-redux';

const CalificarScreen = ({navigation}) => {
    
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    const materia = useSelector(state => state.MateriasReducer.id)
    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)

    const isLoading = useSelector(state => state.LoadingReducer.loading)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let controller = new AbortController()
        setLoading(isLoading)
        controller = null
        return () => {
            controller?.abort()    
        };
    }, [isLoading]);

    return (
        <ScrollView style={styles.container}>
            <Layout>
                { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

                <MateriasList /> 
                { materia ? <Text style={{color:"#fff", fontSize: 18, marginVertical: 10}}> Regimen: {regimen ? regimen : null} </Text> : null }
                { materia ? <CursosList /> : null }
                { curso ? <AlumnosPorCursoTableCalificacion navigation={navigation}/> : null }
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor: "#222f3e"
    }
})

export default CalificarScreen
