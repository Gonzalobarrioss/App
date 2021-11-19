import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'

import MateriasList from '../components/MateriasList'
import ClasePorMateriaList from '../components/ClasePorMateriaList'
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
            
        </Layout>
    )
}


export default TomarAsistenciaScreen
