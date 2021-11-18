import React, {useState, useEffect} from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import CursosList from '../components/CursosList'
import { saveNota, getNota, updateNota } from '../api'
import AlumnosPorCursoTableCalificacion from '../components/AlumnosPorCursoTableCalificacion'
import { useSelector } from 'react-redux';

const CalificarScreen = () => {
    
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    useEffect(() => {
        
    }, [regimen])

    return (
        <Layout>
            
            <MateriasList />

            <Text style={{color:"#fff", fontSize: 16}}> Regimen: {regimen} </Text>
            
            <CursosList />

            <AlumnosPorCursoTableCalificacion/>
                      
        </Layout>
    )
}




export default CalificarScreen
