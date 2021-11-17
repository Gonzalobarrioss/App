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
    const [alumno, setAlumno] = useState({
        alumnos:[],
        nota:[]
    })

    const curso = useSelector(state => state.alumnosCursoReducer.curso)

    useEffect( () => {
        try{
            store.dispatch(getAlumnosPorCurso(curso))
            //console.log("Dispatch nuevos alumnos con el curso id", curso)
        } catch (error) {
            console.log("error",error)
        }
    }, [curso])

    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos)
    useEffect(() => {
        const loadAlumnos = (alu) => {

            setAlumno({...alumno, alumnos:alu })
            
        }
        loadAlumnos(alumnosPorCurso)
        console.log("alu x curso")
    }, [alumnosPorCurso])

     const handleGuardarAllNotas = () =>  {
       // console.log("alumno",alumno)
       /* alumno.alumnos.map((item,index) => {
            console.log("index", index, "Alumno" , item.nombre, "NOTA:", alumno.nota[index])
        })*/
        //console.log("nota 2 ( 6 ) ", alumno.nota[1])
    }

    const handleSetNota = (value, key, id) => {
       // console.log("key", key)
        //setAlumno({ ...alumno, nota: [alumno.nota.splice(0,key,value) ]})
        setAlumno({...alumno, [alumno.nota]: ([alumno.nota[key]] = value ), ...alumno.nota  })
        //console.log("key", key, "alumno: ", alumno.alumnos[key].nombre, "nota", alumno.nota[key])
    }

    const handleRemoveRow = (key) => {
        console.log("se removera alumno en posicion", key)
        store.dispatch(removeAlumno(key))
    }

    return (
        <View style={{ width: "90%", marginTop: "10%"}}>
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
                            <DataTable.Row key={key} onPress={ () => DataTable.Row.style = {display: "none"} } >
                                <DataTable.Cell>{row.nombre}</DataTable.Cell>
                                <DataTable.Cell>
                                    <View>
                                        <TextInput 
                                            placeholder="INGRESE NOTA"
                                            placeholderTextColor= "black"
                                            style= {{backgroundColor: "#fff"}}
                                            onChangeText = { (text) => handleSetNota(text, key, row.id)}
                                            keyboardType = "numeric"
                                           // value = {alumno.nota[key]}
                                        />
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <View>
                                        <TouchableOpacity
                                            style = {{ backgroundColor: "red", padding: 7, borderRadius: 5, alignItems: 'center', justifyContent: 'center', flex: 1}}
                                            onPress = { () =>  console.log()}
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
