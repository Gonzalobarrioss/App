import React, {useState, useEffect} from 'react'
import { Picker, StyleSheet, View } from 'react-native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { addIdAlumno } from '../redux/actions/PersonaAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

const AlumnosPorCursoList = () => {

    const [alumno, setAlumno] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const curso = useSelector(state => state.alumnosCursoReducer.curso)
    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos) 

    useEffect( () => {
        try{
            store.dispatch(getAlumnosPorCurso(curso))
        } catch (error) {
            console.log("error en dispatch GetAlumnosPorCurso",error)
        }
    }, [curso])

    useEffect(() => {
        const loadAlumnos = (alu) => {
            setAlumno(alu)
        }
        if(alumnosPorCurso.length > 0){
            store.dispatch(addIdAlumno(alumnosPorCurso[0].id))
            loadAlumnos(alumnosPorCurso);
        }
        else{
            store.dispatch(addIdAlumno(0))
            loadAlumnos([])
        }
        
    }, [alumnosPorCurso])

    useEffect(() => {
        store.dispatch(addIdAlumno(selectedValue))
    }, [selectedValue])

    return (
        <View style={{ width: "90%",borderWidth: 2, borderColor: '#10ac84', borderRadius: 5, marginTop:"10%"}}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => 
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
