import React, {useState, useEffect} from 'react'
import { Picker, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'
import { addIdAlumno } from '../redux/actions/PersonaAction';

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
        //store.dispatch(addIdAlumno(selectedValue))
    }, [selectedValue])

    return (
        <View style={{ width: "90%"}}>
            <Picker
                style={{color: "#ffffff"}}
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

export default AlumnosPorCursoList
