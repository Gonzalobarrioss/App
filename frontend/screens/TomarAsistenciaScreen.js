import React, {useEffect} from 'react'
import Layout from '../components/Layout'

import MateriasList from '../components/MateriasList'
import ClasePorMateriaList from '../components/ClasePorMateriaList'
import AlumnosPorCursoTableAsistencia from '../components/AlumnosPorCursoTableAsistencia'

import { useSelector } from 'react-redux'

const TomarAsistenciaScreen = ({navigation}) => {

    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {
    }, [materia])

    return (
        <Layout>
            <MateriasList />
            <ClasePorMateriaList/>
            <AlumnosPorCursoTableAsistencia navigation={navigation}/>
        </Layout>
    )
}


export default TomarAsistenciaScreen
