import React, {useEffect} from 'react'
import MesaExamenesList from '../../components/examenes/MesaExamenesList'
import { BackHandler, Alert, ActivityIndicator } from 'react-native'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'

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

  const loading = useSelector(state => state.LoadingReducer.loading)
  return ( 
    <Layout>
      { loading ? <ActivityIndicator  color="#ffffff" size="large"  /> : null }
      <MesaExamenesList />
    </Layout>
  )
}

export default HomeScreenAlumno
