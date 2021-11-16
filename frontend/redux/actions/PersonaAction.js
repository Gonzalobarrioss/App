export const SET_NOMBRE_ALUMNO = 'SET_NOMBRE_ALUMNO';
export const SET_ID_ALUMNO = 'SET_ID_ALUMNO'
export const SET_NOMBRE_DOCENTE = 'SET_NOMBRE_DOCENTE';
export const SET_ID_DOCENTE = 'SET_ID_DOCENTE'
export const SET_ROL = 'SET_ROL'

export const addNombreAlumno = persona => dispatch => {
    dispatch({
      type: SET_NOMBRE_ALUMNO,
      payload: persona
    });

}

export const addIdAlumno = persona => dispatch => {
  dispatch({
    type: SET_ID_ALUMNO,
    payload: persona
  })
}

export const addNombreDocente = persona => dispatch => {
  dispatch({
    type: SET_NOMBRE_DOCENTE,
    payload: persona
  });

}

export const addIdDocente = persona => dispatch => {
  dispatch({
    type: SET_ID_DOCENTE,
    payload: persona
  })
}

export const addRol = rol => dispatch => {
  dispatch({
    type: SET_ROL,
    payload: rol
  })
}


