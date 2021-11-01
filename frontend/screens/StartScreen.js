import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  Layout  from '../components/Layout'

const StartScreen = ({navigation}) => {

    const [rol, setRol] = useState('')

    return (
            <Layout>
            <View style={styles.card}>
                <Text style={styles.heading}>Bienvenido, eres un: {rol}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TouchableOpacity
                            style={styles.buttonAlt} 
                            onPress={ () => {
                                setRol('Alumno')
                                }}>
                            <Text style={styles.buttonAltText}>Alumno</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonAlt} 
                            onPress={  () => {
                                setRol('Docente')
                                }}>
                            <Text style={styles.buttonAltText}>Docente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={  () => {
                                navigation.navigate('AuthScreen', { rol: rol })
                                }}>
                            <Text style={styles.buttonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
            </Layout>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});

export default StartScreen;