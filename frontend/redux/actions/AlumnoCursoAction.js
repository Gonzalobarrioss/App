const API = "http://192.168.0.127:3000"

import  axios  from 'axios'

export const GET_ALUMNOS_CURSO = 'GET_ALUMNOS_CURSO';
export const SET_CURSO = 'SET_CURSO';

export const addCurso = curso => dispatch => {
    dispatch({
      type: SET_CURSO,
      payload: curso
    });
};

export const getAlumnosPorCurso = (curso) => {
 // console.log("curso elegido", curso)
  try {
    return async dispatch => {
      if (curso){
        const response = await axios.get(`${API}/alu_cursos/${curso}`);
        if (response.data) {
            //console.log("respuesta AlumnosCursoAction",response.data)
          dispatch({
            type: GET_ALUMNOS_CURSO,
            payload: response.data
          })
        } else {
          console.log('Unable to fetch data from the API BASE URL!');
        }    
      }
      else{
        dispatch({
          type: GET_ALUMNOS_CURSO,
          payload: []
        })
      }
    }
  } catch (error) {
    console.log("error desde api",error);
  }  
};
