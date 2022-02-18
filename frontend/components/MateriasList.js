import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';

import { getAllMateriasPorProfesor } from '../api'

import { store } from '../redux/store'
import { addIdMateria, addNombreMateria, addRegimenMateria } from '../redux/actions/MateriaAction'

import { useSelector } from 'react-redux'
import { addIdClase } from '../redux/actions/ClaseAction';
import { addIdCurso } from '../redux/actions/AlumnoCursoAction';
import { isLoading } from '../redux/actions/LoadingAction';
import { addDescripcion, setEtapa } from '../redux/actions/CalificacionesAction';

const MateriasList = () => {

    const [materia, setMateria] = useState([])
    const [selectedValue, setSelectedValue] = useState();

    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    const focus = useIsFocused()

    useEffect(() => {
        store.dispatch(isLoading(true))
        let controller = new AbortController()
        const loadMaterias = async (id_docente) => {
            //console.log(id_docente);
            
            const data = await getAllMateriasPorProfesor(id_docente,{
                signal: controller.signal
            })
            .finally(()=> {
                store.dispatch(isLoading(false))
            });
            setMateria(data)
            controller = null
        }
        console.log("loadMaterias")
        
        loadMaterias(id_docente);
        return () => controller?.abort();
    }, [id_docente]);
 

    const handleMateria = async (value) => {
        let controller = new AbortController()
        try {
            await store.dispatch(addIdCurso(0))
            await store.dispatch(addIdClase(0))
            await store.dispatch(addRegimenMateria(""))
            await store.dispatch(addIdMateria(0))
            await store.dispatch(setEtapa(0))
            store.dispatch(addDescripcion(""))
            setSelectedValue(value.id)
            store.dispatch(addIdMateria(value.id))
            store.dispatch(addRegimenMateria(value.regimen))
            controller = null
                //store.dispatch(addNombreMateria(value.nombre))
        } catch (error) {
            console.log("handleMateria",error)
        }
        return () => controller?.abort()
    }
   
    return (
        <View style={{ width: "100%",borderWidth: 2, borderColor: '#10ac84', borderRadius: 5}}>
            <Picker
                style={styles.picker}
                dropdownIconColor='#ffffff'
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleMateria(itemValue)}
            >
                <Picker.Item label={"Seleccione una materia"} enabled={false} style={styles.pickerItem}/>
                {
                    
                    materia.length ?    
                    //console.log(materia.length)
                    materia.map((item, key)=> {
                        return(
                            <Picker.Item label={item.descripcion} value={{id:item.id,regimen:item.regimen}} key={key} style={styles.pickerItem}/>
                        )
                    })
                    :null
                    
                }
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    picker:{
        color:"#fff",
        height: 70,
    },
    pickerItem:{
        fontSize:20
    }
})

export default MateriasList
