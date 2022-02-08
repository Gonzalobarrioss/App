import React, {useEffect, useState} from 'react'
//import CalificacionesList from '../components/CalificacionesList'
import Layout from '../components/Layout'
import { ActivityIndicator,Text, StyleSheet, View } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { useBackHandler } from '@react-native-community/hooks'
import {Picker} from '@react-native-picker/picker';

import { useSelector } from 'react-redux'
import MateriasList from '../components/MateriasList'
//import ClasePorMateriasList from '../components/ClasePorMateriaList'

import {store} from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { addIdClase } from '../redux/actions/ClaseAction'
import { addIdCurso } from '../redux/actions/AlumnoCursoAction'

import { getDescripcionNotas } from '../api'
import EtapaExamen from '../components/EtapaExamen'



const CalificacionesScreen = ({navigation}) => { 

  const materia = useSelector(state => state.MateriasReducer.id)
  const regimen = useSelector(state => state.MateriasReducer.regimen)
  const idDocente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
  const etapa = useSelector(state => state.EtapaReducer.etapa)
  /*const [etapa, setEtapa] = useState([])
  const [etapaSeleccionada, setEtapaSeleccionada] = useState("")*/
  const [descripcion, setDescripcion] = useState([])
  const [descripcionSeleccionada, setDescripcionSeleccionada] = useState("")

  //const clase = useSelector(state => state.ClasesReducer.id)

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
        docente: idDocente,
        materia: materia,
        etapa: etapa
      }
      const data = await getDescripcionNotas(datos)
      
      if(data.length){
        setDescripcion(data)
        //console.log(data);
      }
      controller = null
    }

    materia && etapa ? getDescripcion() : null

    return () => {
      controller?.abort()    
    };
  }, [materia,idDocente,etapa]);

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
        <View style={{width:"100%", justifyContent:'center', alignItems:'center'}}>
          <View>
            { materia ? <Text style={{color:"#fff", fontSize: 18, marginVertical: 10}}> Regimen: {regimen ? regimen : null} </Text> : null }
          </View>
          { regimen ? <EtapaExamen /> : null }

          {descripcion.length ? 
            <View style={styles.container}> 
            
                <Picker
                  style={styles.picker}
                  selectedValue={descripcionSeleccionada}
                  onValueChange={(itemValue) => setDescripcionSeleccionada(itemValue)}    
                >
                  <Picker.Item label ={"Seleccione examen"} enabled={false} />
                {
                  descripcion.map((item,key)=>{
                    return ( <Picker.Item label={item.descripcion} value={item.descripcion} key={key} />)
                  })
                }      
              </Picker>
            </View>
          : null
          }

          
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
