import React, {useState, useEffect} from 'react'
import { Text, RefreshControl, Picker, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { getAlumnosXCurso } from '../api'

const AlumnosPorCursoList = () => {

    const [alumno, setAlumno] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [selectedValue, setSelectedValue] = useState("");


    const focus = useIsFocused()

    const loadAlumnos = async () => {
        const data = await getAlumnosXCurso(4);
        setAlumno(data)
    }

    useEffect(() => {
        loadAlumnos();
       // mapcursos({curso})
    }, [])

         
       /*

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        await loadCursos();
        setRefreshing(false)
    })

    const handleSelect =  (id) => {
        
        selectcurso(id);
        loadCursos();
    }*/

    /*
    <FlatList
                style={{width: "100%"}} 
                data={curso}
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
                    alumno.map((item, key)=> {
                       // console.log(item)
                        return(
                            <Picker.Item label={item.nombre} value={item.id} key={key}/>
                        )
                    })
                }
            </Picker>
        </View>

       
    )
}

export default AlumnosPorCursoList
