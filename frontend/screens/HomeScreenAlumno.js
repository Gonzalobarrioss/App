import React, {useEffect} from 'react'
import MesaExamenesList from '../components/MesaExamenesList'
import { BackHandler, Alert } from 'react-native'
import Layout from '../components/Layout'

const HomeScreenAlumno = ({navigation}) => {  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Atencion", "Si  continua se perderá la sesión", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Continuar", onPress: () => navigation.navigate("StartScreen") }
      ]);
      return true;
    };    
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );    
    return () => backHandler.remove();
  }, []);

  return ( 
    <Layout>
      <MesaExamenesList />
    </Layout>
  )
}

export default HomeScreenAlumno
