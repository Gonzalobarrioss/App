import React, {useEffect} from 'react'
import { Text } from 'react-native'
import AsistenciasList from '../components/AsistenciasList'
import Layout from '../components/Layout'

import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'

import { useSelector } from 'react-redux'
import MateriasList from '../components/MateriasList'
import ClasePorMateriasList from '../components/ClasePorMateriaList'

import {store} from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { addIdClase } from '../redux/actions/ClaseAction'
import { addIdCurso } from '../redux/actions/AlumnoCursoAction'



const AsistenciasScreen = ({navigation}) => { 

  const materia = useSelector(state => state.MateriasReducer.id)
  const clase = useSelector(state => state.ClasesReducer.id)
  console.log(navigation.getState().index)
  //console.log(nombre_materia);
  //<Text style={{color: "#fff", fontSize:18}}>{nombre_materia ? nombre_materia : null}</Text>
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
    <Layout>
      <MateriasList /> 
      { materia ? <ClasePorMateriasList /> : null }
      { clase ? <AsistenciasList /> : null }
    </Layout>
  )
}

export default AsistenciasScreen
