import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import  Layout  from '../components/Layout'
import { store } from '../redux/store';
import { addIdAlumno, addIdDocente, addNombreAlumno, addNombreDocente, addRol } from '../redux/actions/PersonaAction';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://192.168.1.115:3000';

const AuthScreen = ({route, navigation}) => {
    
    const rol = route.params.rol

    try {
        store.dispatch(addRol(rol))
    } catch (error) {
        console.log("No se pudo registrar el rol.", error)
    }

    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [rol, setRol] = useState(params);

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'username': username,
                'rol': rol
            },
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

    const onSubmitHandler = () => {
        
        const datos = {
            id,
            username,
            password,
            rol,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
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
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
            <Layout>
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'} {rol}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername}></TextInput>
                        {
                            !isLogin && 
                            <TextInput style={styles.input} placeholder="ID" autoCapitalize="none" onChangeText={setId}></TextInput>
                        }
                        
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
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

export default AuthScreen;