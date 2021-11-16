import { GET_ALUMNOS_CURSO, SET_CURSO } from "../actions/AlumnoCursoAction";

const initialState = {
    curso: [],
    alumnos: []
};

function alumnosCursoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURSO:
            return { ...state, curso: action.payload };
        case GET_ALUMNOS_CURSO:
            return { ...state, alumnos: action.payload }
        default:
            return state;
    }
}
  
  export default alumnosCursoReducer;