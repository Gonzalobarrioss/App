import React, {useState, useEffect} from 'react'
import { Text, TextInput,  StyleSheet, TouchableOpacity, Alert, View, ActivityIndicator } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import CursosList from '../components/cursos/CursosList'
import AlumnosPorCursoList from '../components/alumnos/AlumnosPorCursoList'
import Layout from '../components/Layout'

import { useSelector } from 'react-redux';

import { sancionarAlumno } from '../api'

import moment from 'moment'

const SancionarScreen = ({navigation}) => {

    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const id_alumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)
    const id_curso = useSelector(state => state.alumnosCursoReducer.cursoId)
    const loading = useSelector( state => state.LoadingReducer.loading)

    const [ sancion, setSancion ] =  useState ({
        descripcion: '',
        alumnoID: id_alumno,
        docenteID: id_docente,
        tipoSancion: 'Leve',
        fecha: moment().utcOffset('-03:00').format('YYYY-MM-DD')
    })


    useEffect(() => {
        let controller = new AbortController()
        handleChange("alumnoID", id_alumno)
        controller = null
        return () => controller?.abort()
    }, [id_alumno])

    const handleChange = (name, value) => setSancion({ ...sancion, [name]: value})

    const handleSancionar = () => {
        const submitSancion = () =>{
            Alert.alert(
                `Atencion`,
                `Si continua sancionara un alumno. Por favor asegúresee de que los datos sean correctos.`,
                [
                    {
                        text: "Sancionar",
                        onPress: async () => {
                            try {
                                await sancionarAlumno(sancion)
                                Alert.alert("Sancion exitosa.")
                                try {
                                    navigation.navigate("HomeScreenDocente")
                                } catch (error) {
                                    console.log(error)
                                }
                            } catch (error) {
                                console.log(error)
                                Alert.alert("No se pudo realizar la sancion")
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

        if(!sancion.alumnoID){
            Alert.alert("Seleccione un alumno")
        }
        else if(!sancion.descripcion){
            Alert.alert("Debe ingresar una descripcion")
        }
        else{
            submitSancion()
        }
    }

    return (
        <Layout>
            { loading ? <ActivityIndicator color="#ffffff" size="large" /> : null }

            <Text style={styles.headerText}>FORMULARIO SANCION</Text>

            <CursosList />

            { id_curso ? <AlumnosPorCursoList/> : null }
              
            {
                id_alumno ? 
                <View style={{width:"100%"}}>
                <View style={styles.container}>
                    <Picker
                        style={styles.picker}
                        dropdownIconColor='#ffffff'
                        selectedValue={ sancion.tipoSancion }
                        onValueChange={(itemValue) => handleChange("tipoSancion",itemValue)}
                                
                    >
                        
                        <Picker.Item label="Leve" value="Leve" style={styles.pickerItem} />
                        <Picker.Item label="Moderada" value="Moderada" style={styles.pickerItem} />
                        <Picker.Item label="Grave" value="Grave" style={styles.pickerItem} />
                            
                        
                    </Picker>
                </View>
                <TextInput 
                    placeholder="Descripcion"
                    placeholderTextColor= "#546574"
                    style = {styles.inputDescripcion} 
                    onChangeText = { (text) => handleChange('descripcion', text)}
                />

                
                
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress = { handleSancionar }
                >
                    <Text style={styles.buttonText}>
                        SANCIONAR
                    </Text>
                </TouchableOpacity> 
                </View>
                : null
            }

            
     
        </Layout>
    )
}

const styles = StyleSheet.create({
    headerText: {
        color:"#ffffff", 
        fontSize:22,
        textDecorationLine: "underline",
    },
    inputDescripcion: {
        width: "100%",
        fontSize: 20,
        marginTop: "10%",
        borderWidth: 1,
        borderColor: "#10ac84",
        height: 70,
        color: "#ffffff",
        textAlign: "center",
        borderRadius: 5,
        padding: 4
    },
    buttonSave: {
        padding: 10,
        borderRadius: 5,
        marginTop: "10%",
        backgroundColor: "#10ac84",
        width: "100%",
        height: 50,
        justifyContent: "center"
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 20,

    },
    picker:{
        color:"#fff",
        height: 70,
    },
    pickerItem: {
        fontSize: 20
    },
    container:{
        width: "100%",
        borderWidth: 2, 
        borderColor: '#10ac84', 
        borderRadius: 5, 
        marginTop:"10%"
    }
})
export default SancionarScreen
