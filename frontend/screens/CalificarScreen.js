import React, {useEffect} from 'react'
import { Text } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import CursosList from '../components/CursosList'
import AlumnosPorCursoTableCalificacion from '../components/AlumnosPorCursoTableCalificacion'
import { useSelector } from 'react-redux';

const CalificarScreen = ({navigation}) => {
    
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    useEffect(() => {
        
    }, [regimen])

    return (
        <Layout>
            
            <MateriasList />

            <Text style={{color:"#fff", fontSize: 18, marginVertical: 10}}> Regimen: {regimen} </Text>
            
            <CursosList />

            <AlumnosPorCursoTableCalificacion navigation={navigation}/>
                      
        </Layout>
    )
}




export default CalificarScreen
