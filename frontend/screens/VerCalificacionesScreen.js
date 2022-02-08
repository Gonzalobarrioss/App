import React, {useEffect, useState} from 'react'
//import CalificacionesList from '../components/CalificacionesList'
import Layout from '../components/Layout'
import { ActivityIndicator,Text } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'

import { useSelector } from 'react-redux'
import MateriasList from '../components/MateriasList'
//import ClasePorMateriasList from '../components/ClasePorMateriaList'

import {store} from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { addIdClase } from '../redux/actions/ClaseAction'
import { addIdCurso } from '../redux/actions/AlumnoCursoAction'



const CalificacionesScreen = ({navigation}) => { 

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

  //console.log(navigation.getState().index)
  //console.log(nombre_materia);
  //<Text style={{color: "#fff", fontSize:18}}>{nombre_materia ? nombre_materia : null}</Text>
  useBackHandler(() => {
    let controller = new AbortController()
    const handleEvent = () => {
      store.dispatch(addIdMateria(0))
      store.dispatch(addIdClase(0))
      store.dispatch(addIdCurso(0))
      controller = null
      //navigation.navigate("TomarCalificacionescreen")
      console.log("paso");
    }
    if (navigation.getState().index == 4) {
      console.log("handleEvent");
      handleEvent()
    }
    controller?.abort()
    return  false

  })

 // { clase ? <CalificacionesList /> : null }
 //        { materia ? <ClasePorMateriasList /> : null }

  return ( 
      <Layout>
        { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

        <MateriasList /> 
       
      </Layout>

  )
}

export default CalificacionesScreen
