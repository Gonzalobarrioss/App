export const SET_CLASES = 'SET_CLASES';
export const SET_ID_CLASE = 'SET_ID_CLASE'

export const addClases = clase => dispatch => {
    dispatch({
      type: SET_CLASES,
      payload: clase
    });
};

export const addIdClase = id => dispatch => {
  dispatch({
    type: SET_ID_CLASE,
    payload: id
  });
};