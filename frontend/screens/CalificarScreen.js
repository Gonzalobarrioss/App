import React, {useState, useEffect} from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import CursosList from '../components/CursosList'
import { saveNota, getNota, updateNota } from '../api'
import AlumnosPorCursoTableCalificacion from '../components/AlumnosPorCursoTableCalificacion'

const CalificarScreen = () => {

    
    const [editing, setEditing] = useState(false)
    const [descripcion, setDescripcion] = useState('')
    const [ nota, setNota ] =  useState ({
        alumno: '',
        docente:'',
        materia:'',
        regimen:'',
        etapa:'',
        nota:'',
        descripcion: ''
    })
    
    const handleChange = (name, value) => setNota({ ...nota, [name]: value})

    const handleSubmit = async () => {
        try {
            //await saveNota(nota)
            //navigation.navigate("HomeScreenDocente")
            console.log("nota: ", nota)
        }
        catch (error) {
            console.log("error en nota", error)
        }  
    }


    return (
        <Layout>
            <TextInput 
                placeholder="Descripcion"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
            />
            <MateriasList />
            
            <CursosList />

            

            <AlumnosPorCursoTableCalificacion/>
            
            <TouchableOpacity style = {styles.buttonSave} onPress={handleSubmit}>
                <Text style= {styles.buttonText}>Guardar Nota</Text>
            </TouchableOpacity>
               
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

export default CalificarScreen
