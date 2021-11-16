import { SET_NOMBRE_ALUMNO, SET_ID_ALUMNO, SET_NOMBRE_DOCENTE, SET_ID_DOCENTE, SET_ROL } from "../actions/PersonaAction";
import { combineReducers} from 'redux'

const initialState = {
    alumno: {
        nombre: "",
        id: ""      
    },
    docente: {
        nombre: "",
        id: "",
    },
    rol:{
        rol: ""
    }
};


function AlumnoReducer (state = initialState.alumno, action){
    switch (action.type) {
        case SET_NOMBRE_ALUMNO:
            return { ...state, nombre: action.payload };
        case SET_ID_ALUMNO:
            return { ...state, id : action.payload}
        default:
            return state
    }
}

function DocenteReducer(state = initialState.docente, action) {
    switch (action.type) { 
        case SET_NOMBRE_DOCENTE:
            return { ...state, nombre : action.payload };
        case SET_ID_DOCENTE:
            return { ...state, id : action.payload}
        default:
            return state;
    }
}

function RolReducer(state = initialState.docente, action) {
    switch (action.type) { 
        case SET_ROL:
            return { ...state, rol : action.payload };
        default:
            return state;
    }
}

const PersonaReducer = combineReducers({
    AlumnoReducer,
    DocenteReducer,
    RolReducer
})
  export default PersonaReducer