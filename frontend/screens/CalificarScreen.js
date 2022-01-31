import React, {useEffect} from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import CursosList from '../components/CursosList'
import AlumnosPorCursoTableCalificacion from '../components/AlumnosPorCursoTableCalificacion'
import { useSelector } from 'react-redux';

const CalificarScreen = ({navigation}) => {
    
    const regimen = useSelector(state => state.MateriasReducer.regimen)

    return (
        <ScrollView style={styles.container}>
            <Layout>
                <MateriasList />
                <Text style={{color:"#fff", fontSize: 18, marginVertical: 10}}> Regimen: {regimen ? regimen : null} </Text>
                <CursosList />
                <AlumnosPorCursoTableCalificacion navigation={navigation}/>
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
