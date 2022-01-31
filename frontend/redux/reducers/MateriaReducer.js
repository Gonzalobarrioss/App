import { SET_ID_MATERIA, SET_REGIMEN_MATERIA, SET_NOMBRE_MATERIA } from "../actions/MateriaAction"

const initialState = {
    id: "",
    regimen: "",
    nombre: ""
};

function MateriasReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ID_MATERIA:
            return { ...state, id: action.payload };
        case SET_REGIMEN_MATERIA:
            return { ...state, regimen: action.payload };
        case SET_NOMBRE_MATERIA:
            return { ...state, nombre: action.payload };
        default:
            return state;
    }
}
  
export default MateriasReducer;