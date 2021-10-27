import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { getRutasLecturista } from '../api'
import RouteList from '../components/RouteList'
import Layout from '../components/Layout'

const HomeScreen = ({route, navigation}) => {
    const params = route.params.id
    //console.log("params", params)
    
    const [routes, setRoutes] = useState([])

    const loadRoutes = async () => {
        const data = await getRutasLecturista(params);
        setRoutes(data)
    }

    useEffect(() => {
        loadRoutes();
    }, [])

    return (
        <Layout>
            <RouteList routes={routes}/>
        </Layout>
    )
}

export default HomeScreen
