import { SET_CLASES, SET_ID_CLASE } from "../actions/ClaseAction"

const initialState = {
    clases : [],
    clase: "",
    id: ""
};

function ClasesReducer(state = initialState, action) {
    //console.log("reducer", action.payload)
    switch (action.type) {
        case SET_CLASES:
            return { ...state, clases: action.payload };
        case SET_ID_CLASE:
            return { ...state, id: action.payload };
        default:
            return state;
    }
}
  
  export default ClasesReducer;