import React, {useState, useEffect} from 'react'
import { View, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable } from 'react-native-paper';
import { saveAsistencia, getAlumnosXCurso } from '../api';

import { useFocusEffect } from '@react-navigation/native';

import RadioGroup from 'react-native-radio-buttons-group';
import alumnosCursoReducer from '../redux/reducers/AlumnoCursoReducer';

const AlumnosPorCursoTableAsistencia = ({navigation}) => {

    const id_clase = useSelector(state => state.ClasesReducer.id)
    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)
    const [alumno, setAlumno] = useState([{apellido:"CARGANDO..."}])

    const [asistencia, setAsistencia] = useState({
        clase: id_clase,
        alumnos: [],
        estado: [],
        docente: id_docente,
        render: false
    })

    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Todos Ausentes',
        value: 'Ausente',
        color: '#ffffff',
        size: 20,
        labelStyle: {
            color: '#ffffff'
        },
        onPress: (id) => handleEstado(id)
    }, {
        id: '2',
        label: 'Todos Presentes',
        value: 'Presente',
        color: '#ffffff',
        size: 20,
        labelStyle: {
            color: '#ffffff'
        },
        onPress:  (id) => handleEstado(id)
    }]
    
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radio) {
        radio.map((item) => {
            if (item.selected){
                const estado = item.id === 1 ? "Ausente" : "Presente"
                alumno.map((item,index) => {
                    console.log("item", item);
                    setAsistencia({...asistencia, [asistencia.alumnos[index]]: item.id[index], [asistencia.estado[index]]: estado   })
                })
                console.log("ID radio button",item.id);
            }
        })
        //setRadioButtons(radioButtonsArray);
        //console.log(radioButtonsArray);
        //console.log("alumnos",alumno);
        //console.log("id", id);
    }
    let newArray
    useEffect(() => {
        let controller = new AbortController()
        const getAlumnos = async (curso) => {
            if (curso){
                try {
                    //realizar request aca
                    //store.dispatch(getAlumnosPorCurso(curso))
                    const data = await getAlumnosXCurso(curso,{
                        signal: controller.signal
                    });
                    newArray = data
                    //console.log(newArray);
                    setAlumno(data)
                    controller = null
                } catch (error) {
                    console.log("error",error)
                }
            } 
        }
       // console.log("cursooo", curso);
        getAlumnos(curso)

        return () => controller?.abort()
    }, [curso]);

    const handleEstado = (id) => {
       // console.log("se presiono", id);
       // console.log("newArray", newArray);
                //asistencia.alumnos.splice(0,asistencia.alumnos.length) //elimina array alumnos
                //asistencia.estado.splice(0,asistencia.estado.length)  //elimina array estado alumnos
       /* if(newArray.length){
            newArray.map((item,index)=>{
                id == 1 ? asistencia.estado.splice(index,1,"Ausente") : asistencia.estado.splice(index,1,"Presente")
                asistencia.alumnos.splice(index,1,item.id) 
            })
        }   
        setAsistencia({...asistencia, render: true})    */
    }
    
    //const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos)   
/*
    useEffect(() => {
        let controller = new AbortController()
        const loadAlumnos = (alu) => {
            setAlumno(alu)
            controller = null        
        }
       // console.log("primero", asistencia.alumnos.length)
        asistencia.alumnos.splice(0,asistencia.alumnos.length)
        asistencia.estado.splice(0,asistencia.estado.length)
        if(alumnosPorCurso){
            alumnosPorCurso.map((item,index)=>{
                asistencia.estado.splice(index,1,"Ausente")
                asistencia.alumnos.splice(index,1,item.id)
            })
            loadAlumnos(alumnosPorCurso)
        }
        return () => controller?.abort()
    }, [alumnosPorCurso]);*/
    

    const handleAsistencia = (value) => {

        Alert.alert(
            `Alumno: ${value.nombre}`,
            `Insertar estado del alumno`,
            [
                {
                    text: "Retraso",
                    onPress: () => {

                        try {
                            asistencia.alumnos.splice(value.key,1)
                            asistencia.alumnos.splice(value.key,0,value.id)
                            asistencia.estado.splice(value.key,1)
                            asistencia.estado.splice(value.key,0,"Retraso")
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
        const date = new Date()

        const year = date.getFullYear()
        const month = date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : date.getMonth() + 1 
        const day = date.getDate() < 10 ? "0"+(date.getDate()) : date.getDate()
            
        const fecha = year + "-" + month + "-" + day
        Alert.alert(
            `Atencion`,
            `Si continua guardará las asistencias`,
            [
                {
                    text: "Continuar",
                    onPress: () => {
                        try {
                            asistencia.alumnos.map(async (item,index)=>{
                                await saveAsistencia({alumnoID:item, claseID: asistencia.clase,fecha:fecha, estado:asistencia.estado[index], docente: asistencia.docente})
                                console.log("ASISTENCIA")
                                console.log("Clase id: ", asistencia.clase)
                                console.log("Alumno id: ", item)
                                console.log("Estado: ", asistencia.estado[index])
                                console.log("--------------------------")
                            })
                            Alert.alert("Se guardaron las asistencias.")
                            navigation.navigate("HomeScreenDocente")
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
        
    }

    return (
        <View style={{ width: "90%", marginTop: "10%"}}>



            <RadioGroup 
                radioButtons={radioButtonsData} 
                onPress={(radio) => onPressRadioButton(radio)}
                layout={'row'}
                containerStyle={{
                    justifyContent: 'center'
                }}                
            />

            <DataTable style={{backgroundColor:"#ffffff", borderWidth: 2, borderColor: 'grey', borderRadius: 5}}>
                <DataTable.Header >
                    <DataTable.Title>Apellido</DataTable.Title>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Estado</DataTable.Title>
                </DataTable.Header>
                    {
                        alumno.length > 0 ? 
                        (alumno.map((row, key)=>(
                            <DataTable.Row key={key} onPress={ () => handleAsistencia({nombre:row.nombre,id:row.id, key:key}) } >
                                <DataTable.Cell>{row.apellido} </DataTable.Cell>
                                <DataTable.Cell> {row.nombre}</DataTable.Cell>
                                <DataTable.Cell>{asistencia.estado[key]}</DataTable.Cell>
                            </DataTable.Row>
                        )))    
                        :   <DataTable.Row  >
                                <DataTable.Cell>SIN ALUMNOS</DataTable.Cell>
                            </DataTable.Row>
                    }  
            </DataTable>
            
            {
                asistencia.estado.length > 0
                ?
                    <TouchableOpacity 
                        style={styles.btnGuardarAsistencia}
                        onPress = { () => handleSaveAsistencia()}
                    >
                        <Text style={styles.txtGuardarAsistencia}>Guardar Asistencia</Text>
                    </TouchableOpacity>
                :
                    null
            }

            
        </View>     
    )
}

const styles = StyleSheet.create({
    btnGuardarAsistencia:{
        backgroundColor: "#10ac84",
        padding: 7,
        borderRadius: 5,
        fontSize: 18,
        width: "100%",
        marginTop: 10
    },
    txtGuardarAsistencia:{
        textAlign: 'center',
        fontSize:16,
        color: "#fff"
    }
})
export default AlumnosPorCursoTableAsistencia
