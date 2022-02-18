export const SET_ETAPA = 'SET_ETAPA'
export const SET_FECHA = 'SET_FECHA'
export const SET_DESCRIPCION = 'SET_DESCRIPCION'

export const setEtapa = etapa => dispatch => {
  dispatch({
    type: SET_ETAPA,
    payload: etapa
  });
};

export const setFecha = fecha => dispatch => {
  dispatch({
    type: SET_FECHA,
    payload: fecha
  });
};

export const addDescripcion = examen => dispatch => {
  dispatch({
    type: SET_DESCRIPCION,
    payload: examen
  });
};
