export const SET_CLASE = 'SET_CLASE';
export const SET_ID_CLASE = 'SET_ID_CLASE'


export const addClase = clase => dispatch => {
    dispatch({
      type: SET_CLASE,
      payload: clase
    });
};

export const addIdClase = id => dispatch => {
  dispatch({
    type: SET_ID_CLASE,
    payload: id
  });
};