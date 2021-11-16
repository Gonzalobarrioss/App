import React, {useState, useEffect} from 'react'
import { Picker, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getCursoPorClase } from '../api'

import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { addCurso} from '../redux/actions/CursoAction'

const CursoPorClase = () => {

    const [curso, setCurso] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const focus = useIsFocused()

    const clase = useSelector(state => state.ClasesReducer.id)

    const loadCursos = async () => {
        //console.log(materia)
        const data = await getCursoPorClase(clase);
        //console.log("array",data)
        setCurso(data)
    }

    useEffect(() => {
        //console.log("nueva materia", materia)
        loadCursos();
    }, [clase])

   const handleCurso = (value) => {
        try {
            setSelectedValue(value)
            store.dispatch(addCurso(value))
        } catch (error) {
            console.log("handleCurso",error)
        }
   }
   
    return (
        <View style={{ width: "90%"}}>
            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => handleCurso(itemValue)}
            >
                {
                    !curso.length > 0
                    ? (<Picker label={"CARGANDO"}/>)
                    : (curso.map((item, key)=> {
                        //console.log("curso",item)
                        return(
                            <Picker.Item label={item.descripcion} value={item.id} key={key}/>
                        )
                    }))
                    
                }
            </Picker>
        </View>

       
    )

}
export default CursoPorClase
