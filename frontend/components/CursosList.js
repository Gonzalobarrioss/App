import React, {useState, useEffect} from 'react'
import { Text, RefreshControl, Picker, View, DeviceEventEmitter } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAllCursos } from '../api'

import { addCurso, getAlumnosPorCurso } from '../redux/actions/AlumnoCursoAction'
import { useDispatch } from 'react-redux';

import { store } from '../redux/store'

const CursosList = () => {

    const [curso, setCurso] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [selectedValue, setSelectedValue] = useState("");

    const focus = useIsFocused()    

    const loadCursos = async () => {
        const data = await getAllCursos();
        setCurso(data)
    }

    const dispatch = useDispatch();

    const handleSelectedCurso = selectedValue => dispatch(addCurso(selectedValue))

    useEffect(() => {
        loadCursos();
        handleSelectedCurso(selectedValue);
       // DeviceEventEmitter.emit('change', 'selectedValue');
        //console.log(store.getState())
    }, [selectedValue])
   
    return (
        <View style={{ width: "90%"}}>
            

            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                {
                    curso.map((item, key)=> {
                        //console.log(item)
                        return(
                            <Picker.Item label={item.descripcion} value={item.id} key={key}/>
                        )
                    })
                }
            </Picker>
        </View>

       
    )
}

export default CursosList
