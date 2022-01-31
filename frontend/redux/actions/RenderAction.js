export const RENDER = 'RENDER';
export const DATOS_VALIDOS = 'DATOS_VALIDOS';

export const render = render => dispatch => {
  dispatch({
    type: RENDER,
    payload: render
  });
};

export const datosValidos = params => dispatch => {
  dispatch({
    type: DATOS_VALIDOS,
    payload: params
  });
};
