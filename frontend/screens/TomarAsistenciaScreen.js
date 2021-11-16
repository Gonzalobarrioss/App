import React, {useEffect, useState} from 'react'
import { StyleSheet,Text,TouchableOpacity } from 'react-native'
import { getMesaExamen} from '../api'
import Layout from '../components/Layout'

import MateriasList from '../components/MateriasList'
import ClasePorMateriaList from '../components/ClasePorMateriaList'
import CursosPorClaseList from '../components/CursoPorClaseList'
import AlumnosPorCursoList from '../components/AlumnosPorCursoList'
import AlumnosPorCursoTable from '../components/AlumnosPorCursoTable'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'

const TomarAsistenciaScreen = () => {

    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {
        //console.log("el id de la materia ", materia)
    }, [materia])

//<AlumnosPorCursoList />
//<CursosPorClaseList/>
    return (
        <Layout>
            <MateriasList />
            <ClasePorMateriaList/>
            <AlumnosPorCursoTable/>
            <TouchableOpacity style={styles.btnGuardarAsistencia}>
                <Text style={styles.txtGuardarAsistencia}>Guardar Asistencia</Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    btnGuardarAsistencia:{
        backgroundColor: "#ffffff",
        padding: 7,
        borderRadius: 5,
        fontSize: 18,
        width: "90%"
    },
    txtGuardarAsistencia:{
        textAlign: 'center',
        fontSize:16
    }
})
export default TomarAsistenciaScreen
