import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'

import MesaExamenItem from './MesaExamenItem'


const MesaExamenes = ({alumno, mesaExamen}) => {
    //console.log(mesaExamen)
     const renderItem = ({item}) => {
        return (
            <MesaExamenItem mesa={item} alumno={alumno}/>
        )
    }

    return (
        
            <FlatList
                style={{width: "100%"}} 
                data={mesaExamen}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItem}
            />

    
        
    )
}

export default MesaExamenes