import React, {useState, useEffect} from 'react'
import { View, Alert, TouchableOpacity, Text, TextInput } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosPorCurso, removeAlumno } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable } from 'react-native-paper';


const optionsPerPage = [2, 3, 4];

const AlumnosPorCursoTableCalificacion = () => {

    //const [page, setPage] = useState(0);
    //const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

/*
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
*/
    const docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    const materia = useSelector(state => state.MateriasReducer.id)

    const [alumno, setAlumno] = useState({
        alumnos:[],
        nota:[],
        lastDeletedAlumno: [],
        docente: docente,
        materia: "materia",
        regimen: regimen

    })
    /*
    useEffect(() => {
        //console.log("docente", store.getState().)
        console.log("regimen", regimen)
        console.log("materia", materia)
    }, [regimen])
    */


    const curso = useSelector(state => state.alumnosCursoReducer.curso)
    useEffect( () => {
        try{
            store.dispatch(getAlumnosPorCurso(curso))
            //console.log("Dispatch nuevos alumnos con el curso id", curso)
        } catch (error) {
            console.log("error dispatch getAlumnosPorCurso",error)
        }
    }, [curso])

    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos)
    useEffect(() => {
        const loadAlumnos = (alu) => {

            setAlumno({...alumno, alumnos:alu })
            //console.log("seteo alu")
            
        }
        loadAlumnos(alumnosPorCurso)
        //console.log("alu x curso")
    }, [alumnosPorCurso])

     const handleGuardarAllNotas = () =>  {
        console.log("alumno",alumno)
    }

    const handleSetNota = (value, key) => {
        alumno.nota.splice(key,1)
        alumno.nota.splice(key,0,value)
    }

    const handleRemoveRow = (key,id) => {
        Alert.alert(
            `Atencion`,
            `Si continua eliminara al alumno`,
            [
                {
                    text: "Continuar",
                    onPress: () => {
                        alumno.alumnos.splice(key,1)
                        alumno.nota.splice(key,1)
                        setAlumno({...alumno, lastDeletedAlumno: id})
                        //console.log("handle")
                    }
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ]
        )

        
    }

    return (
        <View style={{ width: "90%", marginTop: "10%", marginBottom: "10%"}}>
            <TouchableOpacity
                style={{backgroundColor: "#10ac84", padding: 7, borderRadius: 5, marginVertical: "5%" }}
                onPress= { () => handleGuardarAllNotas()}
            >
                <Text style={{color: "#fff", textAlign: 'center'}}>Calificar todos</Text>
            </TouchableOpacity>

            <DataTable style={{backgroundColor:"#ffffff"}}>
                <DataTable.Header >
                    <DataTable.Title>Alumno</DataTable.Title>
                    <DataTable.Title style={{ colSpan: 2}}>Nota</DataTable.Title>
                </DataTable.Header>
                    {
                        alumno.alumnos.length > 0 ?
                        (alumno.alumnos.map((row, key)=>(
                            //console.log("filas", row),
                            <DataTable.Row key={key} onPress={ () => console.log("press") } >
                                <DataTable.Cell>{row.nombre}</DataTable.Cell>
                                <DataTable.Cell>
                                    <View>
                                        <TextInput 
                                            placeholder="INGRESE NOTA"
                                            placeholderTextColor= "black"
                                            style= {{backgroundColor: "#fff"}}
                                            onChangeText = { (value) => handleSetNota(value, key)}
                                            keyboardType = "numeric"
                                           // value = {alumno.nota[key]}
                                        />
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <View>
                                        <TouchableOpacity
                                            style = {{ backgroundColor: "red", padding: 7, borderRadius: 5, alignItems: 'center', justifyContent: 'center', flex: 1}}
                                            onPress = { () => handleRemoveRow(key,row.id)}
                                        >
                                            <Text style = {{color: "#fff", fontSize: 14, textAlign:'center'}}> Eliminar </Text>
                                        </TouchableOpacity>
                                    </View>
                                </DataTable.Cell>
                            </DataTable.Row>
                        )))
                        :   (<DataTable.Row >
                                <DataTable.Cell>Sin Alumnos</DataTable.Cell>
                            </DataTable.Row>
                            )
                            
                    }  
            </DataTable>
            
        </View>     
    )
}/*<DataTable.Pagination
                page={page}
                numberOfPages={1}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
                
            /> */ 

export default AlumnosPorCursoTableCalificacion
