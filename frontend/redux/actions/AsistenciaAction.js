export const RESET_ASISTENCIA = 'RESET_ASISTENCIA';

export const SET_ASISTENCIA_ALUMNO = 'SET_ASISTENCIA_ALUMNO'


export const addIdAlumno = alumno => dispatch => {
    dispatch({
      type: SET_ID_ALUMNO,
      payload: alumno
    });
};

export const resetAsistencia = () => dispatch => {
  console.log("ASISTENCIA")
  dispatch({
    type: RESET_ASISTENCIA
  });
};

export const addListaAlumnos = (id,nombre,estado) => dispatch => {
  //console.log("desde action asitencia", id, nombre, estado)
    dispatch({
    type: SET_ASISTENCIA_ALUMNO,
    payload: {id: id, nombre: nombre, estado: estado}
  
  })
  
}