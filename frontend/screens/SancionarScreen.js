import React, {useState, useEffect} from 'react'
import { Text, TextInput, Picker, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import CursosList from '../components/CursosList'
import AlumnosPorCursoList from '../components/AlumnosPorCursoList'
import Layout from '../components/Layout'

import { useSelector } from 'react-redux';

import { useIsFocused } from '@react-navigation/core'

import { sancionarAlumno } from '../api'

import moment from 'moment'

const SancionarScreen = ({navigation}) => {

    const idDocente = useSelector(state => state.PersonaReducer.DocenteReducer.id)
    const idAlumno = useSelector(state => state.PersonaReducer.AlumnoReducer.id)


    const [ sancion, setSancion ] =  useState ({
        descripcion: '',
        alumnoID: idAlumno,
        docenteID: idDocente,
        tipoSancion: 'Leve',
        fecha: moment().utcOffset('-03:00').format('YYYY-MM-DD')

    })

    const focus = useIsFocused()

    useEffect(() => {
    }, [focus])

    useEffect(() => {
        handleChange("alumnoID", idAlumno)
    }, [idAlumno])

    const handleChange = (name, value) => setSancion({ ...sancion, [name]: value})

    const handleSancionar = () => {
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

    return (
        <Layout>
            <Text style={{color:"#ffffff", fontSize:18}}>FORMULARIO SANCION</Text>
            <Picker
                style={{color: "#ffffff", width: "90%"}}
                selectedValue={ sancion.tipoSancion }
                onValueChange={(itemValue) => handleChange("tipoSancion",itemValue)}
                        
            >
                
                <Picker.Item label="Leve" value="Leve"/>
                <Picker.Item label="Moderada" value="Moderada"/>
                <Picker.Item label="Grave" value="Grave"/>
                     
                
            </Picker>
            <TextInput 
                placeholder="Descripcion"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
            />

            <CursosList />
            <AlumnosPorCursoList/>
            
            {
                sancion.descripcion.length > 0 
                ?   <TouchableOpacity
                        style={styles.buttonSave}
                        onPress = { handleSancionar }
                    >
                        <Text style={styles.buttonText}>
                            SANCIONAR
                        </Text>
                    </TouchableOpacity>
                :   <TouchableOpacity
                        style={styles.buttonSave}
                        onPress = { () =>  Alert.alert("Ingrese una descripción.") }
                    >
                        <Text style={styles.buttonText}>
                            SANCIONAR
                        </Text>
                    </TouchableOpacity>
            }
            
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
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
    }
})
export default SancionarScreen
