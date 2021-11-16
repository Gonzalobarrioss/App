export const SET_CURSO = 'SET_CURSO';
export const SET_ID_CURSO = 'SET_ID_CURSO'


export const addCurso = curso => dispatch => {
    dispatch({
      type: SET_CURSO,
      payload: curso
    });
};

export const addIdCurso = id => dispatch => {
  dispatch({
    type: SET_ID_CURSO,
    payload: id
  });
};


