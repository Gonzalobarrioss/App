import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import {Picker} from '@react-native-picker/picker';

import { getClaseXMateria } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'


const ClasePorMateriasList = () => {

    const [clase, setClase] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const focus = useIsFocused()

    const materia = useSelector(state => state.MateriasReducer.id)

    const loadClases = async () => {
        //console.log(materia)
        //console.log("buscando las clases")
        const data = await getClaseXMateria(materia);
       // console.log("array clases",data)
        setClase(data)
    }

    useEffect(() => {
        //console.log("cargando materia", materia)
        loadClases();
    }, [materia])

   const handleCurso = (value) => {
        try {
            setSelectedValue(value)
           // console.log("id del curso", value)
            store.dispatch(getAlumnosPorCurso(value))
        } catch (error) {
            console.log("handleClase",error)
        }
   }
   
    return (
        <View style={{ width: "90%", marginTop: "10%"}}>
            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => handleCurso(itemValue)}
            >
                {
                    !clase.length > 0
                        ? (null)//(console.log("clase antes del render", clase))
                        : (clase.map((item, key)=> {
                            //console.log("curso id es", item.curso_id,"El aula es", item.descripcion)
                            
                            return(
                                <Picker.Item 
                                    label={ item.grado_ano+" '"+item.division+"' - "+
                                    item.dias+
                                    " de "+
                                    (item.horario_inicio.slice(0,5))+
                                    " a "+
                                    (item.horario_fin.slice(0,5))+
                                    " - aula: "+
                                    item.descripcion
                                } 
                                    value={item.curso_id} key={key}
                                />
                            )
                        }))
                }
            </Picker>
        </View>

       
    )

}/*
*/
export default ClasePorMateriasList
