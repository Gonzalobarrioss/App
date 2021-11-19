export const RENDER = 'RENDER';

export const render = render => dispatch => {
    dispatch({
      type: RENDER,
      payload: render
    });
};
