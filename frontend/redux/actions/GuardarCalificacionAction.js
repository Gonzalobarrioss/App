export const SET_CALIFICACION = 'SET_CALIFICACION';


export const addCalificacion = calificacion => dispatch => {
    dispatch({
      type: SET_CALIFICACION,
      payload: {id: calificacion.id, nombre: calificacion.nombre, nota: calificacion.nota}
    });
};



