export const RENDER = 'RENDER'
export const renderIt = render => dispatch => {
  dispatch({
    type: RENDER,
    payload: render
  });
};
