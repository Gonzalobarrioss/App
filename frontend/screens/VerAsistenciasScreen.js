import React, {useEffect} from 'react'
import AsistenciasList from '../components/AsistenciasList'
import Layout from '../components/Layout'

import { useIsFocused, useFocusEffect } from '@react-navigation/native'

import { useSelector } from 'react-redux'

const AsistenciasScreen = () => { 

//const asistencia = useSelector(state => state.asistencia)
  
  return ( 
    <Layout>
      <AsistenciasList />
    </Layout>
  )
}

export default AsistenciasScreen
