export const SET_ETAPA = 'SET_ETAPA'
export const setEtapa = etapa => dispatch => {
  dispatch({
    type: SET_ETAPA,
    payload: etapa
  });
};
