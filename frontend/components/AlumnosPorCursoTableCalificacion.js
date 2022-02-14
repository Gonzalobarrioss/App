import React, {useState, useEffect} from 'react'
import { View, Alert, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { used } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker';

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable } from 'react-native-paper';
import { isLoading } from '../redux/actions/LoadingAction';

import { saveNota, getAlumnosXCurso } from '../api'

const AlumnosPorCursoTableCalificacion = ({navigation}) => {

    const docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    const materia = useSelector(state => state.MateriasReducer.id)
    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)

    const [loading, setLoading] = useState(false)
    const [etapa, setEtapa] = useState([]) 

    useEffect(() => {
        let controller = new AbortController()
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
        controller = null

        return () => controller?.abort()
    }, [regimen])
    
    const [calificaciones, setCalificaciones] = useState({
        alumnos:[],
        nota:[],
        lastDeletedAlumno: [],
        docente: docente,
        materia: materia,
        regimen: regimen,
        descripcion: null,
        etapa: null
    })

    useEffect( () => {
        store.dispatch(isLoading(true))
        setLoading(true)
        let controller = new AbortController()
        const getAlumnos = async (curso) => {
            try {
                const data = await getAlumnosXCurso(curso,{
                    signal: controller.signal
                })
                .finally(()=> {
                    store.dispatch(isLoading(false))
                });
                const array_nota = []
                if(data.length){
                    for (let i = 0; i < data.length; i++) {
                        array_nota.push(1)    
                    }
                }
                setCalificaciones({...calificaciones, alumnos:data, nota: array_nota })
                controller = null
            } catch (error) {
                console.log("error",error)
            }
        }
        //console.log("curso", curso);
        if (curso){
            console.log("load Table");
            getAlumnos(curso)
        }

        return () => {
            controller?.abort()
        }
  
    }, [curso])

 
    const handleSetNota = (nota, key ) => {
        let newNota = '';
        let numbers = '0123456789,.';
     
        for (let i=0; i < nota.length; i++) {
            if(numbers.indexOf(nota[i]) > -1 ) {
                numbers.indexOf(nota[i]) == 10 ? newNota += "." : newNota += nota[i]
        
                if(newNota > 10){
                    Alert.alert("La nota no puede superar el valor de 10. Se establecerá por defecto nota 10(Diez).")
                    newNota = 10;
                }
            }
            else {
                Alert.alert("Solo se aceptan valores numéricos y el punto para los valores flotantes.")
            }
        }
        const newArrayNotas = calificaciones.nota
        //console.log("notas", newArrayNotas);
        newArrayNotas.map((item,index) => {
            if(index == key){
                newArrayNotas.splice(key,1,newNota)
            }
        })
        setCalificaciones({...calificaciones, nota: newArrayNotas})

    }


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

    const handleSubmit =  () => {
        
        const submitData = async () => {
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
                                })
                                Alert.alert("Se guardaron las calificaciones.")
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

        if (!calificaciones.etapa){
            Alert.alert("Ingrese una etapa")
        }
        else if(!calificaciones.descripcion){
            Alert.alert("Ingrese descripcion")
        }
        else{
            let notasCorrectas = true
            calificaciones.nota.map((item) => {
                let myRe = /^[\d][.][\d][\d]{1}$|^[1][0]{1}$|^[1-9]{1}$/
                if(myRe.exec(item) == null){
                    notasCorrectas = false
                    Alert.alert("Algunas notas podrian ser incorrectas.")
                }
                else{
                    console.log("todo correcto");
                }
            })
            if(notasCorrectas){
                submitData()
            }
        }
    }

    const handleChange = (name, value) => setCalificaciones({ ...calificaciones, [name]: value})

    return (
        <View style={{width: "100%"}}>

            <View style={styles.container}>
                <Picker
                    style={styles.picker}
                    selectedValue={calificaciones.etapa}
                    onValueChange={(itemValue) => handleChange('etapa', itemValue)}    
                >
                    <Picker.Item label ={"Seleccione una etapa"} enabled={false} />
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
                    <DataTable.Title style={styles.dataTableHeader}>
                      Alumno
                    </DataTable.Title>
                    <DataTable.Title style={styles.dataTableHeader}>Nota</DataTable.Title>
                    <DataTable.Title style={styles.dataTableHeader, {maxWidth:40} }>Eliminar </DataTable.Title>
                </DataTable.Header>
                    {
                        calificaciones.alumnos.length > 0 ?
                        (calificaciones.alumnos.map((row, key)=>( 
                            <DataTable.Row key={key} style={{height:80}}>
                                <DataTable.Cell style={{ overflow:"scroll", maxWidth:190}} >
                                        <View >
                                            <Text style={{fontSize:20}}>
                                                {
                                                ` ${row.apellido}, \n ${row.nombre}`
                                                } 
                                            </Text>
                                        </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{alignContent:"center",  justifyContent:"center", maxWidth:150}} numeric>
                                    <View>
                                        <TextInput 
                                            placeholder="NOTA"
                                            placeholderTextColor= "black"
                                            style= {{fontSize:20, padding: 30, flex:1, textAlign:"center"}}
                                            onChangeText = { (value) => handleSetNota(value, key)}
                                            keyboardType = "numeric"
                                            maxLength = {4}
                                            value = {calificaciones.nota[key].toString()}
                                            selectTextOnFocus = {true}
                                        />
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{justifyContent:"center", maxWidth:40}}>
                                    <View>
                                        <TouchableOpacity
                                            style = {styles.btnEliminar}
                                            onPress = { () => handleRemoveRow(key,row.id)}
                                        >
                                            <Text style = {{color: "#fff", fontSize: 25, textAlign:'center'}}> X </Text>
                                        </TouchableOpacity>
                                    </View>
                                </DataTable.Cell>
                            </DataTable.Row>
                        )))
                        :   (<DataTable.Row>
                                <DataTable.Cell> SIN ALUMNOS</DataTable.Cell>
                            </DataTable.Row>
                            )
                            
                    }  
            </DataTable>

            {
                calificaciones.alumnos.length > 0 ?
                      <TouchableOpacity style = {styles.buttonSave} onPress={handleSubmit}>
                        <Text style= {styles.buttonText}>Guardar Nota</Text>
                    </TouchableOpacity>            
                : null    
            
            }
        </View>     
    )
}

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
    },
    dataTableHeader: {
        alignItems:"center", 
        justifyContent:"center" 
    }
})

export default AlumnosPorCursoTableCalificacion
