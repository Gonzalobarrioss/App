export const LOADING = 'LOADING'
export const isLoading = loading => dispatch => {
  dispatch({
    type: LOADING,
    payload: loading
  });
};
