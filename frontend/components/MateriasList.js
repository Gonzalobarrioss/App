import React, {useState, useEffect} from 'react'
import { Text, RefreshControl, Picker, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAllMaterias } from '../api'
//import MateriasItem from './MateriasItem'

const MateriasList = () => {

    const [materia, setMateria] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [selectedValue, setSelectedValue] = useState("");


    const focus = useIsFocused()

    const loadMaterias = async () => {
        const data = await getAllMaterias();
        setMateria(data)
    }

    useEffect(() => {
        loadMaterias();
       // mapMaterias({materia})
    }, [])

         
       /*

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        await loadMaterias();
        setRefreshing(false)
    })

    const handleSelect =  (id) => {
        
        selectMateria(id);
        loadMaterias();
    }*/

    /*
    <FlatList
                style={{width: "100%"}} 
                data={materia}
                keyExtractor = {(item) => item.id + ''}
               // renderItem={renderItem}
                refreshControl = {
                    <RefreshControl 
                        progressBackgroundColor = "#0a3d62"
                        colors={["#78e08f"]}
                        refreshing = { refreshing }
                        onRefresh = { onRefresh }
                    />
                }
            />
    */
   
    return (
        <View style={{ width: "90%"}}>
            

            <Picker
                style={{color: "#ffffff"}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => 
                        setSelectedValue(itemValue)}
            >
                {
                    materia.map((item, key)=> {
                        return(
                            <Picker.Item label={item.descripcion} value={item.descripcion} key={key}/>
                        )
                    })
                }
            </Picker>
        </View>

       
    )

}
export default MateriasList
