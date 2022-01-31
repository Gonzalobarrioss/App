import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'

import {Picker} from '@react-native-picker/picker';

import { getClaseXMateria } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { addIdCurso, getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { addClases, addIdClase } from '../redux/actions/ClaseAction';

import { useFocusEffect } from '@react-navigation/native';


const ClasePorMateriasList = () => {

    const [selectedValue, setSelectedValue] = useState(0);
    const [clases, setClases] = useState([])

    const materia = useSelector(state => state.MateriasReducer.id)
    useFocusEffect(
        
        React.useCallback(() => {
            let controller = new AbortController()
            const loadClases = async () => {
                setSelectedValue("Seleccione una clase")
                //console.log("materia", materia)
                const data = await getClaseXMateria(materia, {
                    signal: controller.signal
                });
                setClases(data)
                store.dispatch(addIdCurso(0))
                controller =  null 
                //store.dispatch(addIdClase(0))
                //store.dispatch(addClases(data))
            }
            console.log("loadclases")
            loadClases();
            return () => controller?.abort()
        },[materia])
    )
    /*
    useEffect(() => {

        const loadClases = async () => {
            setSelectedValue("Seleccione una clase")
            store.dispatch(addIdCurso(0))
            store.dispatch(addIdClase(0))
            const data = await getClaseXMateria(materia);
            //console.log(data)
            store.dispatch(addClases(data))
        }

        loadClases();
        
    }, [materia])
*/
    //const clases = useSelector(state => state.ClasesReducer.clases)

    /*useEffect(() => {
        //console.log("clases", clases)
            if ( clases.length > 0 ){
                console.log("hay clases")
                handleCurso(clases[0].curso_id, clases[0].id)
            }
            else{
                console.log("no hay clases")
                handleCurso(0,0)
            }        
    }, [clases])*/

    const handleCurso = (curso,clase) => {
        console.log("handle Curso", curso, clase)
        try {
            setSelectedValue(curso)
            //store.dispatch(getAlumnosPorCurso(curso))
            store.dispatch(addIdCurso(curso))
            store.dispatch(addIdClase(clase))
        } catch (error) {
            console.log("handleClase",error)
        }
    }
   
    return (
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                defaultVa
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    handleCurso(itemValue.curso, itemValue.clase)
                    }
                }
                
            >
                <Picker.Item label={"Seleccione una clase"} enabled={false} value={{curso:0,clase:0}}/>

                {
                    !clases.length > 0
                        ? (<Picker.Item label="SIN CLASES" enabled={false} value={{curso:0,clase:0}}/>)
                        : (clases.map((item, key)=> {
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
}

const styles = StyleSheet.create({
    container:{
        width: "90%", 
        marginTop: "10%",
        borderWidth: 2, 
        borderColor: '#10ac84', 
        borderRadius: 5
    },
    picker:{
        color:"#fff",
        height: 50,
    }
})

export default ClasePorMateriasList
