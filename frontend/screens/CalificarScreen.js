import React, {useEffect, useState} from 'react'
import { Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import MateriasList from '../components/MateriasList'
import EtapaExamen from '../components/EtapaExamen'
import CursosDocenteMateriaList from '../components/CursosDocenteMateriaList'
import AlumnosPorCursoTableCalificacion from '../components/AlumnosPorCursoTableCalificacion'
import { addIdMateria } from '../redux/actions/MateriaAction'
import { setEtapa } from '../redux/actions/CalificacionesAction'
import { useSelector } from 'react-redux';
import { store } from '../redux/store'
import { useIsFocused } from '@react-navigation/native'

const CalificarScreen = ({navigation}) => {
    
    const regimen = useSelector(state => state.MateriasReducer.regimen)
    const materia = useSelector(state => state.MateriasReducer.id)
    const curso = useSelector(state => state.alumnosCursoReducer.cursoId)
    const etapa = useSelector(state => state.CalificacionesReducer.etapa)

    const isLoading = useSelector(state => state.LoadingReducer.loading)

    const [loading, setLoading] = useState(false)

    const isFocused = useIsFocused();

    useEffect(() => {
        let controller = new AbortController()
        setLoading(isLoading)
        controller = null
        return () => {
            controller?.abort()    
        };
    }, [isLoading]);

    React.useLayoutEffect(() => {
        let controller = new AbortController()
        const handleCalificaciones = () => {
            store.dispatch(addIdMateria(0))
            store.dispatch(setEtapa(0))
            controller = null
            navigation.navigate("Ver Calificaciones")
        }

        navigation.setOptions({
            headerRight: () => (           
                <TouchableOpacity
                    onPress = { 
                        () => {handleCalificaciones()}
                    }
                    style = { styles.btnVerCalificaciones}
                >                        
                    <Text style = { styles.txtVerCalificaciones }>Ver calificaciones</Text>                        
                </TouchableOpacity>                         
            )
        })
        return () => controller?.abort()
    }, [])  

    return (
        <ScrollView style={styles.container}>
            <Layout>
                { loading ? <ActivityIndicator color="#ffffff" size="large" style={{marginBottom: 10}}/> : <Text style={{height: 36, marginBottom: 10}}/> }

                { isFocused ? <MateriasList /> : null }
                { materia ? <Text style={styles.txtRegimen}> Regimen: {regimen ? regimen : null} </Text> : null }
                { materia ? <EtapaExamen /> : null }
                { etapa ? <CursosDocenteMateriaList /> : null }
                
                { curso ? <AlumnosPorCursoTableCalificacion navigation={navigation}/> : null }
            </Layout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor: "#222f3e"
    },
    btnVerCalificaciones: {
        backgroundColor: "#10ac84",
        padding: 7,
        borderRadius: 5
    },
    txtVerCalificaciones: {
        color: "#ffffff",
        fontSize: 16,
    },
    txtRegimen: {
        color: "#ffffff",
        fontSize:20,
        marginTop: 10
    }

})

export default CalificarScreen
