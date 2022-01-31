import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';

import { getAllMateriasPorProfesor } from '../api'

import { store } from '../redux/store'
import { addIdMateria, addRegimenMateria } from '../redux/actions/MateriaAction'

import { useSelector } from 'react-redux'
import { datosValidos } from '../redux/actions/RenderAction'

const MateriasList = () => {

    const [materia, setMateria] = useState([])
    const [selectedValue, setSelectedValue] = useState();

    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    useEffect(() => {
        let controller = new AbortController()
        const loadMaterias = async (id_docente) => {
            await store.dispatch(addIdMateria(0))
            const data = await getAllMateriasPorProfesor(id_docente,{
                signal: controller.signal
            });
            setMateria(data)
            controller = null
        }
        console.log("loadMaterias")
        
        loadMaterias(id_docente);
        return () => controller?.abort();
    }, [id_docente]);
    
    /*useFocusEffect(
        
        React.useCallback(() => {
            let controller = new AbortController()
            store.dispatch(addIdMateria(0))
            const loadMaterias = async (id_docente) => {
                const data = await getAllMateriasPorProfesor(id_docente,{
                    signal: controller.signal
                });
                setMateria(data)
                controller = null
            }
            console.log("loadMaterias")
            
            loadMaterias(id_docente);
            return () => controller?.abort();
            
        },[id_docente])
    )*/

    const handleMateria = (value) => {
            try {
                setSelectedValue(value)
                //store.dispatch(datosValidos(true))
                store.dispatch(addIdMateria(value))
                store.dispatch(addRegimenMateria(value))
                //console.log("paso")
            } catch (error) {
                console.log("handleMateria",error)
            }
    }
   
    return (
        <View style={{ width: "90%",borderWidth: 2, borderColor: '#10ac84', borderRadius: 5}}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleMateria(itemValue)}
            >
                <Picker.Item label={"Seleccione una materia"} enabled={false} value={0}/>
                {
                    
                    materia.length > 0 ?    
                    //console.log(materia.length)
                    materia.map((item, key)=> {
                        return(
                            <Picker.Item label={item.descripcion} value={item.id} key={key}/>
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
        height: 50,
    }
})

export default MateriasList
