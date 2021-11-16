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
        //console.log("alumnos", alu.length)
        setAlumno(alu)
        //console.log("seteo alu", alu, "con cursoID", curso)
    }

    useEffect( () => {
        //console.log("useEffect Curso")
        try{
            //console.log("curso desde store",store.getState().alumnosCursoReducer.curso)
            //console.log("cambio el curso, se obtiene alumnos, curso:", curso)
            store.dispatch(getAlumnosPorCurso(curso))
        } catch (error) {
            console.log("error",error)
        }
    }, [curso])

    useEffect(() => {
        //console.log("useEffect alumnos")
        loadAlumnos(alumnosPorCurso);
        //store.dispatch()
        //
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
                    //console.log("desde reder",alumno)

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
