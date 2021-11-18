import React, {useState, useEffect} from 'react'
import { View, Alert, TouchableOpacity, Text, TextInput, Picker, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosPorCurso, removeAlumno } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable } from 'react-native-paper';

import { saveNota } from '../api'



const optionsPerPage = [2, 3, 4];

const AlumnosPorCursoTableCalificacion = () => {

    //const [page, setPage] = useState(0);
    //const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

    const focus = useIsFocused()
    useEffect(() => {
        
    }, [focus])
/*
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
*/
    const docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    const materia = useSelector(state => state.MateriasReducer.id)
    const [etapa, setEtapa] = useState([])
   // const [selectedValue, setSelectedValue] = useState("1")
    

    useEffect(() => {
        
        switch (regimen) {
            case "Anual":
                //console.log("regimen anual")
                setEtapa([{nombre: "Anual", etapa: "1"}])
                break;
            case "Bimestral":
                //console.log("regimen Bimestral")
                setEtapa([{nombre: "Primer Bimestre", etapa: "1"},{nombre: "Segundo Bimestre", etapa: "2"},{nombre: "Tercer Bimestre", etapa: "3"},{nombre: "Cuarto Bimestre", etapa: "4"}])
                break;
            case "Trimestral":
                //console.log("regimen Trimestral")
                setEtapa([{nombre: "Primer Trimestre", etapa: "1"},{nombre: "Segundo Trimestre", etapa: "2"},{nombre: "Tercer Trimestre", etapa: "3"}])
                break;
            case "Cuatrimestral":
                //console.log("regimen Cuatrimestral")
                setEtapa([{nombre: "Primer Cuatrimestre", etapa: "1"},{nombre: "Segundo Cuatrimestre", etapa: "2"}])
                break;
            default:
                setEtapa([{nombre: "No esta definido una etapa", etapa: "1"}])
                break;
        }
       // console.log("etapa",etapa.length)
        setAlumno({...alumno, regimen: regimen})
    }, [regimen])
    
    

    useEffect(() => {
        setAlumno({...alumno, materia: materia})
    }, [materia])
    
    const [alumno, setAlumno] = useState({
        alumnos:[],
        nota:[],
        lastDeletedAlumno: [],
        docente: docente,
        materia: materia,
        regimen: regimen,
        descripcion: "",
        etapa: '1'
    })

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

    const handleSubmit = async () => {
         try {
            alumno.alumnos.map(async (item,index)=>{
                await saveNota({alumnoID: item.id, docenteID:alumno.docente, materiaID: alumno.materia, regimen: alumno.regimen, etapa: alumno.etapa, nota: alumno.nota[index], descripcion: alumno.descripcion})
                console.log("ALUMNO")
                console.log("alumno",item.id, item.nombre)
                console.log("docente id", alumno.docente)
                console.log("materia id", alumno.materia)
                console.log("regimen", alumno.regimen)
                console.log("etapa", alumno.etapa)
                console.log("nota", alumno.nota[index])
                console.log("descripcion", alumno.descripcion)
                console.log("-------------------------------")
            })
            //await saveNota(nota)
            //navigation.navigate("HomeScreenDocente")
            //console.log(alumno)
        }
        catch (error) {
            console.log("error en nota", error)
        }  
    }

    const handleChange = (name, value) => setAlumno({ ...alumno, [name]: value})

    return (
        <View style={{ width: "90%", marginTop: "10%", marginBottom: "10%"}}>

            <Picker
                style={{color: "#ffffff"}}
                selectedValue={alumno.etapa}
                onValueChange={(itemValue, itemIndex) => 
                        handleChange('etapa', itemValue)
                }
            >
                {
                   // console.log("etapa",etapa, etapa.length),
                        etapa.length > 0 ?
                          etapa.map((item,key)=>{
                            //console.log(item)
                            //console.log("key", key,item)
                                return ( <Picker.Item label={item.nombre} value={item.etapa} key={key} />)
                            })
                            : null
                }   
                
            </Picker>

            <TextInput 
                placeholder="Descripcion de la calificación"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
            />



            <DataTable style={{backgroundColor:"#ffffff", marginBottom: "10%"}}>
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



            <TouchableOpacity style = {styles.buttonSave} onPress={handleSubmit}>
                <Text style= {styles.buttonText}>Guardar Nota</Text>
            </TouchableOpacity>
            

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
            const styles = StyleSheet.create({
                input: {
                    width: "100%",
                    fontSize: 14,
                    marginBottom: 7,
                    borderWidth: 1,
                    borderColor: "#10ac84",
                    height: "10%",
                    color: "#ffffff",
                    textAlign: "center",
                    borderRadius: 5,
                    padding: 4
                },
                buttonSave: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 5,
                    marginBottom: 3,
                    backgroundColor: "#10ac84",
                    width: "100%",
                },
                buttonText: {
                    color: "#ffffff",
                    textAlign: "center"
                },
                buttonUpdate: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 5,
                    marginBottom: 3,
                    backgroundColor: "#e58e26",
                    width: "90%"
                }
            })

export default AlumnosPorCursoTableCalificacion
