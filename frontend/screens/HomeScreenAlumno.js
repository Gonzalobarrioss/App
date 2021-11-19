import React from 'react'
import { StyleSheet, Text } from 'react-native'
import MesaExamenesList from '../components/MesaExamenesList'
import Layout from '../components/Layout'

const HomeScreenAlumno = () => {  

    return ( 
        <Layout>
            <Text style={styles.txtHeader}>MESA DE EXAMENES</Text>
            <MesaExamenesList />
        </Layout>
    )
}

const styles = StyleSheet.create({
    txtHeader: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 18
    }
})

export default HomeScreenAlumno
