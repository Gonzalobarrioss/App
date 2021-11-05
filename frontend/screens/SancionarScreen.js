import React, {useState} from 'react'
import { View, Text, TextInput, Picker, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import CursosList from '../components/CursosList'
import AlumnosPorCursoList from '../components/AlumnosPorCursoList'
import Layout from '../components/Layout'

const SancionarScreen = () => {
    const [selectedValue, setSelectedValue] = useState("");

    const [ sancion, setSancion ] =  useState ({
        descripcion: '',
        alumnoID: '',
        docenteID: '',
        tipoSancion: '',
        fecha: ''
    })

    const handleChange = (name, value) => setSancion({ ...sancion, [name]: value})


    //OBTENER FECHA DEL SISTEMA,
    return (
        <Layout>
            <Text>FORMULARIO SANCION</Text>
            <Picker
                style={{color: "#ffffff", width: "90%"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => 
                        setSelectedValue(itemValue)}
            >
                
                <Picker.Item label="Leve" value="L"/>
                <Picker.Item label="Grave" value="G"/>
                <Picker.Item label="Otro" value="O"/>
                     
                
            </Picker>
            <TextInput 
                placeholder="Descripcion"
                placeholderTextColor= "#546574"
                style = {styles.input} 
                onChangeText = { (text) => handleChange('descripcion', text)}
            />
            <CursosList />
            <AlumnosPorCursoList/>
            <TouchableOpacity style={styles.buttonSave}>
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
