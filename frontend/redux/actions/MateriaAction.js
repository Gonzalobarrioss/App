export const SET_ID_MATERIA = 'SET_ID_MATERIA'
export const SET_REGIMEN_MATERIA = 'SET_REGIMEN_MATERIA'
export const SET_NOMBRE_MATERIA = 'SET_NOMBRE_MATERIA'

import {API} from '../../constants'

import  axios  from 'axios'

export const addIdMateria = id => dispatch => {
  dispatch({
    type: SET_ID_MATERIA,
    payload: id
  });
};

export const addNombreMateria = nombre => dispatch => {
  dispatch({
    type: SET_NOMBRE_MATERIA,
    payload: nombre
  });
};

export const addRegimenMateria = id => {
  try {
    return async dispatch => {
      if (id){
      const response = await axios.get(`${API}/regimen_materia/${id}`);
      if (response.data) {
        dispatch({
          type: SET_REGIMEN_MATERIA,
          payload: response.data[0].regimen
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    }
  };
  } catch (error) {
    console.log("error desde api al obtener regimen de materia",error);
  }
};

