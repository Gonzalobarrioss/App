import { SET_CURSO, SET_ID_CURSO } from "../actions/CursoAction"

const initialState = {
    cursos : [],
    curso: "",
    id: ""
};

function CursosReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURSO:
            return { ...state, curso: action.payload };
        case SET_ID_CURSO:
            return { ...state, id: action.payload };
        default:
            return state;
    }
}
  
  export default CursosReducer;