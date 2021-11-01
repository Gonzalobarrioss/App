import React from 'react'
import { FlatList } from 'react-native'

import MesaExamenItem from './MesaExamenItem'


const MesaExamenes = ({mesaExamen}) => {
     const renderItem = ({item}) => {
        return (
            <MesaExamenItem mesa={item}/>
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