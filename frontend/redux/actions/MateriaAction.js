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

export const addRegimenMateria = regimen => dispatch => {
  dispatch({
    type: SET_REGIMEN_MATERIA,
    payload: regimen
  });
};

