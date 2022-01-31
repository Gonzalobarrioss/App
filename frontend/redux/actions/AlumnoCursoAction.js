import {API} from '../../constants';

import  axios  from 'axios'

export const GET_ALUMNOS_CURSO = 'GET_ALUMNOS_CURSO';
export const SET_CURSO = 'SET_CURSO';

export const addIdCurso = curso => dispatch => {
    dispatch({
      type: SET_CURSO,
      payload: curso
    });
};

export const getAlumnosPorCurso = (curso) => {
  try {
    return async dispatch => {
      if (curso){
        const response = await axios.get(`${API}/alu_cursos/${curso}`);
        if (response.data) {
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
