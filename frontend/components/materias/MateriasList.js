import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';

import { getAllMateriasPorProfesor } from '../../api'

import { store } from '../../redux/store'
import { addIdMateria, addRegimenMateria } from '../../redux/actions/MateriaAction'

import { useSelector } from 'react-redux'
import { addIdClase } from '../../redux/actions/ClaseAction';
import { addIdCurso } from '../../redux/actions/AlumnoCursoAction';
import { isLoading } from '../../redux/actions/LoadingAction';
import { addDescripcion, setEtapa } from '../../redux/actions/CalificacionesAction';

const MateriasList = () => {

    const [materia, setMateria] = useState([])
    const [selectedValue, setSelectedValue] = useState(0);

    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)


    useEffect(() => {
        let controller = new AbortController()
        let isMounted = true
        const loadMaterias = async (id_docente) => {

            store.dispatch(isLoading(true))

            await getAllMateriasPorProfesor(id_docente,{
                signal: controller.signal
            })
            .then((data)=>{
                controller = null
                if (isMounted){
                    setMateria(data)
                }  
            })
            .catch((error) => {
                console.log("error: ", error)
            })
            .finally(()=> {
                store.dispatch(isLoading(false))
            });

        }
        console.log("loadMaterias")
        
        id_docente ? loadMaterias(id_docente) : null ;
        return () => { isMounted = false } 
        //return () => controller?.abort();
    }, [id_docente]);
 

    const handleMateria = async (value) => {

        let controller = new AbortController()

        try {
            await store.dispatch(addIdCurso(0))
            await store.dispatch(addIdClase(0))
            await store.dispatch(addRegimenMateria(""))
            await store.dispatch(addIdMateria(0))
            await store.dispatch(setEtapa(0))
            await store.dispatch(addDescripcion(""))
            setSelectedValue(value.id)
            store.dispatch(addIdMateria(value.id))
            store.dispatch(addRegimenMateria(value.regimen))
            controller = null
        } catch (error) {
            console.log("handleMateria",error)
            controller = null
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
