import { SET_CLASE, SET_ID_CLASE } from "../actions/ClaseAction"

const initialState = {
    clases : [],
    clase: "",
    id: ""
};

function ClasesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CLASE:
            return { ...state, clase: action.payload };
        case SET_ID_CLASE:
            return { ...state, id: action.payload };
        default:
            return state;
    }
}
  
  export default ClasesReducer;