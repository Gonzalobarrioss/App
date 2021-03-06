import React, {useEffect, useState} from 'react'
import CalificacionesList from '../components/calificaciones/CalificacionesList'
import Layout from '../components/Layout'
import { ActivityIndicator,Text, StyleSheet, View, ScrollView } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'
import {Picker} from '@react-native-picker/picker';

import { useSelector } from 'react-redux'
import MateriasList from '../components/materias/MateriasList'
import CursosDocenteMateriaList from '../components/materias/CursosDocenteMateriaList'

import { addIdMateria } from '../redux/actions/MateriaAction'
import { addDescripcion, setEtapa, setFecha } from '../redux/actions/CalificacionesAction'
import { store } from '../redux/store'


import { getDescripcionNotas } from '../api'
import EtapaExamen from '../components/examenes/EtapaExamen'
import { isLoading } from '../redux/actions/LoadingAction'
import { addIdCurso } from '../redux/actions/AlumnoCursoAction'



const CalificacionesScreen = ({navigation}) => { 

  const materia = useSelector(state => state.MateriasReducer.id)
  const regimen = useSelector(state => state.MateriasReducer.regimen)
  const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
  const etapa = useSelector(state => state.CalificacionesReducer.etapa)
  const id_curso = useSelector(state => state.alumnosCursoReducer.cursoId)

  const [descripcion, setDescripcion] = useState([])
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState("")

  const loading = useSelector(state => state.LoadingReducer.loading)

  useEffect(() => {
    let controller = new AbortController()
    let isMounted = true
    const getDescripcion = async () => {
      store.dispatch(isLoading(true))

      const datos = {
        docente: id_docente,
        materia: materia,
        etapa: etapa,
        curso: id_curso
      }
      //console.log("datos",datos)
      await getDescripcionNotas(datos)
      .then((data) => {
        if ( isMounted ){
          data.length ? setDescripcion(data) : setDescripcion([])
          controller = null
        }
        
      })
      .catch((error) => {
        console.log("error: ", error)
      })
      .finally(()=>store.dispatch(isLoading(false)))
      //console.log("data",data)
      
    }

    materia && etapa ? getDescripcion() : store.dispatch(isLoading(false))

    return () => { isMounted = false }
    //return () => {controller?.abort()    };
  }, [materia,id_docente,etapa,id_curso]);


  useBackHandler(() => {
    let controller = new AbortController()
    const handleEvent = async () => {
      await store.dispatch(addIdMateria(0))
      await store.dispatch(setEtapa(0))
      await store.dispatch(addIdCurso(0))
      controller = null
      navigation.navigate("CalificarScreen")
    }
    if (navigation.getState().index == 4) {
      handleEvent()
    }
    controller?.abort()
    return  true

  })

  const handleDescripcion = (value) => {
    setDescripcionSeleccionada(value.descripcion)
    store.dispatch(addDescripcion(value.descripcion))
    store.dispatch(setFecha(value.fecha))
  }

  return ( 
    <ScrollView style={{backgroundColor:"#222f3e"}}>
      <Layout>
        { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

        <MateriasList /> 
          { materia ? <Text style={{color:"#fff", fontSize: 20, marginVertical: 10}}> Regimen: {regimen ? regimen : null} </Text> : null }
          { materia ? <EtapaExamen /> : null }

          { etapa ? <CursosDocenteMateriaList /> : null }

          { materia && id_curso && etapa ? 
            <View style={styles.container}> 
            
                <Picker
                  style={styles.picker}
                  dropdownIconColor="#ffffff"
                  selectedValue={descripcionSeleccionada}
                  onValueChange={(item) => handleDescripcion(item)}    
                >
                  <Picker.Item label ={"Seleccione examen"} enabled={false} style={styles.pickerItem} />
                {
                  descripcion.length 
                  ?
                    descripcion.map((item,key)=>{
                      return ( <Picker.Item label={item.descripcion+' - '+item.fecha.slice(0,10)} value={{descripcion:item.descripcion,fecha:item.fecha.slice(0,10)}} key={key} style={styles.pickerItem} />)
                    })
                  : <Picker.Item label={"NO HAY EX??MENES"} enabled={false} style={styles.pickerItem}  />
                }      
              </Picker>
            </View>
          : null
          }

          { descripcionSeleccionada ? <CalificacionesList /> : null }

          
      </Layout>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  picker:{
      color:"#fff",
      height: 70,
      width: "100%"
  },
  pickerItem:{
    fontSize:20
  },
  container:{
    width: "100%", 
    marginTop: "10%",
    borderWidth: 2, 
    borderColor: '#10ac84', 
    borderRadius: 5,
  },
})

export default CalificacionesScreen
