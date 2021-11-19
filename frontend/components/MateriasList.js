import React, {useState, useEffect} from 'react'
import { Picker, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAllMaterias } from '../api'

import { store } from '../redux/store'
import { addIdMateria, addRegimenMateria } from '../redux/actions/MateriaAction'

const MateriasList = () => {

    const [materia, setMateria] = useState([])
    const [selectedValue, setSelectedValue] = useState("");

    const focus = useIsFocused()

    

    useEffect(() => {
        const loadMaterias = async () => {
            const data = await getAllMaterias();
            setMateria(data)
        }
        loadMaterias();

    }, [focus])

   const handleMateria = (value) => {
        try {
            setSelectedValue(value)
            store.dispatch(addIdMateria(value))
            store.dispatch(addRegimenMateria(value))
        } catch (error) {
            console.log("handleMateria",error)
        }
   }
   
    return (
        <View style={{ width: "90%"}}>
            

            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleMateria(itemValue)}
            >
                {
                    //materia.length > 0 ?
                    materia.map((item, key)=> {
                        return(
                            <Picker.Item label={item.descripcion} value={item.id} key={key}/>
                        )
                    })
                    //: <Picker.Item label ="NO HAY MATERIAS" enabled={false} />
                }
            </Picker>
        </View>

       
    )

}
export default MateriasList
