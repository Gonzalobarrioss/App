import { SET_MATERIA, SET_ID_MATERIA } from "../actions/MateriaAction"

const initialState = {
    materias : [],
    materia: "",
    id: ""
};

function MateriasReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MATERIA:
            return { ...state, materia: action.payload };
        case SET_ID_MATERIA:
            return { ...state, id: action.payload };
        default:
            return state;
    }
}
  
  export default MateriasReducer;