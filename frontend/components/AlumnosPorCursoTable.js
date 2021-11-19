import React, {useState, useEffect} from 'react'
import { View, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'
import { addListaAlumnos, resetAsistencia } from '../redux/actions/AsistenciaAction';

import { DataTable } from 'react-native-paper';


const optionsPerPage = [2, 3, 4];

const AlumnosPorCursoTable = () => {

    const [alumno, setAlumno] = useState([])
    const [asistencia, setAsistencia] = useState({
        clase: clase,
        alumnos: [],
        estado: []

    })

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    const focus = useIsFocused()
    
    const clase = useSelector(state => state.ClasesReducer.id)
    useEffect(() => {
        setAsistencia({...asistencia, clase: clase})
        console.log("clase desde store", store.getState().ClasesReducer.id)
    }, [clase])

    const curso = useSelector(state => state.alumnosCursoReducer.curso)
    useEffect( () => {
        try{
            store.dispatch(getAlumnosPorCurso(curso))
        } catch (error) {
            console.log("error",error)
        }
    }, [curso])

    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos)
    useEffect(() => {
        const loadAlumnos = (alu) => {
            setAlumno(alu)          
        }
        if(alumnosPorCurso){
            loadAlumnos(alumnosPorCurso)
           /* alumnosPorCurso.map((item)=>{
                console.log(item.nombre)
            })*/
        }
        else{
            loadAlumnos([])
        }
    }, [alumnosPorCurso])

    const handleAsistencia = (nombre,id) => {

        Alert.alert(
            `Alumno: ${nombre}`,
            `Insertar estado del alumno`,
            [
                {
                    text: "Presente",
                    onPress: () => {

                        try {
                            store.dispatch(addListaAlumnos(id,nombre,"Presente"))

                            //store.dispatch(addEstado("Presente"))
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la asistencia")
                        }
                        
                    }
                },
                {
                    text: "Ausente",
                    onPress: () => {
                        try {
                            store.dispatch(addListaAlumnos(id,nombre,"Ausente"))

                            //store.dispatch(addEstado("Ausente"))
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la asistencia")
                        }
                    },
                    style: "cancel"
                }
            ]
        )
    }

    const handleSaveAsistencia = () => {
        console.log("asistencia", asistencia)
    }

    return (
        <View style={{ width: "90%", marginTop: "10%"}}>
            <DataTable style={{backgroundColor:"#ffffff"}}>
                <DataTable.Header >
                    <DataTable.Title>Alumno</DataTable.Title>
                    <DataTable.Title style={{ colSpan: 2}}>Estado</DataTable.Title>
                </DataTable.Header>
                    {
                        alumno.length > 0 ? //(console.log(alumno),
                        (alumno.map((row, key)=>(
                            //console.log("filas", row),
                            <DataTable.Row key={key} onPress={ () => handleAsistencia(row.nombre,row.id) } >
                                <DataTable.Cell>{row.nombre}</DataTable.Cell>
                                <DataTable.Cell>{row.estado}</DataTable.Cell>
                            </DataTable.Row>
                        )))    
                        : (<DataTable.Row  >
                                <DataTable.Cell>SIN ALUMNOS</DataTable.Cell>
                            </DataTable.Row>)
                    }  
            </DataTable>
            <DataTable.Pagination
                page={page}
                numberOfPages={1}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
                
            />

            <TouchableOpacity 
                style={styles.btnGuardarAsistencia}
                onPress = { () => handleSaveAsistencia()}
            >
                <Text style={styles.txtGuardarAsistencia}>Guardar Asistencia</Text>
            </TouchableOpacity>
        </View>     
    )
}

const styles = StyleSheet.create({
    btnGuardarAsistencia:{
        backgroundColor: "#ffffff",
        padding: 7,
        borderRadius: 5,
        fontSize: 18,
        width: "90%"
    },
    txtGuardarAsistencia:{
        textAlign: 'center',
        fontSize:16
    }
})
export default AlumnosPorCursoTable
