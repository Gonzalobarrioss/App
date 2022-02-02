export const SET_ASISTENCIAS = 'SET_ASISTENCIAS';

export const editAsistencias = asistencia => dispatch => {
    dispatch({
      type: SET_ASISTENCIAS,
      payload: asistencia
    });
};
