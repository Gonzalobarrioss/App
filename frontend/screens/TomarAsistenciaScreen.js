import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import { getMesaExamen} from '../api'
import Layout from '../components/Layout'

import MateriasList from '../components/MateriasList'
import ClasePorMateriaList from '../components/ClasePorMateriaList'

const TomarAsistenciaScreen = () => {
    return (
        <Layout>
            <MateriasList />
            <ClasePorMateriaList/>
        </Layout>
    )
}

export default TomarAsistenciaScreen
