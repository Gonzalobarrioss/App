import React, {useState, useEffect} from 'react'
import { Picker, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAllMaterias } from '../api'

import { store } from '../redux/store'
import { addIdMateria } from '../redux/actions/MateriaAction'

const MateriasList = () => {

    const [materia, setMateria] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const focus = useIsFocused()

    const loadMaterias = async () => {
        const data = await getAllMaterias();
        setMateria(data)
    }

    useEffect(() => {
        loadMaterias();
    }, [])

   const handleMateria = (value) => {
        try {
            setSelectedValue(value)
            store.dispatch(addIdMateria(value))
        } catch (error) {
            console.log("handleMateria",error)
        }
   }
   
    return (
        <View style={{ width: "90%"}}>
            

            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => handleMateria(itemValue)}
            >
                {
                    materia.map((item, key)=> {
                        return(
                            <Picker.Item label={item.descripcion} value={item.id} key={key}/>
                        )
                    })
                }
            </Picker>
        </View>

       
    )

}
export default MateriasList
