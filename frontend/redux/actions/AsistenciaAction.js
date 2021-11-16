export const SET_ESTADO = 'SET_ESTADO';
export const SET_ID_ALUMNO = 'SET_ID_ALUMNO'
export const SET_LISTA_ALUMNOS = 'SET_LISTA_ALUMNO'


export const addIdAlumno = alumno => dispatch => {
    dispatch({
      type: SET_ID_ALUMNO,
      payload: alumno
    });
};

export const addEstado = estado => dispatch => {
  dispatch({
    type: SET_ESTADO,
    payload: estado
  });
};

export const addListaAlumnos = (id,nombre,estado) => dispatch => {
  //console.log("desde action asitencia", id, nombre, estado)
    dispatch({
    type: SET_LISTA_ALUMNOS,
    payload: {id: id, nombre: nombre, estado: estado}
  
  })
  
}