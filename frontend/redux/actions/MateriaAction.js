export const SET_MATERIA = 'SET_MATERIA';
export const SET_ID_MATERIA = 'SET_ID_MATERIA'


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


