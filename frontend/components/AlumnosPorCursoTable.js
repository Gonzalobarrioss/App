import React, {useState, useEffect} from 'react'
import { View, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'
//import { addListaAlumnos, resetAsistencia } from '../redux/actions/AsistenciaAction';

import { DataTable } from 'react-native-paper';
import { saveAsistencia } from '../api';

const optionsPerPage = [2, 3, 4];

const AlumnosPorCursoTable = ({navigation}) => {

    const [alumno, setAlumno] = useState([])
    const [asistencia, setAsistencia] = useState({
        clase: clase,
        alumnos: [],
        estado: [],
        render: false
    })

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    const clase = useSelector(state => state.ClasesReducer.id)
    useEffect(() => {
        setAsistencia({...asistencia, clase: clase})
        //console.log("clase desde store", store.getState().ClasesReducer.id)
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
            alumnosPorCurso.map((item,index)=>{
                asistencia.estado.splice(index,1,"Ausente")
                asistencia.alumnos.splice(index,1,item.id)
            })
            loadAlumnos(alumnosPorCurso)
            //console.log("cantidad de alumnos", alumnosPorCurso.length)
        }
        else{
            loadAlumnos([])
        }
    }, [alumnosPorCurso])

    const handleAsistencia = (value) => {

        Alert.alert(
            `Alumno: ${value.nombre}`,
            `Insertar estado del alumno`,
            [
                {
                    text: "Retraso",
                    onPress: () => {

                        try {
                            //setAsistencia({...asistencia, alumnos: })
                            asistencia.alumnos.splice(value.key,1)
                            asistencia.alumnos.splice(value.key,0,value.id)
                            asistencia.estado.splice(value.key,1)
                            asistencia.estado.splice(value.key,0,"Restraso")
                            setAsistencia({...asistencia, render: true})
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la asistencia")
                        }
                        
                    }
                },
                {
                    text: "Presente",
                    onPress: () => {

                        try {
                            //setAsistencia({...asistencia, alumnos: })
                            asistencia.alumnos.splice(value.key,1)
                            asistencia.alumnos.splice(value.key,0,value.id)
                            asistencia.estado.splice(value.key,1)
                            asistencia.estado.splice(value.key,0,"Presente")
                            setAsistencia({...asistencia, render: true})
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
                            asistencia.alumnos.splice(value.key,1)
                            asistencia.alumnos.splice(value.key,0,value.id)
                            asistencia.estado.splice(value.key,1)
                            asistencia.estado.splice(value.key,0,"Ausente")
                            setAsistencia({...asistencia, render: true})
                        } catch (error) {
                            console.log(error)
                            Alert.alert("No se pudo realizar la asistencia")
                        }
                    },
                    style: "cancel"
                }              
            ],
            {
                cancelable: true
            }
        )
    }

    const handleSaveAsistencia = () => {
        Alert.alert(
            `Atencion`,
            `Si continua guardará las asistencias`,
            [
                {
                    text: "Continuar",
                    onPress: () => {
                        try {
                            asistencia.alumnos.map(async (item,index)=>{
                                await saveAsistencia({alumnoID:item, claseID: asistencia.clase, estado:asistencia.estado[index]})
                                console.log("ASISTENCIA")
                                console.log("Clase id: ", asistencia.clase)
                                console.log("Alumno id: ", item)
                                console.log("Estado: ", asistencia.estado[index])
                                console.log("--------------------------")
                                navigation.navigate("HomeScreenDocente")
                            })
                        } catch (error) {
                            console.log("error", error)
                        }
                    }
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ]
        )
        
        //console.log("asistencia", asistencia)
    }

    return (
        <View style={{ width: "90%", marginTop: "10%"}}>
            <DataTable style={{backgroundColor:"#ffffff"}}>
                <DataTable.Header >
                    <DataTable.Title>Alumno</DataTable.Title>
                    <DataTable.Title style={{ colSpan: 2}}>Estado</DataTable.Title>
                </DataTable.Header>
                    {
                        alumno.length > 0 ? 
                        (alumno.map((row, key)=>(
                            <DataTable.Row key={key} onPress={ () => handleAsistencia({nombre:row.nombre,id:row.id, key:key}) } >
                                <DataTable.Cell>{row.nombre}</DataTable.Cell>
                                <DataTable.Cell>{asistencia.estado[key]}</DataTable.Cell>
                            </DataTable.Row>
                        )))    
                        : (<DataTable.Row  >
                                <DataTable.Cell>SIN ALUMNOS</DataTable.Cell>
                            </DataTable.Row>)
                    }  
            </DataTable>
            

            <TouchableOpacity 
                style={styles.btnGuardarAsistencia}
                onPress = { () => handleSaveAsistencia()}
            >
                <Text style={styles.txtGuardarAsistencia}>Guardar Asistencia</Text>
            </TouchableOpacity>
        </View>     
    )
}
/*<DataTable.Pagination
                page={page}
                numberOfPages={1}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
                
            />*/
const styles = StyleSheet.create({
    btnGuardarAsistencia:{
        backgroundColor: "#ffffff",
        padding: 7,
        borderRadius: 5,
        fontSize: 18,
        width: "100%",
        marginTop: 10
    },
    txtGuardarAsistencia:{
        textAlign: 'center',
        fontSize:16
    }
})
export default AlumnosPorCursoTable
