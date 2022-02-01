import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'

import {Picker} from '@react-native-picker/picker';

import { getClaseXMateria } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { addIdCurso, getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { addClases, addIdClase } from '../redux/actions/ClaseAction';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { addIdMateria } from '../redux/actions/MateriaAction';


const ClasePorMateriasList = () => {

    const [selectedValue, setSelectedValue] = useState(0);
    const [clases, setClases] = useState([])


    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {
        let controller = new AbortController()
        const loadClases = async () => {
            //console.log(selectedValue);
            const data = await getClaseXMateria(materia, {
                signal: controller.signal
            })
            if(!data.length){
               // console.log("paso");
                store.dispatch(addIdCurso(0))
            }
            else{
                store.dispatch(addIdCurso(selectedValue))
                //selectedValue ? store.dispatch(addIdCurso(data[0].curso_id)) : store.dispatch(addIdCurso(selectedValue))
                
            }
            setClases(data)
            controller =  null 
        }

        if(materia){
            console.log("loadclases")
            loadClases();
        }
        return () => controller?.abort()
    }, [materia]);

    const handleCurso = (value) => {
        try {
            if(value.curso){
                setSelectedValue(value.curso)
                store.dispatch(addIdCurso(value.curso))
                store.dispatch(addIdClase(value.clase))
            }
            
        } catch (error) {
            console.log("handleClase",error)
        }
    }
   
    return (
        <View style={styles.container}>

            <Picker
                style={styles.picker}
                dropdownIconColor='#ffffff'
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    handleCurso({curso: itemValue.curso, clase: itemValue.clase})
                    }
                }
            >
                <Picker.Item label={"Seleccione una clase"} enabled={false} value={{curso: 0, clase: 0}}  />

                {
                    !clases.length > 0
                        ? (<Picker.Item label="SIN CLASES PARA LA MATERIA SELECCIONADA" enabled={false} value={{curso:0,clase: 0}}/>)
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
