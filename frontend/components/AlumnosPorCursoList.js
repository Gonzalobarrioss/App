import React, {useState, useEffect} from 'react'
import { Picker, StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

const AlumnosPorCursoList = () => {

    const [alumno, setAlumno] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const curso = useSelector(state => state.alumnosCursoReducer.curso)
    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos) 

    const focus = useIsFocused()

    const loadAlumnos = (alu) => {
        setAlumno(alu)
    }

    useEffect( () => {
        try{
     
            store.dispatch(getAlumnosPorCurso(curso))
        } catch (error) {
            console.log("error",error)
        }
    }, [curso])

    useEffect(() => {
        loadAlumnos(alumnosPorCurso);
    }, [alumnosPorCurso])

    useEffect(() => {
    }, [selectedValue])

    return (
        <View style={{ width: "90%",borderWidth: 2, borderColor: '#10ac84', borderRadius: 5, marginTop:"10%"}}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => 
                        setSelectedValue(itemValue)
                }
            >
                {
                     alumno.length > 0 
                     ?  (alumno.map((item,key)=>{
                            return ( <Picker.Item label={item.nombre} value={item.id} key={key} />)
                        }))
                    : ( <Picker.Item label={"SIN ALUMNOS"}  /> )               
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

export default AlumnosPorCursoList
