import React, {useState, useEffect} from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import CursosList from '../components/CursosList'
import AlumnosPorCursoList from '../components/AlumnosPorCursoList'
import { saveNota, getNota, updateNota } from '../api'

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
    /*
    useEffect(() => {
        if(route.params && route.params.id){
            setEditing(true)
            navigation.setOptions({
                headerTitle: 'Updating a nota'
            });
            (async () => {
                const nota = await getNota(route.params.id)
                setNota({title: nota.title, description:nota.description})
            })();
        }
    }, [])
    */
    const handleChange = (name, value) => setNota({ ...nota, [name]: value})

    const handleSubmit = async () => {
        try {
            if (!editing){
                await saveNota(nota)
            }
            else {
                //console.log(route.params.id, nota)
                //await updateNota(route.params.id, nota)
            }
            navigation.navigate("HomeScreenDocente")
        } catch (error) {
            console.log("error", error)
        }  
    }




    return (
        <Layout>
            
           
            <MateriasList />
            <CursosList />
            <TextInput 
                placeholder="Ingrese nota"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
                keyboardType = "numeric"
            />
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
