import React, {useState, useEffect} from 'react'
import { Picker, View, StyleSheet } from 'react-native'

import { getAllCursos } from '../api'

import { addCurso } from '../redux/actions/AlumnoCursoAction'
import { useDispatch } from 'react-redux';


const CursosList = () => {

    const [curso, setCurso] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const dispatch = useDispatch();

    const handleSelectedCurso = selectedValue => dispatch(addCurso(selectedValue))

    useEffect(() => {
        const loadCursos = async () => {
            const data = await getAllCursos();
            setCurso(data)
        }
        loadCursos();
        handleSelectedCurso(selectedValue);
    }, [selectedValue])
   
    return (
        <View style={styles.container}>     

            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                {
                    curso.map((item, key)=> {
                        return(
                            <Picker.Item label={item.descripcion} value={item.id} key={key}/>
                        )
                    })
                }
            </Picker>
        </View>     
    )
}

const styles = StyleSheet.create({
    container:{
        width: "90%", 
        marginTop: "10%",
        borderWidth: 2, 
        borderColor: '#10ac84', 
        borderRadius: 5
    },
    picker:{
        color:"#fff",
        height: 50,
    }
})

export default CursosList
