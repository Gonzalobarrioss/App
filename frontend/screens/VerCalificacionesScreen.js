import React, {useEffect, useState} from 'react'
import CalificacionesList from '../components/CalificacionesList'
import Layout from '../components/Layout'
import { ActivityIndicator,Text, StyleSheet, View } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'
import {Picker} from '@react-native-picker/picker';

import { useSelector } from 'react-redux'
import MateriasList from '../components/MateriasList'

import { addIdMateria } from '../redux/actions/MateriaAction'
import { addDescripcion } from '../redux/actions/CalificacionesAction'
import { store } from '../redux/store'


import { getDescripcionNotas } from '../api'
import EtapaExamen from '../components/EtapaExamen'



const CalificacionesScreen = ({navigation}) => { 

  const materia = useSelector(state => state.MateriasReducer.id)
  const regimen = useSelector(state => state.MateriasReducer.regimen)
  const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
  const etapa = useSelector(state => state.CalificacionesReducer.etapa)

  const [descripcion, setDescripcion] = useState([])
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState("")

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

  useEffect(() => {
    let controller = new AbortController()
    const getDescripcion = async () => {
      const datos = {
        docente: id_docente,
        materia: materia,
        etapa: etapa
      }
      const data = await getDescripcionNotas(datos)

      data.length ? setDescripcion(data) : setDescripcion([])
      controller = null
    }

    console.log("obtiene")
    materia && etapa ? getDescripcion() : null

    return () => {
      controller?.abort()    
    };
  }, [materia,id_docente,etapa]);


  useBackHandler(() => {
    let controller = new AbortController()
    const handleEvent = async () => {
      
      await store.dispatch(addIdMateria(0))
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

  const handleDescripcion = (value) => {
    setDescripcionSeleccionada(value)
    store.dispatch(addDescripcion(value))
  }

  return ( 
      <Layout>
        { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

        <MateriasList /> 
        <View style={{width:"100%", justifyContent:'center', alignItems:'center'}}>
          <View>
            { materia ? <Text style={{color:"#fff", fontSize: 18, marginVertical: 10}}> Regimen: {regimen ? regimen : null} </Text> : null }
          </View>
          { materia ? <EtapaExamen /> : null }

          { etapa ? 
            <View style={styles.container}> 
            
                <Picker
                  style={styles.picker}
                  selectedValue={descripcionSeleccionada}
                  onValueChange={(itemValue) => handleDescripcion(itemValue)}    
                >
                  <Picker.Item label ={"Seleccione examen"} enabled={false} />
                {
                  descripcion.length 
                  ?
                    descripcion.map((item,key)=>{
                      return ( <Picker.Item label={item.descripcion} value={item.descripcion} key={key} />)
                    })
                  : <Picker.Item label={"NO HAY EXÁMENES"} enabled={false} />
                }      
              </Picker>
            </View>
          : null
          }

          { descripcionSeleccionada ? <CalificacionesList /> : null }

          
        </View>
      </Layout>

  )
}

const styles = StyleSheet.create({
  picker:{
      color:"#fff",
      height: 50,
  },
  container:{
    width: "90%", 
    marginTop: "10%",
    borderWidth: 2, 
    borderColor: '#10ac84', 
    borderRadius: 5,
    
  },
})

export default CalificacionesScreen
