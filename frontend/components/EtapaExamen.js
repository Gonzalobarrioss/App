import { View, Text, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import { setEtapa } from '../redux/actions/EtapaAction';

const EtapaExamen = () => {


    const [etapaSeleccionada, setEtapaSeleccionada] = useState([])
    const [etapas, setEtapas] = useState([])
    const regimen = useSelector(state => state.MateriasReducer.regimen)

    useEffect(() => {
        let controller = new AbortController()
        switch (regimen) {
            case "Anual":
                setEtapas([{nombre: "Anual", etapa: "1"}])
                break;
            case "Bimestral":
                setEtapas([{nombre: "Primer Bimestre", etapa: "1"},{nombre: "Segundo Bimestre", etapa: "2"},{nombre: "Tercer Bimestre", etapa: "3"},{nombre: "Cuarto Bimestre", etapa: "4"}])
                break;
            case "Trimestral":
                setEtapas([{nombre: "Primer Trimestre", etapa: "1"},{nombre: "Segundo Trimestre", etapa: "2"},{nombre: "Tercer Trimestre", etapa: "3"}])
                break;
            case "Cuatrimestral":
                setEtapas([{nombre: "Primer Cuatrimestre", etapa: "1"},{nombre: "Segundo Cuatrimestre", etapa: "2"}])
                break;
            default:
                break;
        }
        controller = null
    
        return () => controller?.abort()
    }, [regimen])

    const handleEtapa = (value) => {
        store.dispatch(setEtapa(value))
        setEtapaSeleccionada(value)
    }

    return (

        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={etapaSeleccionada}
                onValueChange={(itemValue) => handleEtapa(itemValue)}    
            >
                <Picker.Item label ={"Seleccione una etapa"} enabled={false} />
            {
                etapas.map((item,key)=>{
                    return ( <Picker.Item label={item.nombre} value={item.etapa} key={key} />)
                })
            }      
            </Picker>
        </View>

    );
};

const styles = StyleSheet.create({
    picker:{
        color:"#fff",
        height: 50,
    },
    container:{
      width: "90%", 
      marginTop: "10%",
      borderWidth: 2, 
      borderColor: '#10ac84', 
      borderRadius: 5,
      
    },
})

export default EtapaExamen;
