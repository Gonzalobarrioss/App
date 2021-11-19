import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import {Picker} from '@react-native-picker/picker';

import { getClaseXMateria } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { addClases, addIdClase } from '../redux/actions/ClaseAction';


const ClasePorMateriasList = () => {

    //const [clase, setClase] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const focus = useIsFocused()

    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {

        const loadClases = async () => {
            //console.log(materia)
            //console.log("buscando las clases")
            const data = await getClaseXMateria(materia);
           // console.log("data", data)
            store.dispatch(addClases(data))
           // console.log("array clases",data)
            //setClase(data)
        }
        if (materia) {
            loadClases();
            //console.log("materia", materia)
        }
        else{
            store.dispatch(addClases([]))
        }
        
        
    }, [materia])

    const clases = useSelector(state => state.ClasesReducer.clases)

    useEffect(() => {
            if ( clases.length > 0 ){
                //console.log("clase", clases)
                //console.log("length > 0",clases)
                //store.dispatch(addIdClase(clases[0].id))
                handleCurso(clases[0].curso_id, clases[0].id)
            }
            else{
                //console.log("length < 0", clases)
                handleCurso(0,0)
                //store.dispatch(addIdClase(0))

            }        
    }, [clases])

    const handleCurso = (curso,clase) => {
        try {
            setSelectedValue(curso)
            store.dispatch(getAlumnosPorCurso(curso))
            store.dispatch(addIdClase(clase))
        } catch (error) {
            console.log("handleClase",error)
        }
    }
   
    return (
        <View style={{ width: "90%", marginTop: "10%"}}>
            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    handleCurso(itemValue.curso, itemValue.clase)
                    //console.log("clase id", itemValue.clase)
                    }
                }
            >
                

                {
                    !clases.length > 0
                        ? (<Picker.Item label="SIN CLASES" enabled={false} value={{curso:0,clase:0}}/>)//(console.log("clase antes del render", clase))
                        : (clases.map((item, key)=> {
                            //console.log("desde map",item.id)
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
                                    value={{curso:item.curso_id, clase: item.id}} key={key}
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
