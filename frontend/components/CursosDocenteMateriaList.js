import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';

import { getCursosDocenteMateria } from '../api'

import { addIdCurso } from '../redux/actions/AlumnoCursoAction'

import { store } from '../redux/store'

import { isLoading } from '../redux/actions/LoadingAction';

import { useSelector } from 'react-redux'

const CursosDocenteMateriaList = () => {

    const [curso, setCurso] = useState([])
    const [selectedValue, setSelectedValue] = useState("");
    const id_materia = useSelector(state => state.MateriasReducer.id)
    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    const handleSelectedCurso = (value) => {
       // console.log("curso", value);
        store.dispatch(addIdCurso(value))
        setSelectedValue(value)
    }

    useEffect(() => {
        store.dispatch(isLoading(true))
        let controller = new AbortController()
        const loadCursos = async () => {
            const datos = {
                docente: id_docente,
                materia: id_materia
            }

            const data = await getCursosDocenteMateria(datos,{
                signal: controller.signal
            })
            .finally(()=> {
                store.dispatch(isLoading(false))
            });
            setCurso(data)
            controller = null
        }
        id_materia ? loadCursos() : store.dispatch(isLoading(false))
        return () => {
            controller?.abort()
        }
    }, [id_materia])
   
    return (
        <View style={styles.container}>     

            <Picker
                style={styles.picker}
                dropdownIconColor='#ffffff'
                selectedValue={selectedValue}
                onValueChange={(value) => handleSelectedCurso(value)}
            >
                <Picker.Item label={"Seleccione un curso"} enabled={false} style={styles.pickerItem} />
                {
                    curso.length ?
                    curso.map((item, key)=> {
                        return(
                            <Picker.Item 
                                label={
                                    item.grado_ano + " '"+item.division+"' "+
                                    item.descripcion + " - "+item.turno
                                } 
                                value={item.id} key={key}
                                style={styles.pickerItem} 
                            />

                        )
                    })
                    : <Picker.Item label={"No hay cursos para la materia"} enabled={false} style={styles.pickerItem} />
                }
            </Picker>
        </View>     
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%", 
        marginTop: "10%",
        borderWidth: 2, 
        borderColor: '#10ac84', 
        borderRadius: 5
    },
    picker:{
        color:"#fff",
        height: 70,
    },
    pickerItem: {
        fontSize:20
    }
})

export default CursosDocenteMateriaList
