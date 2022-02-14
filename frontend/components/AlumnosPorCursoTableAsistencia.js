import React, {useState, useEffect} from 'react'
import { View, Alert, StyleSheet, TouchableOpacity, Text} from 'react-native'

import { getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'

import { DataTable, RadioButton } from 'react-native-paper';
import { saveAsistencia, getAlumnosXCurso } from '../api';

import { useFocusEffect } from '@react-navigation/native';

import RadioGroup from 'react-native-radio-buttons-group';
import alumnosCursoReducer from '../redux/reducers/AlumnoCursoReducer';
import { isLoading } from '../redux/actions/LoadingAction';


const AlumnosPorCursoTableAsistencia = ({navigation}) => {

    const id_clase = useSelector(state => state.ClasesReducer.id)
    const id_docente = useSelector(state => state.PersonaReducer.DocenteReducer.id)

    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)

    const [asistencia, setAsistencia] = useState({
        clase: id_clase,
        alumnos: [{apellido: "CARGANDO...",nombre:""}],
        estado: [],
        docente: id_docente,
    })

    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Todos Ausentes',
        value: 'Ausente',
        color: '#ffffff',
        size: 20,
        labelStyle: {
            color: '#ffffff'
        },
    }, {
        id: '2',
        label: 'Todos Presentes',
        value: 'Presente',
        color: '#ffffff',
        size: 20,
        labelStyle: {
            color: '#ffffff'
        },
    }]
    
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radio) {
        radio.map((item) => {
            if (item.selected){
                const estado = item.id === '1' ? "Ausente" : "Presente"
                const array_estado = []
                for (let i = 0; i < asistencia.alumnos.length; i++) {
                    array_estado.push(estado)                    
                }
                
                setAsistencia({...asistencia, estado: array_estado})
            }
        })
        setRadioButtons(radio);

    }
    useEffect(() => {
        store.dispatch(isLoading(true))
        let controller = new AbortController()
        const getAlumnos = async (curso) => {
            try {
                const data = await getAlumnosXCurso(curso,{
                    signal: controller.signal
                })
                .finally(()=> {
                    store.dispatch(isLoading(false))
                });
                const array_estado = []
                if(data.length){
                    for (let i = 0; i < data.length; i++) {
                        array_estado.push("Ausente")    
                    }
                }
                setAsistencia({...asistencia, alumnos: data, estado: array_estado })
                controller = null
            } catch (error) {
                console.log("error",error)
            }
        }
        if (curso){
            console.log("load Table");
            getAlumnos(curso)
        }
    
        return () => controller?.abort()
    }, [curso]);

    const handleAsistencia = (value) => {

        Alert.alert(
            `Alumno: ${value.nombre}`,
            `Insertar estado del alumno`,
            [
                {
                    text: "Retraso",
                    onPress: () => {

                        try {
                            const handleArray = asistencia.estado
                            handleArray.splice(value.key,1,"Retraso")
                            setAsistencia({...asistencia, estado: handleArray})
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
                            const handleArray = asistencia.estado
                            handleArray.splice(value.key,1,"Presente")
                            setAsistencia({...asistencia, estado: handleArray})
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
                            const handleArray = asistencia.estado
                            handleArray.splice(value.key,1,"Ausente")
                            setAsistencia({...asistencia, estado: handleArray})
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
                                await saveAsistencia({alumnoID:item.id, claseID: asistencia.clase,fecha:fecha, estado:asistencia.estado[index], docente: asistencia.docente})
                                
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
        <View style={{ width: "100%", marginTop: "10%"}}>



            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={(radio) => onPressRadioButton(radio)}
                layout={'row'}
                containerStyle={{
                    justifyContent: 'center'
                }}                
            />

            <DataTable style={{backgroundColor:"#ffffff", borderWidth: 2, borderColor: 'grey', borderRadius: 5}}>
                <DataTable.Header >
                    <DataTable.Title style={styles.dataTableHeader}>Alumno</DataTable.Title>
                    <DataTable.Title style={styles.dataTableHeader}>Estado</DataTable.Title>
                </DataTable.Header>
                    {
                        asistencia.alumnos.length > 0 ? 
                        (asistencia.alumnos.map((row, key)=>(
                            <DataTable.Row key={key} style={{height:80}} onPress={ () => handleAsistencia({nombre:row.nombre,id:row.id, key:key}) } >
                                <DataTable.Cell style={{ overflow:"scroll", maxWidth:190}}>
                                    <View >
                                        <Text style={{fontSize:20}}>
                                            {
                                                ` ${row.apellido} \n ${row.nombre}`
                                            } 
                                        </Text>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={{justifyContent:"center"}}>
                                    <View>
                                        <Text style={{fontSize:20}}>
                                            {asistencia.estado[key]}
                                        </Text>
                                    </View>
                                </DataTable.Cell>
                            </DataTable.Row>
                        )))    
                        :   <DataTable.Row  >
                                <DataTable.Cell>SIN ALUMNOS</DataTable.Cell>
                            </DataTable.Row>
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
    },
    dataTableHeader: {
        alignItems:"center", 
        justifyContent:"center" 
    }
})
export default AlumnosPorCursoTableAsistencia
