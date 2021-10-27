import React from 'react'
import { View, Text, FlatList } from 'react-native'

import RouteItem from './RouteItem'


const RouteList = ({routes}) => {
    const renderItem = ({item}) => {
        return (
            <RouteItem route={item}/>
        )
    }

    return (
        
            <FlatList
                style={{width: "100%"}} 
                data={routes}
                keyExtractor = {(item) => item.id + ''}
                renderItem={renderItem}
            />
        
    )
}

export default RouteList