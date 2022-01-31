import React, {useState, useEffect} from 'react'
import { View, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable } from 'react-native-paper';
import { saveAsistencia } from '../api';

import { useFocusEffect } from '@react-navigation/native';

const AlumnosPorCursoTableAsistencia = ({navigation}) => {

    const [alumno, setAlumno] = useState([])
    
    const id_clase = useSelector(state => state.ClasesReducer.id)

    const [asistencia, setAsistencia] = useState({
        clase: id_clase,
        alumnos: [],
        estado: [],
        render: false
    })

    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)
/*
    useEffect( () => {

        try{
            //console.log("curso", curso)

            store.dispatch(getAlumnosPorCurso(curso))
        } catch (error) {
            console.log("error",error)
        }
    }, [curso])*/

    useFocusEffect(
        React.useCallback(() => {
            let controller = new AbortController()
            const getAlumnos = () => {
                if (curso){
                    try {
                        store.dispatch(getAlumnosPorCurso(curso))
                        controller = null
                    } catch (error) {
                        console.log("error",error)
                    }
                } 
            }
            getAlumnos()

            return () => controller?.abort()
        },[curso])
    )

    const alumnosPorCurso = useSelector(state => state.alumnosCursoReducer.alumnos)
    /*useEffect(() => {
        const loadAlumnos = (alu) => {
            setAlumno(alu)          
        }
        console.log("primero", asistencia.alumnos.length)
        asistencia.alumnos.splice(0,asistencia.alumnos.length)
        asistencia.estado.splice(0,asistencia.estado.length)
        if(alumnosPorCurso){
            alumnosPorCurso.map((item,index)=>{
                asistencia.estado.splice(index,1,"Ausente")
                asistencia.alumnos.splice(index,1,item.id)
            })
            loadAlumnos(alumnosPorCurso)
        }
    }, [alumnosPorCurso])*/

    useFocusEffect(
        
        React.useCallback(() => {
            let controller = new AbortController()
            const loadAlumnos = (alu) => {
                setAlumno(alu)
                controller = null        
            }
            console.log("primero", asistencia.alumnos.length)
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
        },[alumnosPorCurso])
    )

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
                                await saveAsistencia({alumnoID:item, claseID: asistencia.clase,fecha:fecha, estado:asistencia.estado[index]})
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
            <TouchableOpacity style={styles.btnGuardarAsistencia}>
                <Text>Todos Ausentes</Text>
            </TouchableOpacity>
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
                        : (<DataTable.Row  >
                                <DataTable.Cell>SIN ALUMNOS</DataTable.Cell>
                            </DataTable.Row>)
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
