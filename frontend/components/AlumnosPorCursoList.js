import React, {useState, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';

import { addIdAlumno } from '../redux/actions/PersonaAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'
import { getAlumnosXCurso } from '../api'

const AlumnosPorCursoList = () => {

    const [alumno, setAlumno] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)

    useEffect( () => {
        let controller = new AbortController()
        const getAlumnos = async (curso) =>{
            const data = await getAlumnosXCurso(curso)
            store.dispatch(addIdAlumno(0))
            setAlumno(data)
            controller = null
        }
        try{
            curso ? getAlumnos(curso) : console.log("curso", curso)
        } catch (error) {
            console.log("error en GetAlumnosPorCurso",error)
        }
        return () => controller?.abort()
    }, [curso])

    const handleAlumno = (value) => {
        store.dispatch(addIdAlumno(value))
        setSelectedValue(value)
    }

    return (
        <View style={{ width: "100%",borderWidth: 2, borderColor: '#10ac84', borderRadius: 5, marginTop:"10%"}}>
            <Picker
                style={styles.picker}
                dropdownIconColor='#ffffff'
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleAlumno(itemValue)}
            >
                <Picker.Item label={"Seleccione un alumno"} enabled={false} style={styles.pickerItem} />
                {
                    alumno.length  
                    ?  alumno.map((item,key)=>{
                            return  <Picker.Item label={item.nombre} value={item.id} key={key} style={styles.pickerItem} />
                        })
                    :  <Picker.Item label={"SIN ALUMNOS"} enabled={false} style={styles.pickerItem} />              
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
    pickerItem: {
        fontSize: 20
    }
})

export default AlumnosPorCursoList
