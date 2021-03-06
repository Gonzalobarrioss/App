import React, {useEffect, useState} from 'react'
import AsistenciasList from '../components/asistencias/AsistenciasList'
import Layout from '../components/Layout'
import { ActivityIndicator,Text, ScrollView } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'

import { useSelector } from 'react-redux'
import MateriasList from '../components/materias/MateriasList'
import ClasePorMateriasList from '../components/clases/ClasePorMateriaList'

import {store} from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { addIdClase } from '../redux/actions/ClaseAction'
import { addIdCurso } from '../redux/actions/AlumnoCursoAction'



const AsistenciasScreen = ({navigation}) => { 

  const materia = useSelector(state => state.MateriasReducer.id)
  const clase = useSelector(state => state.ClasesReducer.id)

  const [loading, setLoading] = useState(false)
  const isLoading = useSelector(state => state.LoadingReducer.loading)

  useEffect(() => {
    let controller = new AbortController()
    setLoading(isLoading)
    controller = null
    return () => {
      controller?.abort()    
    };
}, [isLoading]);

  useBackHandler(() => {
    let controller = new AbortController()
    const handleEvent = () => {
      store.dispatch(addIdMateria(0))
      store.dispatch(addIdClase(0))
      store.dispatch(addIdCurso(0))
      controller = null
    }
    if (navigation.getState().index == 4) {
      handleEvent()
    }
    controller?.abort()
    return  false
  })

  return ( 
    <ScrollView style={{backgroundColor:"#222f3e"}}>
      <Layout>
        { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

        <MateriasList /> 
        { materia ? <ClasePorMateriasList /> : null }
        { clase ? <AsistenciasList /> : null }
      </Layout>
      </ScrollView>
  )
}

export default AsistenciasScreen
