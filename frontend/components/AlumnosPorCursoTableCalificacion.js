import React, {useState, useEffect} from 'react'
import { View, Alert, TouchableOpacity, Text, TextInput, Picker, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { render }  from '../redux/actions/RenderAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable } from 'react-native-paper';

import { saveNota } from '../api'

const AlumnosPorCursoTableCalificacion = ({navigation}) => {

    const focus = useIsFocused()
    useEffect(() => {
        
    }, [focus])

    const docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    const materia = useSelector(state => state.MateriasReducer.id)
    const rendering = useSelector(state => state.RenderReducer.render)
    const [etapa, setEtapa] = useState([]) 
    const [datosCorrectos, setDatosCorrectos] = useState(true)

    useEffect(() => {
        
        switch (regimen) {
            case "Anual":
                setEtapa([{nombre: "Anual", etapa: "1"}])
                break;
            case "Bimestral":
                setEtapa([{nombre: "Primer Bimestre", etapa: "1"},{nombre: "Segundo Bimestre", etapa: "2"},{nombre: "Tercer Bimestre", etapa: "3"},{nombre: "Cuarto Bimestre", etapa: "4"}])
                break;
            case "Trimestral":
                setEtapa([{nombre: "Primer Trimestre", etapa: "1"},{nombre: "Segundo Trimestre", etapa: "2"},{nombre: "Tercer Trimestre", etapa: "3"}])
                break;
            case "Cuatrimestral":
                setEtapa([{nombre: "Primer Cuatrimestre", etapa: "1"},{nombre: "Segundo Cuatrimestre", etapa: "2"}])
                break;
            default:
                setEtapa([{nombre: "No esta definido una etapa", etapa: "1"}])
                break;
        }
        setCalificaciones({...calificaciones, regimen: regimen})
    }, [regimen])
    
    

    useEffect(() => {
        setCalificaciones({...calificaciones, materia: materia})
    }, [materia])
    
    const [calificaciones, setCalificaciones] = useState({
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
        } catch (error) {
            console.log("error dispatch getAlumnosPorCurso",error)
        }
    }, [curso])

    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos)
    useEffect(() => {
        const loadAlumnos = (alu) => {
            setCalificaciones({...calificaciones, alumnos:alu })
        }
        if (alumnosPorCurso){
            calificaciones.nota.splice(0,calificaciones.nota.length)
            alumnosPorCurso.map((item,index)=>{
                calificaciones.nota.splice(index,1,1)
            })
            loadAlumnos(alumnosPorCurso)
        }
        else{
            calificaciones.nota.splice(0,calificaciones.nota.length)
            loadAlumnos([])
        }
    }, [alumnosPorCurso])

    const handleSetNota = (nota, key) => {
        let newNota = '';
        let numbers = '0123456789';
        setDatosCorrectos(true)

        for (let i=0; i < nota.length; i++) {
            if(numbers.indexOf(nota[i]) > -1 ) {
                newNota = newNota + nota[i];
                if(newNota > 10){
                    Alert.alert("La nota no puede superar el valor de 10.")
                    newNota = 10;
                }
            }
            else {
                setDatosCorrectos(false)
                Alert.alert("Solo se aceptan valores numéricos.")
            }
        }
        if(newNota > 10 || newNota < 1){
            setDatosCorrectos(false)
        }
        calificaciones.nota.splice(key,1)
        calificaciones.nota.splice(key,0,newNota)
        store.dispatch(render(newNota))
    }

    useEffect(() => {
    }, [rendering])

    const handleRemoveRow = (key,id) => {
        Alert.alert(
            `Atencion`,
            `Si continua eliminara al alumno`,
            [
                {
                    text: "Continuar",
                    onPress: () => {
                        calificaciones.alumnos.splice(key,1)
                        calificaciones.nota.splice(key,1)
                        setCalificaciones({...calificaciones, lastDeletedAlumno: id})
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
        
        Alert.alert(
            `Atencion`,
            `Si continua guardará las calificaciones`,
            [
                {
                    text: "Continuar",
                    onPress: () => {
                        try {
                            calificaciones.alumnos.map(async (item,index)=>{
                                await saveNota({alumnoID: item.id, docenteID:calificaciones.docente, materiaID: calificaciones.materia, regimen: calificaciones.regimen, etapa: calificaciones.etapa, nota: calificaciones.nota[index], descripcion: calificaciones.descripcion})
                                console.log("ALUMNO")
                                console.log("alumno",item.id, item.nombre)
                                console.log("docente id", calificaciones.docente)
                                console.log("materia id", calificaciones.materia)
                                console.log("regimen", calificaciones.regimen)
                                console.log("etapa", calificaciones.etapa)
                                console.log("nota", calificaciones.nota[index])
                                console.log("descripcion", calificaciones.descripcion)
                                console.log("-------------------------------")
                            })
                            navigation.navigate("HomeScreenDocente")
                        }
                        catch (error) {
                            console.log("error en nota", error)
                        }
                    }
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ]
        )   
    }

    const handleChange = (name, value) => setCalificaciones({ ...calificaciones, [name]: value})

    return (
        <View style={{width: "90%"}}>
            <View style={styles.container}>
                <Picker
                    style={styles.picker}
                    selectedValue={calificaciones.etapa}
                    onValueChange={(itemValue) => handleChange('etapa', itemValue)}    
                >
                {
                    etapa.length > 0 
                        ?
                            etapa.map((item,key)=>{
                                return ( <Picker.Item label={item.nombre} value={item.etapa} key={key} />)
                            })
                        : null
                }      
                </Picker>
            </View>
            <TextInput 
                placeholder="Descripcion de la calificación"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
            />

            <DataTable style={{backgroundColor:"#ffffff", borderWidth: 2, borderColor: 'grey', borderRadius: 5, marginTop:"5%"}}>
                <DataTable.Header >
                    <DataTable.Title>Alumno</DataTable.Title>
                    <DataTable.Title >Nota</DataTable.Title>
                </DataTable.Header>
                    {
                        calificaciones.alumnos.length > 0 ?
                        (calificaciones.alumnos.map((row, key)=>(
                            <DataTable.Row key={key} >
                                <DataTable.Cell>{row.apellido}, {row.nombre}</DataTable.Cell>
                                <DataTable.Cell>
                                    <View>
                                        <TextInput 
                                            placeholder="INGRESE NOTA"
                                            placeholderTextColor= "black"
                                            style= {{backgroundColor: "#fff", textAlign: 'right'}}
                                            onChangeText = { (value) => handleSetNota(value, key)}
                                            keyboardType = "numeric"
                                            maxLength = {2}
                                            value = {calificaciones.nota[key].toString()}
                                        />
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell
                                    style={{marginLeft:50}}
                                >
                                    <View>
                                        <TouchableOpacity
                                            style = {styles.btnEliminar}
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

            {
                calificaciones.descripcion.length > 0
                ?   (datosCorrectos 
                    ?  <TouchableOpacity style = {styles.buttonSave} onPress={handleSubmit}>
                            <Text style= {styles.buttonText}>Guardar Nota</Text>
                        </TouchableOpacity>             
                    :   <TouchableOpacity style = {styles.buttonSave} onPress={ () => Alert.alert("Verifique que todas las notas sean correctas.")}>
                            <Text style= {styles.buttonText}>Guardar Nota</Text>
                        </TouchableOpacity>
                )   
                :   <TouchableOpacity style = {styles.buttonSave} onPress={() => Alert.alert("Debe ingresar todos los campos.")}>
                        <Text style= {styles.buttonText}>Guardar Nota</Text>
                    </TouchableOpacity>
            }

            
            

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
        borderWidth: 2,
        borderColor: "#10ac84",
        height: 50,
        color: "#ffffff",
        textAlign: "center",
        borderRadius: 5,
        padding: 4,
        marginTop: "10%", 
    },
    buttonSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: "10%",
        backgroundColor: "#10ac84",
        width: "100%",
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center"
    },
    container:{
        width: "100%", 
        marginTop: "10%",
        borderWidth: 2, 
        borderColor: '#10ac84', 
        borderRadius: 5
    },
    picker:{
        color:"#fff",
        height: 50,
    },
    btnEliminar: {
        backgroundColor: "red", 
        padding: 7, 
        borderRadius: 5, 
        alignItems: 'center', 
        flex: 1
    }
})

export default AlumnosPorCursoTableCalificacion
