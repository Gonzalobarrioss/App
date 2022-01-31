import { SET_CLASES, SET_ID_CLASE } from "../actions/ClaseAction"

const initialState = {
    clases : [],
    id: 0
};

function ClasesReducer(state = initialState, action) {
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