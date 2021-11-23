import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import { ScrollView, StyleSheet } from 'react-native'

import MateriasList from '../components/MateriasList'
import ClasePorMateriaList from '../components/ClasePorMateriaList'
import AlumnosPorCursoTableAsistencia from '../components/AlumnosPorCursoTableAsistencia'

import { useSelector } from 'react-redux'

const TomarAsistenciaScreen = ({navigation}) => {

    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {
    }, [materia])

    return (
        <ScrollView style={styles.container}>
            <Layout>
                <MateriasList />
                <ClasePorMateriaList/>
                <AlumnosPorCursoTableAsistencia navigation={navigation}/>
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

export default TomarAsistenciaScreen
