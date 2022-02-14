export const SET_ETAPA = 'SET_ETAPA'
export const SET_DESCRIPCION = 'SET_DESCRIPCION'

export const setEtapa = etapa => dispatch => {
  dispatch({
    type: SET_ETAPA,
    payload: etapa
  });
};

export const addDescripcion = examen => dispatch => {
  dispatch({
    type: SET_DESCRIPCION,
    payload: examen
  });
};
