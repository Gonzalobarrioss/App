import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import  Layout  from '../components/Layout'

import { store } from '../redux/store';
import { addIdAlumno, addIdDocente, addNombreAlumno, addNombreDocente } from '../redux/actions/PersonaAction';

import {API} from '../constants'

import { useSelector } from 'react-redux';

const AuthScreen = ({ navigation}) => {
    
    const rol = useSelector(state => state.PersonaReducer.RolReducer.rol)

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [datosCorrectos, setdatosCorrectos] = useState(false)
    const [isError, setIsError] = useState(true);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let controller = new AbortController()
        setMessage('')
        controller = null

        return () => controller?.abort()
    }, [rol])

    

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {

        fetch(`${API}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'username': username,
                'rol': rol
            }
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                    const id = jsonRes.id
                    const nombre = jsonRes.nombre
                    if (rol == 'Alumno'){
                        store.dispatch(addIdAlumno(id))
                        store.dispatch(addNombreAlumno(nombre))
                        navigation.navigate("HomeScreenAlumno")
                    }
                    else{
                        store.dispatch(addIdDocente(id))
                        store.dispatch(addNombreDocente(nombre))
                        navigation.navigate("HomeScreenDocente")
                    }
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }
    console.log(";)")

    const onSubmitHandler = () => {
        
        const submitData = () => {
            setLoading(true)

            const datos = {
                id,
                username,
                password,
                rol,
            };
    
            fetch(`${API}/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            }) 
            .then(async res => { 
                try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                        setIsError(true);
                        setMessage(jsonRes.message);
                    } else {
                        onLoggedIn(jsonRes.token);
                        setIsError(false);
                        setMessage(jsonRes.message);
                        setIsLogin(true)
                        
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() =>{
                setLoading(false)
            });
        }

        !isLogin && !datosCorrectos ? setMessage('Ingrese correctamente todos los datos') : submitData()
        
    };

    const getMessage = () => {
        return message
    }

    const onChangedId = (id) => {
        let newText = '';
        let numbers = '0123456789';
        setMessage("");
        setdatosCorrectos(true)
        if(id.length<8){
            setMessage('El DNI debe tener 8 caracteres')
            setdatosCorrectos(false)
        }

        for (var i=0; i < id.length; i++) {
            if(numbers.indexOf(id[i]) > -1 ) {
                newText = newText + id[i];
            }
            else {
                setIsError(true)
                setdatosCorrectos(false)
                setMessage("Por favor ingrese solo datos num??ricos");
            }
        }
        setId(newText)
    }
   
    return (
        <Layout>
            { loading ? <ActivityIndicator color="#ffffff" size="large" /> : null }

            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Iniciar Sesi??n' : 'Registrarse'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Usuario" onChangeText={setUsername}></TextInput>
                        {
                            !isLogin && 
                            <TextInput 
                                style={styles.input} 
                                placeholder="DNI" 
                                autoCapitalize="none" 
                                onChangeText={ (text) => onChangedId(text)}
                                keyboardType='numeric'
                                maxLength = {8}
                            >    
                            </TextInput>
                        }
                        
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Contrase??a" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Aceptar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Registrarse' : 'Iniciar Sesi??n'}</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>

        </Layout>
    );
};

const styles = StyleSheet.create({  
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: '80%',
        marginTop: '20%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '10%',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 15,
        color: 'black',
        justifyContent: "center",
        textAlign:"center"
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

export default AuthScreen;