export const SET_MATERIA = 'SET_MATERIA';
export const SET_ID_MATERIA = 'SET_ID_MATERIA'
export const SET_REGIMEN_MATERIA = 'SET_REGIMEN_MATERIA'

const API = "http://192.168.1.115:3000"

import  axios  from 'axios'

export const addMateria = materia => dispatch => {
    dispatch({
      type: SET_MATERIA,
      payload: materia
    });
};

export const addIdMateria = id => dispatch => {
  dispatch({
    type: SET_ID_MATERIA,
    payload: id
  });
};

export const addRegimenMateria = id => {
  try {
      
    return async dispatch => {
      if (id){
      const response = await axios.get(`${API}/regimen_materia/${id}`);
      if (response.data) {
        //console.log("regimen response,", response.data[0].regimen)
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
  // Add custom logic to handle errors
  console.log("error desde api",error);
}
};

