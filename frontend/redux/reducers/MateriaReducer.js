import { SET_MATERIA, SET_ID_MATERIA, SET_REGIMEN_MATERIA } from "../actions/MateriaAction"

const initialState = {
    materias : [],
    materia: "",
    id: "",
    regimen: ""
};

function MateriasReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MATERIA:
            return { ...state, materia: action.payload };
        case SET_ID_MATERIA:
            return { ...state, id: action.payload };
        case SET_REGIMEN_MATERIA:
            return { ...state, regimen: action.payload };
        default:
            return state;
    }
}
  
  export default MateriasReducer;