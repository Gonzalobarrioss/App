import { SET_CALIFICACION } from "../actions/GuardarCalificacionAction"

const initialState = [
    
];

function GuardarCalificacionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CALIFICACION:
            return { ...state, state: action.payload };
        default:
            return state;
    }
}
  
  export default GuardarCalificacionReducer;