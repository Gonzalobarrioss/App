import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'

import MateriasList from '../components/MateriasList'
import ClasePorMateriaList from '../components/ClasePorMateriaList'
import AlumnosPorCursoTable from '../components/AlumnosPorCursoTable'

import { useSelector } from 'react-redux'

const TomarAsistenciaScreen = ({navigation}) => {

    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {
    }, [materia])

    return (
        <Layout>
            <MateriasList />
            <ClasePorMateriaList/>
            <AlumnosPorCursoTable navigation={navigation}/>
            
        </Layout>
    )
}


export default TomarAsistenciaScreen
