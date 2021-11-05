import React, {useState, useEffect} from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import ClasePorMateriaItem from './ClasePorMateriaItem'

const ClasePorMateriaList = () => {

    const renderItem = ({item}) => {
        return (
            <ClasePorMateriaItem/>
        )
    }

    return (
        
        <FlatList
            style={{width: "100%"}} 
            data={[]}
            keyExtractor = {(item) => item.id + ''}
            renderItem={renderItem}
        />


    
)
}

export default ClasePorMateriaList
