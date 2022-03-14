import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'

import {Picker} from '@react-native-picker/picker';

import { getClaseXMateria } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { addIdCurso} from '../redux/actions/AlumnoCursoAction'
import { addIdClase } from '../redux/actions/ClaseAction';

import { isLoading } from '../redux/actions/LoadingAction';


const ClasePorMateriasList = () => {

    const [selectedValue, setSelectedValue] = useState(0);
    const [clases, setClases] = useState([])


    const materia = useSelector(state => state.MateriasReducer.id)

    useEffect(() => {
        let controller = new AbortController()
        let isMounted = true

        const loadClases = async () => {
            store.dispatch(isLoading(true))

            await getClaseXMateria(materia, {
                signal: controller.signal
            })
            .then((data)=> {
                if(isMounted){
                    setClases(data)
                    data.length ? store.dispatch(addIdCurso(selectedValue)) : store.dispatch(addIdCurso(0))
                }
            })
            .catch((error)=>{
                console.log("error: ", error)
            })
            .finally(()=> {
                store.dispatch(isLoading(false))
            })

            
            controller =  null 
        }
        console.log("loadClases", materia)
        materia ? loadClases() : store.dispatch(isLoading(false)) 
        
        return () => { isMounted = false }
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
                <Picker.Item label={"Seleccione una clase"} enabled={false} style={styles.pickerItem}  />

                {
                    clases.length
                        ? (clases.map((item, key)=> {
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
                                    style={styles.pickerItem}
                                />
                            )
                        }))
                        : (<Picker.Item label="SIN CLASES PARA LA MATERIA SELECCIONADA" enabled={false} style={styles.pickerItem}/>)
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
    pickerItem:{
        fontSize:20
    }
})

export default ClasePorMateriasList
