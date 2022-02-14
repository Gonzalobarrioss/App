import React, {useState, useEffect} from 'react'
import { Text, TextInput, Picker, StyleSheet, TouchableOpacity, Alert, View } from 'react-native'
import CursosList from '../components/CursosList'
import AlumnosPorCursoList from '../components/AlumnosPorCursoList'
import Layout from '../components/Layout'

import { useSelector } from 'react-redux';

import { useIsFocused } from '@react-navigation/core'

import { sancionarAlumno } from '../api'

import moment from 'moment'

const SancionarScreen = ({navigation}) => {

    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const id_alumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)

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
            <Text style={{color:"#ffffff", fontSize:18}}>FORMULARIO SANCION</Text>
            <View style={{ width: "90%",borderWidth: 2, borderColor: '#10ac84', borderRadius: 5, marginTop:"10%"}}>
                <Picker
                    style={styles.picker}
                    selectedValue={ sancion.tipoSancion }
                    onValueChange={(itemValue) => handleChange("tipoSancion",itemValue)}
                            
                >
                    
                    <Picker.Item label="Leve" value="Leve"/>
                    <Picker.Item label="Moderada" value="Moderada"/>
                    <Picker.Item label="Grave" value="Grave"/>
                        
                    
                </Picker>
            </View>
            <TextInput 
                placeholder="Descripcion"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
            />

            <CursosList />
            <AlumnosPorCursoList/>
            
            <TouchableOpacity
                style={styles.buttonSave}
                onPress = { handleSancionar }
            >
                <Text style={styles.buttonText}>
                    SANCIONAR
                </Text>
            </TouchableOpacity>
     
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        fontSize: 14,
        marginTop: "10%",
        borderWidth: 1,
        borderColor: "#10ac84",
        height: 50,
        color: "#ffffff",
        textAlign: "center",
        borderRadius: 5,
        padding: 4
    },
    buttonSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginTop: "10%",
        backgroundColor: "#10ac84",
        width: "90%",
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
    },
    picker:{
        color:"#fff",
        height: 50,
    }
})
export default SancionarScreen
