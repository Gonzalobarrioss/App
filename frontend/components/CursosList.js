import React, {useState, useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';

import { getAllCursos } from '../api'

import { addIdCurso } from '../redux/actions/AlumnoCursoAction'

import { store } from '../redux/store'

import { isLoading } from '../redux/actions/LoadingAction';

const CursosList = () => {

    const [curso, setCurso] = useState([])
    const [selectedValue, setSelectedValue] = useState("");


    const handleSelectedCurso = (value) => {
       // console.log("curso", value);
        store.dispatch(addIdCurso(value))
        setSelectedValue(value)
    }

    useEffect(() => {
        store.dispatch(isLoading(true))
        let controller = new AbortController()
        const loadCursos = async () => {
            const data = await getAllCursos("",{
                signal: controller.signal
            })
            .finally(()=> {
                store.dispatch(isLoading(false))
            });
            setCurso(data)
            controller = null
        }
        loadCursos();
        return () => {
            controller?.abort()
        }
    }, [])
   
    return (
        <View style={styles.container}>     

            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(value) => handleSelectedCurso(value)}
            >
                <Picker.Item label={"Seleccione un curso"} enabled={false}/>
                {
                    curso.map((item, key)=> {
                        return(
                            <Picker.Item label={
                                item.grado_ano + " '"+item.division+"' "+
                                item.descripcion + " - "+item.turno
                            } 
                            value={item.id} key={key}/>
                        )
                    })
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

export default CursosList
