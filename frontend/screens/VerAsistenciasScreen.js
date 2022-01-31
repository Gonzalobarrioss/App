import React, {useEffect} from 'react'
import { Text } from 'react-native'
import AsistenciasList from '../components/AsistenciasList'
import Layout from '../components/Layout'

import { useIsFocused, useFocusEffect } from '@react-navigation/native'

import { useSelector } from 'react-redux'
import MateriasList from '../components/MateriasList'
import ClasePorMateriasList from '../components/ClasePorMateriaList'

const AsistenciasScreen = () => { 

  const clase = useSelector(state => state.ClasesReducer.id)
  //console.log(nombre_materia);
  //<Text style={{color: "#fff", fontSize:18}}>{nombre_materia ? nombre_materia : null}</Text>
  
  
  return ( 
    <Layout>
      <MateriasList /> 
      <ClasePorMateriasList />
      { clase ? <AsistenciasList /> : null }
    </Layout>
  )
}

export default AsistenciasScreen
