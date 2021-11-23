import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'

import {Picker} from '@react-native-picker/picker';

import { getClaseXMateria } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { addClases, addIdClase } from '../redux/actions/ClaseAction';


const ClasePorMateriasList = () => {

    const [selectedValue, setSelectedValue] = useState("");

    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {

        const loadClases = async () => {
            const data = await getClaseXMateria(materia);
            store.dispatch(addClases(data))
        }
        if (materia) {
            loadClases();
        }
        else{
            store.dispatch(addClases([]))
        }
        
        
    }, [materia])

    const clases = useSelector(state => state.ClasesReducer.clases)

    useEffect(() => {
            if ( clases.length > 0 ){
                handleCurso(clases[0].curso_id, clases[0].id)
            }
            else{
                handleCurso(0,0)
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
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    handleCurso(itemValue.curso, itemValue.clase)
                    }
                }
            >
                

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
