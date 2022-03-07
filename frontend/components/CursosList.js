import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';

import { getCursos } from '../api'

import { addIdCurso } from '../redux/actions/AlumnoCursoAction'

import { store } from '../redux/store'

import { isLoading } from '../redux/actions/LoadingAction';


const CursosList = () => {

    const [curso, setCurso] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const handleSelectedCurso = (value) => {
        store.dispatch(addIdCurso(value))
        setSelectedValue(value)
    }

    useEffect(() => {
        let controller = new AbortController()
        const loadCursos = async () => {
            store.dispatch(isLoading(true))

            await getCursos("",{
                signal: controller.signal
            })
            .then((datos) => {
                setCurso(datos)
                controller = null
            })
            .finally(()=> {
                store.dispatch(isLoading(false))
            });
            
        }
        loadCursos()
        return () => {
            controller?.abort()
        }
    }, [])
   
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
                    : null
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

export default CursosList
